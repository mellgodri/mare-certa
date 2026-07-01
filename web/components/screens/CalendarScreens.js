"use client";

import { useState } from "react";
import { Icon, ICON } from "@/lib/icons";
import { DEFESO, SPECIES } from "@/lib/data";

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const CAL_PERMITIDAS = ["Robalo-peva", "Anchova", "Corvina", "Tilápia"];
const CAL_DEFESO = ["Tainha", "Camarão-rosa"];

export function CalendarScreen({ onGoDefeso }) {
  const [selectedDay, setSelectedDay] = useState(12);
  const cells = [null, ...Array.from({ length: 30 }, (_, i) => i + 1)];

  return (
    <div className="content-col screen-pad">
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>Junho 2026</span>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "#eef3f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon path={ICON.back} size={8} color="#5a747f" strokeWidth={2.2} />
            </div>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "#eef3f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon path={ICON.chevronRight} size={8} color="#5a747f" strokeWidth={2.2} />
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 6 }}>
          {WEEKDAYS.map((w, i) => (
            <div key={i} style={{ textAlign: "center", fontSize: 11.5, fontWeight: 700, color: "var(--faint)" }}>
              {w}
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
          {cells.map((d, i) => {
            if (d == null) return <div key={i} />;
            const sel = d === selectedDay;
            return (
              <button
                key={i}
                onClick={() => setSelectedDay(d)}
                style={{
                  aspectRatio: "1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                  border: "none",
                  borderRadius: 11,
                  background: sel ? "#0c6685" : "transparent",
                  color: sel ? "#fff" : "var(--ink)",
                  fontSize: 15,
                  fontWeight: sel ? 800 : 600,
                  cursor: "pointer",
                }}
              >
                {d}
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: sel ? "#fff" : "#d4870f" }} />
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2a8d5c" }} />
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>Permitido</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#d4870f" }} />
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>Atenção</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#cc3b29" }} />
            <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>Defeso</span>
          </div>
        </div>
      </div>

      <div className="eyebrow">12 de junho · pesca permitida</div>
      <div className="card" style={{ padding: 15 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CAL_PERMITIDAS.map((p) => (
            <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#e3f3e9", color: "#1f7a4d", fontSize: 13, fontWeight: 700, padding: "7px 11px", borderRadius: 10 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2a8d5c" }} />
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="eyebrow" style={{ margin: "18px 0 10px" }}>Em defeso neste período</div>
      <div className="card" style={{ padding: 15 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CAL_DEFESO.map((p) => (
            <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fbe6e3", color: "#a32f22", fontSize: 13, fontWeight: 700, padding: "7px 11px", borderRadius: 10 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#cc3b29" }} />
              {p}
            </span>
          ))}
        </div>
      </div>

      <button className="btn-secondary" style={{ marginTop: 16, fontSize: 15.5 }} onClick={onGoDefeso}>
        Ver períodos de defeso
      </button>
    </div>
  );
}

export function DefesoScreen({ onOpenSpecies }) {
  return (
    <div className="content-col screen-pad">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {DEFESO.map((d) => {
          const vig = d.status === "vigente";
          const match = SPECIES.find((x) => x.name === d.name);
          const barPct = vig ? Math.min(100, Math.round(((90 - d.days) / 90) * 100)) : 100;
          return (
            <button
              key={d.name}
              onClick={match ? () => onOpenSpecies(match) : undefined}
              style={{ width: "100%", textAlign: "left", background: "#fff", border: "none", borderRadius: 16, padding: 16, cursor: match ? "pointer" : "default", boxShadow: "var(--shadow)" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>{d.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--faint)", fontStyle: "italic" }}>{d.sci}</div>
                </div>
                <span style={{ background: vig ? "#fbe6e3" : "#e3f3e9", color: vig ? "#a32f22" : "#1f7a4d", fontSize: 11.5, fontWeight: 800, padding: "5px 9px", borderRadius: 8 }}>
                  {vig ? "Pesca proibida no período" : "Defeso encerrado"}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 14, color: "#385561", fontWeight: 600 }}>
                <Icon path={ICON.cal} size={16} color="#90a6af" strokeWidth={2} />
                {d.start} – {d.end}
                <span style={{ color: "var(--faint)", fontWeight: 500 }}>· {d.region}</span>
              </div>
              {vig && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ height: 6, background: "#f0e2e0", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${barPct}%`, background: "#cc3b29", borderRadius: 99 }} />
                  </div>
                  <div style={{ fontSize: 12.5, color: "#a32f22", fontWeight: 700, marginTop: 6 }}>{d.days} dias restantes</div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
