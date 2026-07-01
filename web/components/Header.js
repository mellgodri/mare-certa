"use client";

import { Icon, ICON } from "@/lib/icons";

export default function Header({ title, hasBack, onBack, sub, onSubClick }) {
  return (
    <div className="std-header">
      <div className="std-header-inner">
        {hasBack && (
          <button className="icon-btn" onClick={onBack} aria-label="Voltar">
            <Icon path={ICON.back} size={11} color="#0c4f6e" strokeWidth={2.4} />
          </button>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 className="header-title">{title}</h1>
          {sub && (
            <button className="header-loc-btn" onClick={onSubClick}>
              <Icon path={ICON.pin} size={13} color="#0c6685" strokeWidth={2.2} />
              <span>{sub}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
