"use client";

import { useState } from "react";
import CommandNavigator from "./CommandNavigator";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function V6Nav() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  return (
    <>
      <nav className="v6-nav" aria-label="Primary navigation">
        <a className="v6-brand" href={`${BASE_PATH}/v6/`}>Drishti <em>दृष्टि</em></a>
        <div className="v6-navLinks">
          <a href={`${BASE_PATH}/v6/#work`}>Work</a><a href={`${BASE_PATH}/v6/#evidence`}>Evidence</a><a href={`${BASE_PATH}/v6/#speaking`}>Speaking</a><a href={`${BASE_PATH}/v6/#approach`}>Approach</a>
          <button type="button" className="v6-moreTrigger" onClick={() => setMoreOpen((current) => !current)} aria-expanded={moreOpen} aria-controls="v6-mobile-more">More</button>
          <button type="button" className="v6-commandTrigger" onClick={() => setOpen(true)} aria-haspopup="dialog">
            Explore <kbd>⌘ / Ctrl K</kbd>
          </button>
        </div>
      </nav>
      {moreOpen && <div className="v6-mobileMore" id="v6-mobile-more"><a href={`${BASE_PATH}/v6/#evidence`} onClick={() => setMoreOpen(false)}>Evidence</a><a href={`${BASE_PATH}/v6/#approach`} onClick={() => setMoreOpen(false)}>Approach</a></div>}
      <CommandNavigator open={open} onClose={() => setOpen(false)} />
    </>
  );
}
