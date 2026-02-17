"use client";

import React from "react";
import { Card, StatusBadge } from "@/components";

type MenuItem = {
  sku: string;
  name: string;
  priceCents: number;
  active: boolean;
};

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function VendorMenuPage() {
  const [items, setItems] = React.useState<MenuItem[]>([
    { sku: "SKU-NEON-001", name: "Signature Bento", priceCents: 2400, active: true },
    { sku: "SKU-NEON-002", name: "Yuzu Sparkle Soda", priceCents: 650, active: true },
    { sku: "SKU-NEON-003", name: "Limited Truffle Side", priceCents: 1200, active: false },
  ]);

  const [draft, setDraft] = React.useState<{ sku: string; name: string; price: string }>({
    sku: "",
    name: "",
    price: "",
  });

  const [message, setMessage] = React.useState<string | null>(null);

  return (
    <div className="container">
      <Card
        title="Menu Editor"
        meta="Demo menu management UI (wire to backend endpoints when available)."
        actions={
          <button
            className="btn"
            type="button"
            onClick={() => {
              setMessage("Saved (demo).");
              setTimeout(() => setMessage(null), 1600);
            }}
          >
            Save changes
          </button>
        }
      >
        {message ? (
          <>
            <StatusBadge tone="ok" text={message} />
            <div style={{ height: 12 }} />
          </>
        ) : null}

        <table className="table" aria-label="Menu items table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.sku}>
                <td className="kbd">{it.sku}</td>
                <td style={{ fontWeight: 800 }}>{it.name}</td>
                <td>{formatCents(it.priceCents)}</td>
                <td>
                  <StatusBadge tone={it.active ? "ok" : "warn"} text={it.active ? "Active" : "Hidden"} />
                </td>
                <td>
                  <button
                    className="btn"
                    type="button"
                    onClick={() =>
                      setItems((prev) =>
                        prev.map((p) => (p.sku === it.sku ? { ...p, active: !p.active } : p)),
                      )
                    }
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ height: 16 }} />

        <div className="card" style={{ borderRadius: 14 }}>
          <div className="cardInner">
            <div style={{ fontWeight: 900 }}>Add new item</div>
            <div style={{ height: 10 }} />
            <div className="grid2">
              <div className="field">
                <label className="label" htmlFor="sku">
                  SKU
                </label>
                <input
                  id="sku"
                  className="input"
                  value={draft.sku}
                  onChange={(e) => setDraft((d) => ({ ...d, sku: e.target.value }))}
                  placeholder="SKU-NEON-004"
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="price">
                  Price (USD)
                </label>
                <input
                  id="price"
                  className="input"
                  value={draft.price}
                  onChange={(e) => setDraft((d) => ({ ...d, price: e.target.value }))}
                  placeholder="12.50"
                />
              </div>
            </div>

            <div style={{ height: 10 }} />

            <div className="field">
              <label className="label" htmlFor="name">
                Item name
              </label>
              <input
                id="name"
                className="input"
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                placeholder="Neon Tonkotsu"
              />
            </div>

            <div className="btnRow">
              <button
                className="btn btnPrimary"
                type="button"
                onClick={() => {
                  setMessage(null);

                  if (!draft.sku.trim() || !draft.name.trim() || !draft.price.trim()) {
                    setMessage("Please fill SKU, name, and price.");
                    return;
                  }

                  const priceNum = Number(draft.price);
                  if (Number.isNaN(priceNum) || priceNum <= 0) {
                    setMessage("Price must be a positive number.");
                    return;
                  }

                  setItems((prev) => [
                    {
                      sku: draft.sku.trim(),
                      name: draft.name.trim(),
                      priceCents: Math.round(priceNum * 100),
                      active: true,
                    },
                    ...prev,
                  ]);
                  setDraft({ sku: "", name: "", price: "" });
                  setMessage("Added (demo).");
                  setTimeout(() => setMessage(null), 1600);
                }}
              >
                Add
              </button>
            </div>

            <div style={{ marginTop: 10, color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
              Backend wiring: POST <span className="kbd">/vendor/menu</span>, PATCH{" "}
              <span className="kbd">/vendor/menu/:sku</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
