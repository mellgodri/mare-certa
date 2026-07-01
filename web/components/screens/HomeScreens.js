"use client";

import { Icon, ICON, skyIconPath, skyColor, METRIC_ICON_PATH } from "@/lib/icons";
import { STATUS, FORECAST, SCEN, badgeOf } from "@/lib/data";

export function HomeScreen({ scenario, location, hasAlert, onOpenLocation, onRefresh, onGoAlerts, onGoForecast, onGoConditions, onGoWind, onGoSea, onGoTide, onOpenDay, onGoSpecies, onGoCalendar, onGoLocation }) {
  const sc = SCEN[scenario];
  const st = STATUS[scenario];
  const statusLabel =
    scenario === "favoravel" ? "Favorável para pesca" : scenario === "atencao" ? "Atenção ao sair ao mar" : "Saída não recomendada";
  const statusDesc =
    scenario === "favoravel"
      ? "As condições estão adequadas para o período da manhã."
      : scenario === "atencao"
      ? "Há previsão de vento forte durante a tarde."
      : "Mar agitado e possibilidade de tempestade.";

  const homeCards = [
    { label: "Tempo", value: `${sc.temp}°`, sub: sc.sky, path: skyIconPath(sc.skyKind), onClick: onGoConditions },
    { label: "Vento", value: `${sc.windV}`, sub: `km/h · ${sc.windLabel}`, path: ICON.wind, onClick: onGoWind },
    { label: "Mar", value: sc.waves.split("–")[0] || sc.waves, sub: sc.seaLabel, path: ICON.wave, onClick: onGoSea },
    { label: "Maré", value: "1,3 m", sub: "Próxima alta 07h42", path: ICON.tide, onClick: onGoTide },
  ];

  const forecastShort = FORECAST.slice(0, 3).map((d) => {
    const b = badgeOf(d.rating);
    return { ...d, badge: b, onClick: () => onOpenDay(d) };
  });

  const quickAccess = [
    { label: "Consultar espécies", path: ICON.fish, onClick: onGoSpecies },
    { label: "Calendário de pesca", path: ICON.calSmall, onClick: onGoCalendar },
    { label: "Alterar localização", path: ICON.pin, onClick: onGoLocation },
    { label: "Previsão completa", path: ICON.cond, onClick: onGoForecast },
  ];

  return (
    <div style={{ paddingBottom: 18, animation: "pf-fade .3s ease" }}>
      <div style={{ background: st.heroBg, padding: "60px 24px 22px", borderRadius: "0 0 26px 26px" }}>
        <div className="content-col" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={onOpenLocation}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.16)", border: "none", borderRadius: 11, padding: "7px 11px", cursor: "pointer" }}
          >
            <Icon path={ICON.pin} size={15} color="#fff" strokeWidth={2.2} />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
              {location.city}, {location.uf}
            </span>
            <Icon path={ICON.chevronDown} size={13} color="#fff" strokeWidth={2.6} />
          </button>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onRefresh} style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,.16)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Icon path={ICON.refresh} size={18} color="#fff" strokeWidth={2.2} />
            </button>
            <button onClick={onGoAlerts} style={{ position: "relative", width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,.16)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Icon path={ICON.bell} size={18} color="#fff" strokeWidth={2.2} />
              {hasAlert && (
                <span style={{ position: "absolute", top: 8, right: 9, width: 9, height: 9, borderRadius: "50%", background: "#ff5a3c", border: `1.5px solid ${st.heroSolid}` }} />
              )}
            </button>
          </div>
        </div>

        <div className="content-col" style={{ marginTop: 22, color: "#fff" }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,.78)" }}>
            {st.kicker}
          </span>
          <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.1, marginTop: 6, letterSpacing: -0.5 }}>{statusLabel}</div>
          <div style={{ fontSize: 15.5, color: "rgba(255,255,255,.88)", marginTop: 8, lineHeight: 1.45, maxWidth: 300 }}>{statusDesc}</div>
        </div>

        <div className="content-col" style={{ marginTop: 20, background: "rgba(255,255,255,.16)", border: "1px solid rgba(255,255,255,.22)", borderRadius: 16, padding: "13px 15px", display: "flex", alignItems: "center", gap: 13 }}>
          <Icon path={ICON.sun} size={26} color="#fff" strokeWidth={1.9} style={{ flex: "none" }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,.8)", textTransform: "uppercase", letterSpacing: 0.6 }}>Melhor período hoje</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginTop: 1 }}>Das {sc.best}</div>
          </div>
        </div>
      </div>

      <div className="content-col" style={{ padding: "18px 24px 0" }}>
        <div className="grid-2">
          {homeCards.map((c) => (
            <button key={c.label} onClick={c.onClick} style={{ background: "#fff", border: "none", borderRadius: 18, padding: 15, textAlign: "left", cursor: "pointer", boxShadow: "var(--shadow)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "#eaf3f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#0c6685" }}>
                  <Icon path={c.path} size={18} />
                </div>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--muted)" }}>{c.label}</span>
              </div>
              <div style={{ fontSize: 25, fontWeight: 800, color: "var(--ink)", marginTop: 11, letterSpacing: -0.5 }}>{c.value}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{c.sub}</div>
            </button>
          ))}
        </div>

        {sc.alerts.length > 0 ? (
          sc.alerts.map((a) => {
            const lvl = a.level === "perigo" ? STATUS.naoRecomendado : STATUS.atencao;
            return (
              <button
                key={a.type}
                onClick={onGoAlerts}
                style={{ marginTop: 13, width: "100%", display: "flex", alignItems: "center", gap: 12, background: lvl.bg, border: `1px solid ${lvl.bg}`, borderRadius: 16, padding: "13px 15px", cursor: "pointer", textAlign: "left" }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 11, background: lvl.solid, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                  <Icon path={ICON.alertTriangle} size={20} color="#fff" strokeWidth={2} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: lvl.fg }}>{a.type}</div>
                  <div style={{ fontSize: 13, color: lvl.fg, opacity: 0.85, marginTop: 1 }}>{a.time}</div>
                </div>
                <Icon path={ICON.chevronRight} size={9} color={lvl.fg} strokeWidth={2.2} style={{ flex: "none" }} />
              </button>
            );
          })
        ) : (
          <div style={{ marginTop: 13, display: "flex", alignItems: "center", gap: 11, background: "#eef3f5", borderRadius: 16, padding: "14px 15px" }}>
            <Icon path={ICON.checkCircle} size={20} color="#2a8d5c" strokeWidth={2.2} style={{ flex: "none" }} />
            <div style={{ fontSize: 14, color: "var(--muted)", fontWeight: 500 }}>Nenhum alerta importante para esta região.</div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 24, marginBottom: 11 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--ink)", margin: 0 }}>Próximos dias</h2>
          <button onClick={onGoForecast} style={{ background: "none", border: "none", color: "#0c6685", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            Ver tudo
          </button>
        </div>
        <div className="list-card">
          {forecastShort.map((d) => (
            <button key={d.day} className="list-row" onClick={d.onClick}>
              <div style={{ width: 74, fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>{d.day}</div>
              <Icon path={skyIconPath(d.skyKind)} size={20} color={skyColor(d.skyKind)} />
              <div style={{ flex: 1, fontSize: 13.5, color: "var(--muted)" }}>{d.sky}</div>
              <span className="badge" style={{ background: d.badge.bg, color: d.badge.fg }}>
                {d.badge.text}
              </span>
            </button>
          ))}
        </div>

        <h2 className="section-title">Acessos rápidos</h2>
        <div className="grid-2">
          {quickAccess.map((q) => (
            <button key={q.label} onClick={q.onClick} style={{ display: "flex", alignItems: "center", gap: 11, background: "#fff", border: "none", borderRadius: 15, padding: 14, cursor: "pointer", textAlign: "left", boxShadow: "var(--shadow)" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#eaf3f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#0c6685", flex: "none" }}>
                <Icon path={q.path} size={18} />
              </div>
              <span style={{ fontSize: 14.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{q.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConditionsScreen({ scenario, onGoWind, onGoSea, onGoTide }) {
  const sc = SCEN[scenario];
  const b = badgeOf(scenario);
  const title = scenario === "favoravel" ? "Favorável para pesca" : scenario === "atencao" ? "Atenção ao sair ao mar" : "Saída não recomendada";
  const desc =
    scenario === "favoravel"
      ? "Condições adequadas, sobretudo no início da manhã."
      : scenario === "atencao"
      ? "O dia exige cuidado em alguns períodos."
      : "Condições desfavoráveis durante todo o dia.";
  const why =
    scenario === "favoravel" ? "Por que o dia está “Favorável”?" : scenario === "atencao" ? "Por que o dia está em “Atenção”?" : "Por que a saída é “Não recomendada”?";

  const metrics = [
    { label: "Temperatura", value: `${sc.temp}°`, path: METRIC_ICON_PATH.thermo },
    { label: "Sensação térmica", value: `${sc.feels}°`, path: METRIC_ICON_PATH.thermo },
    { label: "Chance de chuva", value: `${sc.rain}%`, path: ICON.rain },
    { label: "Vento", value: `${sc.windV} km/h`, path: METRIC_ICON_PATH.wind },
    { label: "Ondas", value: sc.waves.split("–")[0], path: METRIC_ICON_PATH.wave },
    { label: "Água", value: `${sc.water}°`, path: METRIC_ICON_PATH.tide },
    { label: "Nascer do sol", value: sc.sunrise, path: ICON.sun },
    { label: "Pôr do sol", value: sc.sunset, path: METRIC_ICON_PATH.sunset },
  ];

  return (
    <div className="content-col screen-pad">
      <div className="card">
        <span className="badge" style={{ background: b.bg, color: b.fg }}>
          {b.text}
        </span>
        <div style={{ fontSize: 21, fontWeight: 800, color: "var(--ink)", marginTop: 10 }}>{title}</div>
        <div style={{ fontSize: 14.5, color: "var(--muted)", marginTop: 4, lineHeight: 1.45 }}>{desc}</div>
      </div>

      <div className="grid-2" style={{ marginTop: 14 }}>
        {metrics.map((m) => (
          <div key={m.label} className="card-sm">
            <div style={{ display: "flex", alignItems: "center", gap: 7, color: "#0c6685" }}>
              <Icon path={m.path} size={18} color="#90a6af" />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--muted)" }}>{m.label}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)", marginTop: 7 }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>{why}</div>
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 11 }}>
          {sc.reasons.map((r) => (
            <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0c6685", marginTop: 7, flex: "none" }} />
              <span style={{ fontSize: 14.5, color: "#385561", lineHeight: 1.45 }}>{r}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 13, fontSize: 12.5, color: "var(--faint)", lineHeight: 1.5 }}>
          A classificação é baseada em dados objetivos de clima, vento e mar.
        </div>
      </div>

      <div className="grid-3" style={{ marginTop: 14 }}>
        <button onClick={onGoWind} style={{ background: "#fff", border: "none", borderRadius: 15, padding: "15px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer", boxShadow: "var(--shadow)" }}>
          <Icon path={ICON.wind} size={22} color="#0c6685" />
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Vento</span>
        </button>
        <button onClick={onGoSea} style={{ background: "#fff", border: "none", borderRadius: 15, padding: "15px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer", boxShadow: "var(--shadow)" }}>
          <Icon path={ICON.wave} size={22} color="#0c6685" />
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Mar</span>
        </button>
        <button onClick={onGoTide} style={{ background: "#fff", border: "none", borderRadius: 15, padding: "15px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer", boxShadow: "var(--shadow)" }}>
          <Icon path={ICON.tide} size={22} color="#0c6685" />
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Maré</span>
        </button>
      </div>
    </div>
  );
}

export function ForecastScreen({ onOpenDay }) {
  return (
    <div className="content-col screen-pad">
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {FORECAST.map((d) => {
          const b = badgeOf(d.rating);
          return (
            <button key={d.day} onClick={() => onOpenDay(d)} style={{ background: "#fff", border: "none", borderRadius: 18, padding: "15px 16px", cursor: "pointer", textAlign: "left", boxShadow: "var(--shadow)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Icon path={skyIconPath(d.skyKind)} size={22} color={skyColor(d.skyKind)} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16.5, fontWeight: 800, color: "var(--ink)" }}>{d.day}</div>
                  <div style={{ fontSize: 12.5, color: "var(--faint)" }}>{d.full}</div>
                </div>
                <span className="badge" style={{ background: b.bg, color: b.fg }}>
                  {b.text}
                </span>
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 13, paddingTop: 13, borderTop: "1px solid var(--line)" }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--faint)", fontWeight: 600 }}>Temp.</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>
                    {d.min}°–{d.max}°
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--faint)", fontWeight: 600 }}>Chuva</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>{d.rain}%</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--faint)", fontWeight: 600 }}>Vento</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>{d.wind} km/h</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--faint)", fontWeight: 600 }}>Melhor</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#0c6685" }}>{d.best}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DayDetailScreen({ day }) {
  const sd = day || FORECAST[0];
  const b = badgeOf(sd.rating);
  const periods = [
    { period: "Manhã", time: "06h–12h", temp: `${sd.min + 2}°`, wind: `${Math.round(sd.wind * 0.7)} km/h`, rain: `${Math.max(0, sd.rain - 30)}%`, path: ICON.sun },
    { period: "Tarde", time: "12h–18h", temp: `${sd.max}°`, wind: `${sd.wind} km/h`, rain: `${sd.rain}%`, path: skyIconPath(sd.skyKind) },
    { period: "Noite", time: "18h–00h", temp: `${sd.min + 1}°`, wind: `${Math.round(sd.wind * 0.8)} km/h`, rain: `${Math.max(0, sd.rain - 10)}%`, path: METRIC_ICON_PATH.moon },
  ];

  return (
    <div className="content-col screen-pad">
      <div className="card">
        <div style={{ fontSize: 13, color: "var(--faint)", fontWeight: 600 }}>{sd.full}</div>
        <span className="badge" style={{ background: b.bg, color: b.fg, marginTop: 8 }}>
          {b.text}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 13, padding: "11px 13px", background: "#eaf3f6", borderRadius: 13 }}>
          <Icon path={ICON.clock} size={20} color="#0c6685" strokeWidth={2} />
          <div>
            <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>Melhor horário para pesca</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>{sd.best}</div>
          </div>
        </div>
      </div>

      <div className="eyebrow">Previsão por período</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {periods.map((p) => (
          <div key={p.period} className="card-sm" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Icon path={p.path} size={20} color="#0c6685" />
            <div style={{ width: 64 }}>
              <div style={{ fontSize: 15.5, fontWeight: 800, color: "var(--ink)" }}>{p.period}</div>
              <div style={{ fontSize: 12, color: "var(--faint)" }}>{p.time}</div>
            </div>
            <div style={{ flex: 1, display: "flex", justifyContent: "space-around" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--faint)" }}>Temp.</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>{p.temp}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--faint)" }}>Vento</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>{p.wind}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--faint)" }}>Chuva</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>{p.rain}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-dashed" style={{ marginTop: 18 }}>
        <Icon path={ICON.plus} size={18} />
        Criar lembrete para este dia
      </button>
    </div>
  );
}
