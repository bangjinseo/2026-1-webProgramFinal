import { menuItems } from '../data/labData.js';
import fileCloseIcon from '../assets/Files-close.svg';
import gradientBackground from '../assets/gradient-1 2.svg';

export default function AppShell({ activePage, children, onSelectPage }) {
  const currentItem = menuItems.find((item) => item.id === activePage) ?? menuItems[0];

  return (
    <main className="app-shell">
      <div
        className="static-background"
        style={{ backgroundImage: `url("${gradientBackground}")` }}
        aria-hidden="true"
      />
      <section className="lab-window" aria-label="Localization Lab">
        <header className="top-bar">
          <div className="traffic-lights" aria-hidden="true">
            <span className="traffic-close" />
            <span className="traffic-minimize" />
            <span className="traffic-zoom" />
          </div>
          <p>{currentItem.path}</p>
        </header>
        <div className="window-body">
          <aside className="sidebar" aria-label="Lab navigation">
            <div className="sidebar-title">Localization Lab</div>
            <nav>
              {menuItems.map((item) => (
                <button
                  className={activePage === item.id ? 'is-selected' : ''}
                  key={item.id}
                  onClick={() => onSelectPage(item.id)}
                  type="button"
                >
                  <img className="sidebar-icon" src={fileCloseIcon} alt="" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>
          <section className="content-area">{children}</section>
        </div>
      </section>
    </main>
  );
}
