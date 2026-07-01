"use client";

import { useState } from "react";
import { Icon, ICON } from "@/lib/icons";
import { CITIES, badgeOf } from "@/lib/data";

export function SplashScreen({ onFinish }) {
  return (
    <div
      style={{
        minHeight: "100%",
        flex: 1,
        background: "linear-gradient(165deg,#0a4f74 0%,#0c6685 48%,#108aa0 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: -40,
          left: -30,
          right: -30,
          height: 340,
          background: "radial-gradient(120% 90% at 50% 100%, rgba(255,255,255,.18), transparent 70%)",
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          background: "linear-gradient(180deg, transparent, rgba(7,42,60,.55))",
        }}
      />
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 28,
          background: "rgba(255,255,255,.14)",
          border: "1px solid rgba(255,255,255,.28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 18px 50px rgba(7,42,60,.4)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Icon path={ICON.fishOutline} size={52} color="#fff" strokeWidth={1.6} />
      </div>
      <div style={{ marginTop: 26, fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>
        Maré Certa
      </div>
      <div style={{ marginTop: 8, fontSize: 15, color: "rgba(255,255,255,.82)", fontWeight: 500 }}>
        Planeje sua pesca com segurança
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 96,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            border: "3px solid rgba(255,255,255,.28)",
            borderTopColor: "#fff",
            borderRadius: "50%",
            animation: "pf-spin .9s linear infinite",
          }}
        />
        <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.7)" }}>Carregando condições da região…</div>
      </div>
      <button
        onClick={onFinish}
        style={{ position: "absolute", inset: 0, background: "transparent", border: "none", cursor: "pointer" }}
        aria-label="Continuar"
      />
    </div>
  );
}

const ONB_DATA = [
  {
    title: "Planeje sua pesca com mais segurança",
    text: "Consulte clima, vento, maré, condições do mar, espécies e períodos de defeso em um único lugar.",
    cta: "Continuar",
    art: "linear-gradient(150deg,#0c6685,#13a0b6)",
    showChips: false,
    icon: ICON.fishSwim,
  },
  {
    title: "Saiba como estão as condições",
    text: "Veja rapidamente se o dia está favorável, exige atenção ou não é recomendado para sair ao mar.",
    cta: "Continuar",
    art: "linear-gradient(150deg,#1f8d57,#0f7a59)",
    showChips: true,
    icon: ICON.sun,
  },
  {
    title: "Consulte espécies e períodos de defeso",
    text: "Pesquise uma espécie e descubra se a pesca está permitida no período atual.",
    cta: "Começar",
    art: "linear-gradient(150deg,#0c6685,#0a4f74)",
    showChips: false,
    icon: ICON.cal,
  },
];

export function OnboardingScreen({ onSkip, onNext }) {
  const [step, setStep] = useState(0);
  const onb = ONB_DATA[step];

  const handleNext = () => {
    if (step >= ONB_DATA.length - 1) {
      onNext();
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div style={{ minHeight: "100%", flex: 1, display: "flex", flexDirection: "column", padding: "78px 26px 30px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onSkip}
          style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 15, fontWeight: 600, cursor: "pointer", padding: 8 }}
        >
          Pular
        </button>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 26 }}>
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 34,
            background: onb.art,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 22px 48px rgba(12,42,54,.16)",
            animation: "pf-rise .4s ease",
          }}
        >
          <Icon path={onb.icon} size={86} color="#fff" strokeWidth={1.6} />
        </div>
        <div style={{ maxWidth: 320, animation: "pf-rise .45s ease" }}>
          <h1 style={{ fontSize: 27, fontWeight: 800, color: "var(--ink)", lineHeight: 1.18, margin: 0, letterSpacing: -0.4 }}>
            {onb.title}
          </h1>
          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.55, margin: "14px 0 0" }}>{onb.text}</p>
        </div>
        {onb.showChips && (
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#e3f3e9", color: "#1f7a4d", fontWeight: 700, fontSize: 13, padding: "8px 13px", borderRadius: 11 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#2a8d5c" }} />
              Favorável
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#fdf0dd", color: "#9a5b00", fontWeight: 700, fontSize: 13, padding: "8px 13px", borderRadius: 11 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#d4870f" }} />
              Atenção
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#fbe6e3", color: "#a32f22", fontWeight: 700, fontSize: 13, padding: "8px 13px", borderRadius: 11 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#cc3b29" }} />
              Não rec.
            </div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {ONB_DATA.map((_, i) => (
            <span
              key={i}
              style={{
                width: i === step ? 22 : 8,
                height: 8,
                borderRadius: 99,
                background: i === step ? "#0c6685" : "#c2d2d8",
                transition: "all .3s",
              }}
            />
          ))}
        </div>
        <button className="btn-primary" onClick={handleNext}>
          {onb.cta}
        </button>
      </div>
    </div>
  );
}

export function PermissionScreen({ onAllow, onManual, onDeny }) {
  return (
    <div style={{ minHeight: "100%", flex: 1, display: "flex", flexDirection: "column", padding: "90px 26px 34px" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 24 }}>
        <div
          style={{
            width: 128,
            height: 128,
            borderRadius: "50%",
            background: "radial-gradient(circle at 50% 35%, #1aa0b6, #0c6685)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 18px 40px rgba(12,102,133,.3)",
          }}
        >
          <Icon path={ICON.pin} size={58} color="#fff" strokeWidth={1.7} />
        </div>
        <div style={{ maxWidth: 330 }}>
          <h1 style={{ fontSize: 25, fontWeight: 800, color: "var(--ink)", margin: 0, lineHeight: 1.2 }}>
            Permitir acesso à localização?
          </h1>
          <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.55, margin: "14px 0 0" }}>
            Usamos sua localização para mostrar as condições do tempo, vento, mar e maré da sua região.
          </p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <button className="btn-primary" onClick={onAllow}>
          Permitir localização
        </button>
        <button className="btn-secondary" onClick={onManual}>
          Escolher local manualmente
        </button>
        <button className="btn-ghost" onClick={onDeny}>
          Agora não
        </button>
      </div>
    </div>
  );
}

export function LocationScreen({ hasBack, onBack, denied, onSelectCity, onUseGps }) {
  const [query, setQuery] = useState("");
  const filtered = CITIES.filter((c) => !query || c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ minHeight: "100%", flex: 1, padding: "62px 0 30px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 24px 14px" }}>
        {hasBack && (
          <button className="icon-btn" onClick={onBack} aria-label="Voltar">
            <Icon path={ICON.back} size={11} color="#0c4f6e" strokeWidth={2.4} />
          </button>
        )}
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "var(--ink)", margin: 0 }}>Escolher localização</h1>
      </div>

      <div style={{ padding: "0 24px" }}>
        <div className="search-box">
          <Icon path={ICON.search} size={19} color="#7d949e" strokeWidth={2.2} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar cidade ou região"
          />
        </div>

        {denied && (
          <div style={{ marginTop: 14, background: "#fdf0dd", border: "1px solid #f1d9af", borderRadius: 15, padding: "14px 15px", display: "flex", gap: 11 }}>
            <Icon path={ICON.alertTriangle} size={20} color="#9a5b00" strokeWidth={2} style={{ flex: "none", marginTop: 1 }} />
            <div style={{ fontSize: 13.5, color: "#7a4f10", lineHeight: 1.5 }}>
              A localização automática está desativada. Você ainda pode pesquisar uma cidade manualmente.
            </div>
          </div>
        )}

        <button
          onClick={onUseGps}
          style={{
            marginTop: 14,
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#eaf5f8",
            border: "1.5px solid #bfe0e8",
            borderRadius: 15,
            padding: "14px 15px",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div style={{ width: 38, height: 38, borderRadius: 11, background: "#0c6685", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
            <Icon path={ICON.compass} size={20} color="#fff" strokeWidth={2} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15.5, fontWeight: 700, color: "#0c4f6e" }}>Usar minha localização</div>
            <div style={{ fontSize: 12.5, color: "var(--muted)" }}>Detectar via GPS do aparelho</div>
          </div>
        </button>

        <div style={{ marginTop: 22, fontSize: 12, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: "var(--muted-2)" }}>
          Cidades sugeridas
        </div>
        <div className="list-card" style={{ marginTop: 10 }}>
          {filtered.map((c) => {
            const b = badgeOf(c.rating);
            return (
              <button key={c.name} className="list-row" onClick={() => onSelectCity(c)}>
                <Icon path={ICON.pin} size={18} color="#7d949e" strokeWidth={2} style={{ flex: "none" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>{c.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{c.region}</div>
                </div>
                <span className="badge" style={{ background: b.bg, color: b.fg }}>
                  {b.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
