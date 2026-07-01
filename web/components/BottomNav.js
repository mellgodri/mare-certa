"use client";

import { Icon, ICON } from "@/lib/icons";

const NAV_DEFS = [
  { key: "home", label: "Início", icon: ICON.home, screen: "home" },
  { key: "cond", label: "Condições", icon: ICON.cond, screen: "conditions" },
  { key: "fish", label: "Espécies", icon: ICON.fish, screen: "species" },
  { key: "cal", label: "Calendário", icon: ICON.cal, screen: "calendar" },
  { key: "more", label: "Mais", icon: ICON.more, screen: "more" },
];

export default function BottomNav({ activeTab, onGoTab }) {
  return (
    <div className="bottom-nav">
      <div className="bottom-nav-inner">
        {NAV_DEFS.map((n) => {
          const active = activeTab === n.key;
          const color = active ? "#0c6685" : "#90a6af";
          return (
            <button key={n.key} className="nav-item" onClick={() => onGoTab(n.screen)}>
              <Icon path={n.icon} size={22} color={color} strokeWidth={2} />
              <span style={{ color }}>{n.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
