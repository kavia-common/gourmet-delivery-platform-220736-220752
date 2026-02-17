"use client";

import Link from "next/link";
import React from "react";
import { apiGet } from "@/lib/api";
import { Card, StatusBadge } from "@/components";

export default function Home() {
  const [health, setHealth] = React.useState<{
    status: "idle" | "loading" | "ok" | "error";
    message?: string;
  }>({ status: "idle" });

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setHealth({ status: "loading" });
      const res = await apiGet<unknown>("/");
      if (!mounted) return;

      if (res.ok) {
        setHealth({ status: "ok", message: "Backend reachable" });
      } else {
        setHealth({
          status: "error",
          message: res.error || "Backend not reachable (check NEXT_PUBLIC_API_BASE_URL)",
        });
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const badge =
    health.status === "ok" ? (
      <StatusBadge tone="ok" text={health.message || "OK"} />
    ) : health.status === "error" ? (
      <StatusBadge tone="danger" text={health.message || "ERROR"} />
    ) : (
      <StatusBadge tone="info" text="Checking backend…" />
    );

  return (
    <div className="container">
      <section className="heroGrid">
        <div className="cardInner">
          <div className="grid2">
            <div>
              <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "0.01em" }}>
                Premium bites. Neon nights.
              </h1>
              <p style={{ marginTop: 10, color: "var(--muted)", lineHeight: 1.5 }}>
                Browse curated vendors, place orders, and track deliveries in real time — or switch roles
                to manage kitchens, routes, and operations.
              </p>

              <div className="btnRow">
                <Link className="btn btnPrimary" href="/customer">
                  Enter Customer Shop
                </Link>
                <Link className="btn" href="/vendor">
                  Vendor Console
                </Link>
                <Link className="btn" href="/courier">
                  Courier HUD
                </Link>
                <Link className="btn" href="/admin">
                  Admin Terminal
                </Link>
              </div>

              <div style={{ marginTop: 14 }}>{badge}</div>
            </div>

            <Card
              title="Quick Start"
              meta="This build includes end-to-end UI wiring points for REST + WebSocket."
              actions={
                <>
                  <Link className="btn" href="/customer/orders/DEMO-001">
                    Demo Order Tracking
                  </Link>
                  <Link className="btn" href="/vendor/orders">
                    Vendor Orders
                  </Link>
                </>
              }
            >
              <div style={{ display: "grid", gap: 8, color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
                <div>
                  Set <span className="kbd">NEXT_PUBLIC_API_BASE_URL</span> to the FastAPI base URL.
                </div>
                <div>
                  WebSockets derive automatically (http→ws). Override with{" "}
                  <span className="kbd">NEXT_PUBLIC_WS_BASE_URL</span>.
                </div>
                <div>
                  Backend API spec in this environment currently only exposes <span className="kbd">/</span>{" "}
                  health check; screens are wired with clear integration points as backend expands.
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div style={{ height: 18 }} />

      <div className="grid3">
        <Card title="Customer" meta="Shop → cart → checkout → tracking">
          <ul style={{ color: "var(--muted)", paddingLeft: 18, lineHeight: 1.7, fontSize: 13 }}>
            <li>Browse vendors and menus</li>
            <li>Cart, promo, schedule, and checkout UI</li>
            <li>Order tracking with live event feed</li>
          </ul>
        </Card>
        <Card title="Vendor" meta="Prep, availability, and orders">
          <ul style={{ color: "var(--muted)", paddingLeft: 18, lineHeight: 1.7, fontSize: 13 }}>
            <li>Menu management UI</li>
            <li>Order queue (accept/ready)</li>
            <li>WebSocket-ready live order updates</li>
          </ul>
        </Card>
        <Card title="Courier" meta="Jobs, pickup/dropoff, earnings">
          <ul style={{ color: "var(--muted)", paddingLeft: 18, lineHeight: 1.7, fontSize: 13 }}>
            <li>Available jobs + accept flow</li>
            <li>Stop-by-stop timeline</li>
            <li>Location updates (stubbed)</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
