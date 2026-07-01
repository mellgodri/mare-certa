"use client";

import { useState } from "react";
import { Icon, ICON } from "@/lib/icons";
import { SPECIES } from "@/lib/data";

const FILTERS = [
  ["todas", "Todas"],
  ["permitida", "Permitidas"],
  ["defeso", "Em defeso"],
  ["doce", "Água doce"],
  ["salgada", "Água salgada"],
];

export function SpeciesScreen({ onOpenSpecies }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("todas");

  const items = SPECIES.filter((sp) => {
    const q = query.toLowerCase();
    const okQ = !q || sp.name.toLowerCase().includes(q) || sp.sci.toLowerCase().includes(q);
    const okF =
      filter === "todas" ||
      (filter === "permitida" && sp.status === "permitida") ||
      (filter === "defeso" && sp.status === "defeso") ||
      (filter === "doce" && sp.env.includes("doce")) ||
      (filter === "salgada" && sp.env.includes("salgada"));
    return okQ && okF;
  });

  return (
    <div className="content-col screen-pad">
      <div className="search-box">
        <Icon path={ICON.search} size={19} color="#7d949e" strokeWidth={2.2} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar espécie" />
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 13, overflowX: "auto", paddingBottom: 2 }}>
        {FILTERS.map(([key, label]) => (
          <button key={key} className={`chip${filter === key ? " active" : ""}`} onClick={() => setFilter(key)}>
            {label}
          </button>
        ))}
      </div>

      {items.length === 0 && (
        <div style={{ marginTop: 40, textAlign: "center", padding: "0 20px" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#e8eef1", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", color: "var(--faint)" }}>
            <Icon path={ICON.search} size={30} strokeWidth={2} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "var(--ink)", marginTop: 15 }}>Nenhuma espécie encontrada</div>
          <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 8, lineHeight: 1.55 }}>
            Verifique a escrita, pesquise pelo nome popular ou remova os filtros.
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 14 }}>
        {items.map((sp) => {
          const permitida = sp.status === "permitida";
          return (
            <button
              key={sp.id}
              onClick={() => onOpenSpecies(sp)}
              style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 13, background: "#fff", border: "none", borderRadius: 16, padding: 12, cursor: "pointer", boxShadow: "var(--shadow)" }}
            >
              <div style={{ width: 56, height: 56, borderRadius: 13, background: sp.art, flex: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon path={ICON.fishSwim} size={30} color="rgba(255,255,255,.9)" strokeWidth={1.7} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>{sp.name}</div>
                <div style={{ fontSize: 12.5, color: "var(--faint)", fontStyle: "italic", marginBottom: 6 }}>{sp.sci}</div>
                <span className="badge" style={{ background: permitida ? "#e3f3e9" : "#fbe6e3", color: permitida ? "#1f7a4d" : "#a32f22" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: permitida ? "#2a8d5c" : "#cc3b29" }} />
                  {permitida ? "Pesca permitida" : "Em período de defeso"}
                </span>
              </div>
              <Icon path={ICON.chevronRight} size={9} color="#c2d2d8" strokeWidth={2.2} style={{ flex: "none" }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SpeciesDetailScreen({ species, city, uf, onGoDefeso }) {
  const sp = species || SPECIES[0];
  const permitida = sp.status === "permitida";
  const rows = [
    ["Nome científico", sp.sci],
    ["Ambiente", sp.env],
    ["Tamanho mínimo", sp.minSize],
    ["Período permitido", sp.period],
    ["Período de defeso", sp.defeso],
    ["Região da regra", `${city}, ${uf}`],
  ];

  return (
    <div style={{ padding: "0 0 24px", animation: "pf-fade .3s ease" }}>
      <div style={{ height: 150, background: sp.art, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon path={ICON.fishSwim} size={80} color="rgba(255,255,255,.92)" strokeWidth={1.3} />
      </div>
      <div className="content-col" style={{ padding: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: "var(--ink)" }}>{sp.name}</div>
        <div style={{ fontSize: 14, color: "var(--faint)", fontStyle: "italic" }}>{sp.sci}</div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            background: permitida ? "#e3f3e9" : "#fbe6e3",
            borderRadius: 15,
            padding: 15,
            marginTop: 15,
          }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 11, background: permitida ? "#2a8d5c" : "#cc3b29", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <Icon path={ICON.check} size={22} color="#fff" strokeWidth={2.4} />
          </div>
          <div style={{ fontSize: 17, fontWeight: 800, color: permitida ? "#1f7a4d" : "#a32f22", lineHeight: 1.25 }}>
            {permitida ? "Pesca permitida atualmente" : "Pesca proibida — período de defeso"}
          </div>
        </div>

        <div className="list-card" style={{ marginTop: 15 }}>
          {rows.map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 14, padding: "13px 15px", borderBottom: "1px solid var(--line)" }}>
              <span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 600, flex: "none" }}>{label}</span>
              <span style={{ fontSize: 14, color: "var(--ink)", fontWeight: 700, textAlign: "right" }}>{value}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "#fff8ec", border: "1px solid #f1e2c4", borderRadius: 14, padding: "14px 15px", marginTop: 14, display: "flex", gap: 10 }}>
          <Icon path={ICON.info} size={19} color="#b07d16" strokeWidth={2} style={{ flex: "none", marginTop: 1 }} />
          <div style={{ fontSize: 13.5, color: "#7a5a12", lineHeight: 1.5 }}>{sp.note} As regras podem variar por região.</div>
        </div>

        <div className="grid-2" style={{ marginTop: 15 }}>
          <button className="btn-secondary" style={{ height: 50, fontSize: 14.5 }} onClick={onGoDefeso}>
            Ver no calendário
          </button>
          <button style={{ height: 50, border: "none", borderRadius: 14, background: "#eaf3f6", color: "#0c6685", fontSize: 14.5, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <Icon path={ICON.bookmark} size={17} />
            Favoritar
          </button>
        </div>
        <div style={{ marginTop: 14, textAlign: "center", fontSize: 12, color: "var(--faint)" }}>Fonte: Ministério da Pesca · Atualizado em 01/07/2026</div>
      </div>
    </div>
  );
}
