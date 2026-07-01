"use client";

import { JUMP_SCREENS, SCENARIOS, SCENARIO_LABELS, STATUS } from "@/lib/data";

export default function Sidebar({ screen, scenario, offline, onSetScenario, onToggleOffline, onJump }) {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-eyebrow">Protótipo · App de Pesca</div>
        <div className="sidebar-title">Maré Certa</div>
        <div className="sidebar-desc">Painel de opções — ajuste o cenário e navegue pelas telas.</div>
      </div>

      <div className="sidebar-card">
        <div className="sidebar-label">Cenário da tela inicial</div>
        {SCENARIOS.map((key) => {
          const active = scenario === key;
          const st = STATUS[key];
          return (
            <button
              key={key}
              className="scenario-btn"
              onClick={() => onSetScenario(key)}
              style={{
                borderColor: active ? st.solid : "#e4ebee",
                background: active ? st.bg : "#fff",
                color: active ? st.fg : "var(--muted)",
              }}
            >
              <span className="scenario-dot" style={{ background: st.solid }} />
              <span style={{ flex: 1, textAlign: "left" }}>{SCENARIO_LABELS[key]}</span>
            </button>
          );
        })}
        <button className={`offline-btn${offline ? " active" : ""}`} onClick={onToggleOffline}>
          {offline ? "Desativar modo offline" : "Simular modo offline"}
        </button>
      </div>

      <div className="sidebar-card">
        <div className="sidebar-label">Ir para tela</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {JUMP_SCREENS.map(([key, label]) => (
            <button
              key={key}
              className={`jump-btn${screen === key ? " active" : ""}`}
              onClick={() => onJump(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
