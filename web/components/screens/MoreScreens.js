"use client";

import { useState } from "react";
import { Icon, ICON } from "@/lib/icons";
import { FAVS, badgeOf, STATUS } from "@/lib/data";

const MORE_ITEMS_DEF = (nav) => [
  { label: "Locais favoritos", path: ICON.pin, onClick: () => nav.goFav() },
  { label: "Espécies favoritas", path: ICON.fish, onClick: () => nav.goTab("species") },
  { label: "Alertas e notificações", path: ICON.bell, onClick: () => nav.go("alerts") },
  { label: "Dados salvos offline", path: ICON.download, onClick: () => {} },
  { label: "Tutorial", path: ICON.helpCircle, onClick: () => nav.goTab("onboarding") },
  { label: "Configurações", path: ICON.settings, onClick: () => nav.go("settings") },
  { label: "Sobre o aplicativo", path: ICON.info, onClick: () => {} },
  { label: "Fontes das informações", path: ICON.externalLink, onClick: () => {} },
];

export function MoreScreen({ nav }) {
  const items = MORE_ITEMS_DEF(nav);
  return (
    <div className="content-col screen-pad">
      <div className="list-card">
        {items.map((m) => (
          <button key={m.label} className="list-row" onClick={m.onClick}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#eaf3f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#0c6685", flex: "none" }}>
              <Icon path={m.path} size={20} />
            </div>
            <span style={{ flex: 1, fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>{m.label}</span>
            <Icon path={ICON.chevronRight} size={9} color="#c2d2d8" strokeWidth={2.2} />
          </button>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 20, fontSize: 12.5, color: "var(--faint)", lineHeight: 1.6 }}>
        Maré Certa · versão 1.0 (protótipo)
        <br />
        Seus dados ficam salvos apenas neste aparelho.
      </div>
    </div>
  );
}

const TXT_SIZES = [
  [0.9, "A−"],
  [1, "A"],
  [1.15, "A+"],
  [1.3, "A++"],
];
const ALERT_TYPE_DEFS = [
  ["Alertas de clima", true],
  ["Alertas de vento", true],
  ["Alertas marítimos", true],
  ["Alertas de defeso", false],
];

export function SettingsScreen() {
  const [notifOn, setNotifOn] = useState(true);
  const [textScale, setTextScale] = useState(1);

  return (
    <div className="content-col screen-pad">
      <div className="eyebrow" style={{ margin: "2px 0 10px" }}>Notificações</div>
      <div className="card" style={{ padding: "6px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" }}>
          <span style={{ fontSize: 15.5, fontWeight: 600, color: "var(--ink)" }}>Ativar notificações</span>
          <button
            className="toggle-track"
            style={{ background: notifOn ? "#2a8d5c" : "#cdd8dc" }}
            onClick={() => setNotifOn((v) => !v)}
          >
            <span className="toggle-knob" style={{ left: notifOn ? 23 : 3 }} />
          </button>
        </div>
      </div>
      <div className="list-card" style={{ marginTop: 10 }}>
        {ALERT_TYPE_DEFS.map(([label, on]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", borderBottom: "1px solid var(--line)" }}>
            <span style={{ fontSize: 15, color: "#385561" }}>{label}</span>
            <div style={{ width: 44, height: 26, borderRadius: 99, background: on ? "#2a8d5c" : "#cdd8dc", position: "relative" }}>
              <span style={{ position: "absolute", top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,.2)" }} />
            </div>
          </div>
        ))}
      </div>

      <div className="eyebrow">Acessibilidade</div>
      <div className="card">
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginBottom: 11 }}>Tamanho do texto</div>
        <div style={{ display: "flex", gap: 8 }}>
          {TXT_SIZES.map(([v, label]) => (
            <button
              key={label}
              onClick={() => setTextScale(v)}
              style={{ flex: 1, padding: 9, border: "none", borderRadius: 10, background: textScale === v ? "#0c6685" : "#eef3f5", color: textScale === v ? "#fff" : "var(--muted)", fontSize: 15, fontWeight: 800, cursor: "pointer" }}
            >
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>Alto contraste</span>
          <div style={{ width: 44, height: 26, borderRadius: 99, background: "#cdd8dc", position: "relative" }}>
            <span style={{ position: "absolute", top: 3, left: 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,.2)" }} />
          </div>
        </div>
      </div>

      <div className="eyebrow">Unidades</div>
      <div className="list-card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
          <span style={{ fontSize: 15, color: "#385561" }}>Velocidade do vento</span>
          <span style={{ fontSize: 14.5, fontWeight: 700, color: "#0c6685" }}>km/h</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span style={{ fontSize: 15, color: "#385561" }}>Temperatura</span>
          <span style={{ fontSize: 14.5, fontWeight: 700, color: "#0c6685" }}>°C</span>
        </div>
      </div>

      <div className="eyebrow">Permissões</div>
      <div className="list-card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
          <span style={{ fontSize: 15, color: "#385561" }}>Localização</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#1f7a4d", background: "#e3f3e9", padding: "4px 9px", borderRadius: 7 }}>Permitida</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
          <span style={{ fontSize: 15, color: "#385561" }}>Notificações</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#9a5b00", background: "#fdf0dd", padding: "4px 9px", borderRadius: 7 }}>Negada</span>
        </div>
      </div>
      <button className="btn-secondary" style={{ marginTop: 12, height: 50, fontSize: 15 }}>
        Alterar nas configurações do celular
      </button>
    </div>
  );
}

export function FavLocationsScreen({ onSelectCity, onOpenLocation }) {
  return (
    <div className="content-col screen-pad">
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {FAVS.map((f) => {
          const b = badgeOf(f.rating);
          return (
            <button
              key={f.city}
              className="list-row"
              style={{ borderRadius: 16, borderBottom: "none", boxShadow: "var(--shadow)" }}
              onClick={() => onSelectCity({ name: f.city, rating: f.rating })}
            >
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: STATUS[f.rating].solid, flex: "none" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>
                  {f.city}, {f.uf}
                </div>
                <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 2 }}>{f.note}</div>
              </div>
              <span className="badge" style={{ background: b.bg, color: b.fg }}>
                {b.text}
              </span>
            </button>
          );
        })}
      </div>
      <button className="btn-dashed" style={{ marginTop: 16 }} onClick={onOpenLocation}>
        <Icon path={ICON.plus} size={18} />
        Adicionar localização
      </button>
    </div>
  );
}

export function ErrorScreen({ onRetry }) {
  return (
    <div style={{ minHeight: "100%", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "30px 30px 60px", animation: "pf-fade .3s ease" }}>
      <div style={{ width: 88, height: 88, borderRadius: "50%", background: "#fbe6e3", display: "flex", alignItems: "center", justifyContent: "center", color: "#cc3b29" }}>
        <Icon path={ICON.errorCircle} size={42} strokeWidth={2} />
      </div>
      <div style={{ fontSize: 21, fontWeight: 800, color: "var(--ink)", marginTop: 18 }}>Não foi possível atualizar os dados</div>
      <div style={{ fontSize: 15, color: "var(--muted)", marginTop: 8, lineHeight: 1.55, maxWidth: 280 }}>
        Verifique sua conexão com a internet e tente novamente.
      </div>
      <button className="btn-primary" style={{ marginTop: 24, maxWidth: 300 }} onClick={onRetry}>
        Tentar novamente
      </button>
      <button className="btn-secondary" style={{ marginTop: 11, maxWidth: 300 }} onClick={onRetry}>
        Ver última consulta
      </button>
    </div>
  );
}
