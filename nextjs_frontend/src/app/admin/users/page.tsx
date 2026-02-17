"use client";

import React from "react";
import { Card, StatusBadge } from "@/components";

type Role = "customer" | "vendor" | "courier" | "admin";

type UserRow = {
  id: string;
  email: string;
  role: Role;
  status: "active" | "suspended";
};

const DEMO_USERS: UserRow[] = [
  { id: "usr-001", email: "customer@example.com", role: "customer", status: "active" },
  { id: "usr-002", email: "vendor@example.com", role: "vendor", status: "active" },
  { id: "usr-003", email: "courier@example.com", role: "courier", status: "suspended" },
  { id: "usr-004", email: "admin@example.com", role: "admin", status: "active" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<UserRow[]>(DEMO_USERS);

  return (
    <div className="container">
      <Card title="User Management" meta="Demo user table (wire to /admin/users endpoints)">
        <table className="table" aria-label="Users table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="kbd">{u.id}</td>
                <td style={{ fontWeight: 800 }}>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <StatusBadge tone={u.status === "active" ? "ok" : "warn"} text={u.status} />
                </td>
                <td>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                      className="btn"
                      type="button"
                      onClick={() =>
                        setUsers((prev) =>
                          prev.map((p) =>
                            p.id === u.id
                              ? { ...p, status: p.status === "active" ? "suspended" : "active" }
                              : p,
                          ),
                        )
                      }
                    >
                      Toggle status
                    </button>
                    <button
                      className="btn btnPrimary"
                      type="button"
                      onClick={() =>
                        setUsers((prev) =>
                          prev.map((p) =>
                            p.id === u.id ? { ...p, role: p.role === "admin" ? "customer" : "admin" } : p,
                          ),
                        )
                      }
                    >
                      Toggle admin
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 12, color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
          Backend wiring: GET <span className="kbd">/admin/users</span>, PATCH{" "}
          <span className="kbd">/admin/users/:id</span>
        </div>
      </Card>
    </div>
  );
}
