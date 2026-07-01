"use client";

import { Icon, ICON } from "@/lib/icons";
import { SCEN, TIDES } from "@/lib/data";

const HOURS = ["06h", "09h", "12h", "15h", "18h", "21h"];
const SHAPE = [0.5, 0.7, 0.95, 1.2, 1.0, 0.7];

export function WindScreen({ scenario }) {
  const sc = SCEN[scenario];
  let windHours = HOURS.map((h, i) => ({ h, v: Math.round(SHAPE[i] * sc.windV) }));
  const wMax = Math.max(...windHours.map((x) => x.v), 1);
  windHours = windHours.map((x) => ({ ...x, barH: Math.max(10, Math.round((x.v / wMax) * 120)) }));
  const msg = sc.windV < 15 ? "Condições tranquilas para navegação." : sc.windV < 30 ? "Atenção a rajadas ao sair ao mar." : "Ventos intensos — evite a saída.";

  return (
    <div className="content-col screen-pad">
      <div className="card" style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 120, height: 120, borderRadius: "50%", border: "2px solid #e1eaed", position: "relative", flex: "none" }}>
          <span style={{ position: "absolute", top: 5, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontWeight: 800, color: "var(--faint)" }}>N</span>
          <span style={{ position: "absolute", bottom: 5, left: "50%", transform: "translateX(-50%)", fontSize: 11, fontWeight: 800, color: "var(--faint)" }}>S</span>
          <span style={{ position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)", fontSize: 11, fontWeight: 800, color: "var(--faint)" }}>L</span>
          <span style={{ position: "absolute", left: 7, top: "50%", transform: "translateY(-50%)", fontSize: 11, fontWeight: 800, color: "var(--faint)" }}>O</span>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: 16,
              transform: `rotate(${sc.windDeg}deg)`,
              transition: "transform .5s ease",
            }}
          >
            <svg width="22" height="44" viewBox="0 0 22 44" fill="none">
              <path d="M11 3 L18 18 L11 14 L4 18 Z" fill="#0c6685" />
              <line x1="11" y1="14" x2="11" y2="40" stroke="#0c6685" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 34, fontWeight: 800, color: "var(--ink)", lineHeight: 1 }}>
            {sc.windV}
            <span style={{ fontSize: 16, color: "var(--faint)", fontWeight: 700 }}> km/h</span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0c6685", marginTop: 4 }}>{sc.windLabel}</div>
          <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 8 }}>Direção: {sc.windDir}</div>
          <div style={{ fontSize: 13.5, color: "var(--muted)" }}>Rajadas até {sc.gust} km/h</div>
        </div>
      </div>

      <div style={{ marginTop: 13, padding: "13px 15px", background: "#eaf3f6", borderRadius: 14, fontSize: 14, color: "#0c4f6e", fontWeight: 600, lineHeight: 1.45 }}>
        {msg}
      </div>

      <div className="eyebrow">Previsão por horário</div>
      <div className="card" style={{ padding: "18px 14px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 140 }}>
          {windHours.map((w) => (
            <div key={w.h} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)" }}>{w.v}</span>
              <div style={{ width: 16, height: w.barH, background: "linear-gradient(180deg,#1aa0b6,#0c6685)", borderRadius: 7 }} />
              <span style={{ fontSize: 11.5, color: "var(--faint)", fontWeight: 600 }}>{w.h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SeaScreen({ scenario, offline }) {
  const sc = SCEN[scenario];
  const seaHours = HOURS.map((h, i) => ({ h, barH: Math.max(10, Math.round((0.6 + SHAPE[i] * 0.5) * (sc.wavesAvg / 3) * 120)) }));
  const msg = sc.wavesAvg < 0.8 ? "Mar calmo, boa visibilidade." : sc.wavesAvg < 1.8 ? "Mar levemente agitado, atenção." : "Mar agitado, condição de risco.";

  return (
    <div className="content-col screen-pad">
      {offline && (
        <div style={{ marginBottom: 13, padding: "13px 15px", background: "#fdf0dd", border: "1px solid #f1d9af", borderRadius: 14, fontSize: 13.5, color: "#7a4f10", lineHeight: 1.45 }}>
          Dados de mar e ondas podem estar desatualizados no modo offline.
        </div>
      )}
      <div className="card">
        <div style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)" }}>{sc.seaLabel}</div>
        <div style={{ fontSize: 15, color: "var(--muted)", marginTop: 3 }}>Ondas entre {sc.waves}</div>
        <div className="grid-3" style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
          <div>
            <div style={{ fontSize: 11.5, color: "var(--faint)", fontWeight: 600 }}>Direção</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", marginTop: 2 }}>Sudeste</div>
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: "var(--faint)", fontWeight: 600 }}>Intervalo</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", marginTop: 2 }}>8 s</div>
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: "var(--faint)", fontWeight: 600 }}>Água</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", marginTop: 2 }}>{sc.water}°</div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 13, padding: "13px 15px", background: "#eaf3f6", borderRadius: 14, fontSize: 14, color: "#0c4f6e", fontWeight: 600, lineHeight: 1.45 }}>
        {msg}
      </div>

      <div className="eyebrow">Altura das ondas por horário</div>
      <div className="card" style={{ padding: "18px 14px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 130 }}>
          {seaHours.map((w) => (
            <div key={w.h} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}>
              <div style={{ width: 18, height: w.barH, background: "linear-gradient(180deg,#5ec5d4,#0c6685)", borderRadius: 7 }} />
              <span style={{ fontSize: 11.5, color: "var(--faint)", fontWeight: 600 }}>{w.h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TIDE_PATH =
  "M0,80 C26,82 44,58 70,42 C96,26 110,30 134,46 C160,63 176,92 202,92 C228,92 244,52 270,38 C292,26 308,40 320,52";
const TIDE_AREA = `${TIDE_PATH} L320,120 L0,120 Z`;

export function TideScreen() {
  return (
    <div className="content-col screen-pad">
      <div className="card">
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <div style={{ fontSize: 14, color: "var(--muted)", fontWeight: 600 }}>Maré atual</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#0c6685" }}>Subindo · 1,1 m</div>
        </div>
        <svg viewBox="0 0 320 120" style={{ width: "100%", height: 120, marginTop: 12, overflow: "visible" }}>
          <defs>
            <linearGradient id="tideg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1aa0b6" stopOpacity="0.28" />
              <stop offset="1" stopColor="#1aa0b6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={TIDE_AREA} fill="url(#tideg)" />
          <path d={TIDE_PATH} fill="none" stroke="#0c6685" strokeWidth="3" strokeLinecap="round" />
          <circle cx="134" cy="46" r="6" fill="#fff" stroke="#0c6685" strokeWidth="3" />
        </svg>
      </div>

      <div className="eyebrow">Marés de hoje</div>
      <div className="list-card">
        {TIDES.map((t, i) => {
          const up = t.label.includes("alta");
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, padding: "15px 16px", borderBottom: i < TIDES.length - 1 ? "1px solid var(--line)" : "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: "#eaf3f6", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", color: "#0c6685" }}>
                <Icon path={ICON.chevronDown} size={18} strokeWidth={2.4} style={{ transform: up ? "rotate(180deg)" : "none" }} />
              </div>
              <div style={{ flex: 1, fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>{t.label}</div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>{t.time}</div>
                <div style={{ fontSize: 12.5, color: "var(--faint)" }}>{t.h}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 12, fontSize: 12.5, color: "var(--faint)", textAlign: "center" }}>Gráfico apenas para apoio visual.</div>
    </div>
  );
}
