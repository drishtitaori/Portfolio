import type { Metadata } from "next";
import localFont from "next/font/local";
import "./v6.css";
import V6Nav from "@/components/v6/V6Nav";
import PointerInterface from "@/components/pointer/PointerInterface";

const gambetta = localFont({ variable: "--v6-gambetta", display: "swap", src: [{ path: "../v3/fonts/Gambetta-Variable.woff2", weight: "300 700", style: "normal" }, { path: "../v3/fonts/Gambetta-VariableItalic.woff2", weight: "300 700", style: "italic" }] });
const general = localFont({ variable: "--v6-general", display: "swap", src: [{ path: "../v3/fonts/GeneralSans-Variable.woff2", weight: "200 700", style: "normal" }] });
const sligoil = localFont({ variable: "--v6-sligoil", display: "swap", src: [{ path: "../v3/fonts/SligoilVF.woff2", weight: "400 700", style: "normal" }] });

export const metadata: Metadata = {
  title: { absolute: "The Bright Workbench — Drishti Taori" },
  description: "Product design case studies by Drishti Taori, Senior Product Designer.",
  alternates: { canonical: "/v6/" },
  robots: { index: false, follow: false },
};

export default function V6Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`v6 ${gambetta.variable} ${general.variable} ${sligoil.variable}`}><a className="v6-skip" href="#v6-main">Skip to content</a><V6Nav />{children}<PointerInterface skin="lens" /></div>;
}
