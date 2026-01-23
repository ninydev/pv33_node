import {useTheme} from "./useThemeContext.jsx"; // Не забудь подключить CSS из шага 1

// Компонент: Панель настроек
const AccessibilityPanel = () => {
    const {
        theme, setTheme,
        fontScale, setFontScale,
        borderRadius, setBorderRadius
    } = useTheme();

    return (
        <div className="card" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
            <h3>🛠 Настройки доступности (a11y)</h3>

            {/* 1. Переключение темы */}
            <div style={{ marginBottom: '15px' }}>
                <p>Тема: <strong>{theme === 'light' ? 'Светлая' : 'Темная'}</strong></p>
                <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                    Переключить тему
                </button>
            </div>

            {/* 2. Размер шрифта */}
            <div style={{ marginBottom: '15px' }}>
                <p>Размер шрифта: {(fontScale * 100).toFixed(0)}%</p>
                <button onClick={() => setFontScale(s => Math.max(0.8, s - 0.1))}>A-</button>
                <span style={{ margin: '0 10px' }}>|</span>
                <button onClick={() => setFontScale(s => Math.min(2, s + 0.1))}>A+</button>
            </div>

            {/* 3. Скругление углов */}
            <div>
                <p>Скругление кнопок: {borderRadius}px</p>
                <input
                    type="range"
                    min="0"
                    max="30"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(Number(e.target.value))}
                />
            </div>
        </div>
    );
};

export default AccessibilityPanel;
