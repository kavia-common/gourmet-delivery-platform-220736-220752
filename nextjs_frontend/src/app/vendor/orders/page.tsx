"use client";

import React from "react";
import { Card, StatusBadge } from "@/components";
import { connectWs, WsEvent } from "@/lib/api";

type VendorOrderStatus = "NEW" | "ACCEPTED" | "PREPPING" | "READY" | "HANDOFF";

type VendorOrder = {
  id: string;
  customerName: string;
  items: string[];
  status: VendorOrderStatus;
  placedAt: number;
};

const DEMO_ORDERS: VendorOrder[] = [
  {
    id: "ORD-10021",
    customerName: "A. Rivera",
    items: ["Omakase 12", "Truffle Miso Soup"],
    status: "NEW",
    placedAt: Date.now() - 1000 * 60 * 6,
  },
  {
    id: "ORD-10018",
    customerName: "K. Patel",
    items: ["Pistachio Croissant"],
    status: "PREPPING",
    placedAt: Date.now() - 1000 * 60 * 18,
  },
  {
    id: "ORD-10012",
    customerName: "J. Chen",
    items: ["Black Truffle Gnocchi"],
    status: "READY",
    placedAt: Date.now() - 1000 * 60 * 34,
  },
];

function nextStatus(s: VendorOrderStatus): VendorOrderStatus {
  if (s === "NEW") return "ACCEPTED";
  if (s === "ACCEPTED") return "PREPPING";
  if (s === "PREPPING") return "READY";
  return "HANDOFF";
}

export default function VendorOrdersPage() {
  const [orders, setOrders] = React.useState<VendorOrder[]>(DEMO_ORDERS);
  const [wsStatus, setWsStatus] = React.useState<"connecting" | "open" | "closed" | "error">("connecting");
  const [lastEvent, setLastEvent] = React.useState<WsEvent | null>(null);

  React.useEffect(() => {
    const conn = connectWs("/ws/vendor/orders", {
      onStatus: (s) => setWsStatus(s),
      onEvent: (evt) => {
        setLastEvent(evt);
        // Integration point: apply event to order list (create/update).
      },
    });
    return () => conn.close();
  }, []);

  return (
    <div className="container">
      <Card
        title="Order Queue"
        meta="Demo order queue. Wire to backend GET/PATCH and WS stream for real-time updates."
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <StatusBadge
            tone={
              wsStatus === "open"
                ? "ok"
                : wsStatus === "error"
                  ? "danger"
                  : wsStatus === "closed"
                    ? "warn"
                    : "info"
            }
            text={`WS: ${wsStatus}`}
          />
          {lastEvent ? (
            <span className="badge">Last event: {lastEvent.type}</span>
          ) : (
            <span className="badge">No events</span>
          )}
        </div>

        <div style={{ height: 14 }} />

        <table className="table" aria-label="Vendor orders table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="kbd">{o.id}</td>
                <td>{o.customerName}</td>
                <td style={{ color: "var(--muted)" }}>{o.items.join(", ")}</td>
                <td>
                  <StatusBadge
                    tone={o.status === "READY" || o.status === "HANDOFF" ? "ok" : o.status === "NEW" ? "warn" : "info"}
                    text={o.status}
                  />
                </td>
                <td>
                  <button
                    className="btn btnPrimary"
                    type="button"
                    onClick={() =>
                      setOrders((prev) =>
                        prev.map((p) => (p.id === o.id ? { ...p, status: nextStatus(p.status) } : p)),
                      )
                    }
                  >
                    Advance
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 12, color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
          Backend wiring: GET <span className="kbd">/vendor/orders</span>, PATCH{" "}
          <span className="kbd">/vendor/orders/:id</span>, WS <span className="kbd">/ws/vendor/orders</span>
        </div>
      </Card>
    </div>
  );
}
