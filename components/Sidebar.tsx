import React from 'react';
import { useI18n } from './I18n';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Sidebar({ onPick }: { onPick: (c: string) => void }) {
  const { t } = useI18n();
  return (
    <aside className="sidebar card" style={{
      background: '#181f2c',
      borderRight: '1.5px solid #232b39',
      padding: '22px 12px',
      width: 210,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <div className="sidebar-logo" style={{ marginBottom: 18 }}>
        <img
          src="/logo.png"
          alt="AlphaBetta Logo"
          style={{ width: "100%", maxWidth: "180px", margin: "0 auto", display: "block" }}
        />
      </div>
      <p style={{ color: '#9aa4b2', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{t('pick')}</p>
      <div className="letters" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 7,
        marginBottom: 22
      }}>
        {letters.map(l =>
          <button
            key={l}
            className="select"
            style={{
              fontWeight: 800,
              fontSize: 20,
              color: '#fff',
              background: '#202a3e',
              borderRadius: 6,
              padding: '7px 0',
              border: 'none',
              cursor: 'pointer',
              transition: 'background .13s'
            }}
            onClick={() => onPick(l)}
          >{l}</button>
        )}
      </div>
      <div className="footer" style={{
        color: '#58627a',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 'auto'
      }}>A–Z dummy models in <b>/public</b></div>
    </aside>
  );
}
