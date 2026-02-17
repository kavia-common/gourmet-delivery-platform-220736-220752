"use client";

import React from "react";
import { Card } from "@/components";

export default function AdminAnalyticsPage() {
  return (
    <div className="container">
      <div className="grid3">
        <Card title="Orders" meta="Demo analytics">
          <div style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
            <div>
              Orders today: <span className="kbd">214</span>
            </div>
            <div>
              Avg delivery: <span className="kbd">32m</span>
            </div>
            <div>
              Cancellation: <span className="kbd">1.4%</span>
            </div>
          </div>
        </Card>
        <Card title="Revenue" meta="Demo analytics">
          <div style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
            <div>
              Gross: <span className="kbd">$18,420</span>
            </div>
            <div>
              Commission: <span className="kbd">$1,842</span>
            </div>
            <div>
              Refunds: <span className="kbd">$146</span>
            </div>
          </div>
        </Card>
        <Card title="Quality" meta="Demo analytics">
          <div style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
            <div>
              On-time: <span className="kbd">93%</span>
            </div>
            <div>
              CSAT: <span className="kbd">4.7</span>
            </div>
            <div>
              Support tickets: <span className="kbd">9</span>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ height: 14 }} />

      <Card title="Backend wiring" meta="Planned endpoints">
        <div style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
          GET <span className="kbd">/admin/analytics</span> and optionally WS streams for real-time dashboards.
        </div>
      </Card>
    </div>
  );
}
