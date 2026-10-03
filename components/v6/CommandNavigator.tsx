"use client";

import { useEffect, useRef, useState } from "react";
import { commands, normalizeCommand, type CommandItem } from "@/content/v6";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const isEditableControl = (target: EventTarget | null) =>
  target instanceof Element &&
  Boolean(target.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"], [role="textbox"], [role="searchbox"]'));

const commandHref = (item: CommandItem) => {
  if (item.filter) return `${BASE_PATH}/v6/?filter=${encodeURIComponent(item.filter)}#work`;
  if (item.action === "lens") return `${BASE_PATH}/v6/#lens`;
  if (item.href?.startsWith("/")) return `${BASE_PATH}${item.href}`;
  if (item.href?.startsWith("#")) return `${BASE_PATH}/v6/${item.href}`;
  return item.href ?? `${BASE_PATH}/v6/#lens`;
};

export default function CommandNavigator({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const priorFocus = useRef<HTMLElement | null>(null);
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const openWithKeys = (event: KeyboardEvent) => {
      if (isEditableControl(event.target)) return;
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k") return;
      event.preventDefault();
      if (dialogRef.current?.open) return;
      priorFocus.current = document.activeElement as HTMLElement;
      dialogRef.current?.showModal();
      setTimeout(() => inputRef.current?.focus(), 0);
    };
    window.addEventListener("keydown", openWithKeys);
    return () => window.removeEventListener("keydown", openWithKeys);
  }, []);

  useEffect(() => {
    if (open && !dialogRef.current?.open) {
      priorFocus.current = document.activeElement as HTMLElement;
      dialogRef.current?.showModal();
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const handleDialogClose = () => {
    onClose();
    priorFocus.current?.focus();
  };

  const requestClose = () => dialogRef.current?.close();
  const results = query ? normalizeCommand(query) : commands;
  const handleResultNavigation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      resultRefs.current[activeIndex]?.click();
    }
  };

  return (
    <dialog ref={dialogRef} className="v6-dialog" aria-labelledby="v6-command-title" onClose={handleDialogClose}>
      <div className="v6-dialogHead">
        <div><span className="v6-kicker">Portfolio explorer</span><h2 id="v6-command-title">What would you like to explore?</h2></div>
        <button type="button" onClick={requestClose} aria-label="Close portfolio explorer">Close</button>
      </div>
      <p className="v6-dialogNote">Search work, outcomes, decision practices, TechX, contact details, or the résumé. <span aria-live="polite">{results.length} {results.length === 1 ? "result" : "results"}</span></p>
      <label className="v6-searchLabel">Explore the portfolio
        <input ref={inputRef} value={query} onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(0);
        }} onKeyDown={handleResultNavigation} placeholder="e.g. TechX, résumé, autonomy" aria-controls="v6-command-results" aria-activedescendant={results.length ? `v6-command-result-${activeIndex}` : undefined} />
      </label>
      <ul id="v6-command-results" className="v6-commandList" role="listbox">
        {results.map((item, index) => <li id={`v6-command-result-${index}`} key={item.id} role="option" aria-selected={index === activeIndex}><a ref={(element) => {
          resultRefs.current[index] = element;
        }} href={commandHref(item)} onClick={requestClose}>
          <strong>{item.label}</strong><span>{item.note}</span>
        </a></li>)}
        {!results.length && <li className="v6-empty">Nothing matches that phrase. Try “work”, “TechX”, “résumé”, or “autonomy”.</li>}
      </ul>
    </dialog>
  );
}
