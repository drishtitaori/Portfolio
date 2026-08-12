import s from "./PageHero.module.css";

export default function PageHero({
  label,
  title,
  lead,
}: {
  label: string;
  title: string;
  lead?: React.ReactNode;
}) {
  return (
    <header className={`frame ${s.hero}`}>
      <span className="label label--accent">{label}</span>
      <h1 className={s.title}>{title}</h1>
      {lead ? <p className={s.lead}>{lead}</p> : null}
    </header>
  );
}
