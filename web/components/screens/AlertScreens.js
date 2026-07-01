"use client";

import { Icon, ICON } from "@/lib/icons";
import { STATUS, SCEN } from "@/lib/data";

function levelStyle(level) {
  if (level === "perigo") return STATUS.naoRecomendado;
  if (level === "atencao") return STATUS.atencao;
  return { bg: "#e8eef1", fg: "#0c4f6e", solid: "#0c6685" };
}

function levelLabel(level) {
  if (level === "perigo") return "Risco alto";
  if (level === "atencao") return "Atenção";
  return "Informação";
}

export function AlertsScreen({ scenario, onOpenAlert }) {
  const sc = SCEN[scenario];
  const activeAlerts = [
    ...sc.alerts,
    { type: "Camarão-rosa em defeso", time: "Até 30 de abril", level: "info", desc: "A pesca do camarão-rosa está proibida durante o período de defeso na sua região." },
  ];
  const upcomingAlerts = [
    { type: "Frente fria se aproximando", time: "Amanhã, a partir das 14h", level: "atencao", desc: "Queda de temperatura e aumento do vento previstos para amanhã à tarde." },
  ];
  const pastAlerts = [{ type: "Vento forte", time: "Ontem, 16h–20h", level: "atencao", desc: "Alerta encerrado." }];

  return (
    <div className="content-col screen-pad">
      <div className="eyebrow" style={{ margin: "2px 0 10px" }}>Ativos</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {activeAlerts.map((a) => {
          const l = levelStyle(a.level);
          return (
            <button
              key={a.type}
              onClick={() => onOpenAlert(a)}
              style={{ width: "100%", textAlign: "left", background: "#fff", border: "none", borderLeft: `5px solid ${l.solid}`, borderRadius: 15, padding: "15px 16px", cursor: "pointer", boxShadow: "var(--shadow)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ background: l.bg, color: l.fg, fontSize: 11, fontWeight: 800, padding: "4px 8px", borderRadius: 7 }}>{levelLabel(a.level)}</span>
                <span style={{ flex: 1 }} />
                <Icon path={ICON.chevronRight} size={9} color="#c2d2d8" strokeWidth={2.2} />
              </div>
              <div style={{ fontSize: 16.5, fontWeight: 800, color: "var(--ink)", marginTop: 9 }}>{a.type}</div>
              <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 2 }}>{a.time}</div>
            </button>
          );
        })}
      </div>

      <div className="eyebrow" style={{ margin: "22px 0 10px" }}>Próximos</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {upcomingAlerts.map((a) => (
          <button key={a.type} onClick={() => onOpenAlert(a)} style={{ width: "100%", textAlign: "left", background: "#fff", border: "none", borderRadius: 15, padding: "15px 16px", cursor: "pointer", boxShadow: "var(--shadow)" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>{a.type}</div>
            <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 2 }}>{a.time}</div>
          </button>
        ))}
      </div>

      <div className="eyebrow" style={{ margin: "22px 0 10px" }}>Anteriores</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {pastAlerts.map((a) => (
          <button key={a.type} onClick={() => onOpenAlert(a)} style={{ width: "100%", textAlign: "left", background: "#f4f7f8", border: "none", borderRadius: 15, padding: "14px 16px", cursor: "pointer", opacity: 0.75 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--muted)" }}>{a.type}</div>
            <div style={{ fontSize: 13, color: "var(--faint)", marginTop: 2 }}>{a.time}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function AlertDetailScreen({ alert, city, uf, onGoConditions }) {
  const al = alert || { type: "Alerta", time: "", level: "atencao", desc: "" };
  const l = levelStyle(al.level);
  const rec =
    al.level === "perigo"
      ? "Evite sair ao mar durante o período indicado. Consulte novamente antes de iniciar a atividade."
      : al.level === "atencao"
      ? "Reforce os cuidados ao sair ao mar e acompanhe a evolução das condições."
      : "Mantenha-se informado. Nenhuma ação imediata é necessária.";

  return (
    <div className="content-col screen-pad">
      <div style={{ background: l.bg, borderRadius: 18, padding: 20, textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: l.solid, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
          <Icon path={ICON.alertTriangle} size={34} color="#fff" strokeWidth={2} />
        </div>
        <div style={{ display: "inline-block", marginTop: 13, background: "#fff", color: l.fg, fontSize: 12, fontWeight: 800, padding: "5px 11px", borderRadius: 8 }}>
          {levelLabel(al.level)}
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)", marginTop: 11, lineHeight: 1.2 }}>{al.type}</div>
        <div style={{ fontSize: 15, color: l.fg, fontWeight: 600, marginTop: 5 }}>{al.time}</div>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div style={{ fontSize: 15, color: "#385561", lineHeight: 1.55 }}>{al.desc || "Condição relevante para a navegação na região."}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
          <Icon path={ICON.pin} size={17} color="#90a6af" strokeWidth={2} />
          <span style={{ fontSize: 13.5, color: "var(--muted)", fontWeight: 600 }}>
            Região afetada: {city}, {uf}
          </span>
        </div>
      </div>

      <div style={{ background: "#eaf3f6", borderRadius: 16, padding: 17, marginTop: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase", color: "#0c6685" }}>Recomendação</div>
        <div style={{ fontSize: 15, color: "#0c4f6e", lineHeight: 1.55, marginTop: 8 }}>{rec}</div>
      </div>

      <button className="btn-primary" style={{ marginTop: 16 }} onClick={onGoConditions}>
        Ver condições completas
      </button>
      <div style={{ marginTop: 14, textAlign: "center", fontSize: 12.5, color: "var(--faint)", lineHeight: 1.5 }}>
        Fonte: Defesa Civil de SC · Marinha do Brasil
        <br />
        Atualizado há 20 minutos
      </div>
    </div>
  );
}
