import React from "react";

/**
 * PUBLIC_INTERFACE
 * Simple card wrapper to keep styling consistent.
 */
export function Card(props: {
  title: string;
  meta?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <section className="card">
      <div className="cardInner">
        <header>
          <div className="cardTitle">{props.title}</div>
          {props.meta ? <div className="cardMeta">{props.meta}</div> : null}
        </header>
        <div style={{ height: 12 }} />
        <div>{props.children}</div>
        {props.actions ? (
          <>
            <div style={{ height: 12 }} />
            <div className="btnRow">{props.actions}</div>
          </>
        ) : null}
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * Badge that visually indicates a state.
 */
export function StatusBadge(props: { tone: "ok" | "warn" | "danger" | "info"; text: string }) {
  const dotColor =
    props.tone === "ok"
      ? "var(--success)"
      : props.tone === "warn"
        ? "var(--warning)"
        : props.tone === "danger"
          ? "var(--danger)"
          : "var(--primary)";

  return (
    <span className="badge" aria-label={props.text}>
      <span className="badgeDot" aria-hidden="true" style={{ background: dotColor }} />
      {props.text}
    </span>
  );
}

/**
 * PUBLIC_INTERFACE
 * Empty state for lists.
 */
export function EmptyState(props: { title: string; description: string; hint?: string }) {
  return (
    <div className="card" role="note">
      <div className="cardInner">
        <div className="cardTitle">{props.title}</div>
        <div className="cardMeta">{props.description}</div>
        {props.hint ? (
          <>
            <div style={{ height: 12 }} />
            <div className="badge">
              Tip: <span className="kbd">{props.hint}</span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
"
