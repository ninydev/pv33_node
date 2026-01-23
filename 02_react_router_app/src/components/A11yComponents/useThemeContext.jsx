import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Создаем сам Контекст
const ThemeContext = createContext();

// 2. Создаем Провайдер (Обертку)
export const ThemeProvider = ({ children }) => {
    // Состояние настроек
    const [theme, setTheme] = useState('light');
    const [fontScale, setFontScale] = useState(1); // 1 = 100%, 1.5 = 150%
    const [borderRadius, setBorderRadius] = useState(8);

    // Магия: при изменении стейта обновляем CSS-переменные на теге <html>
    useEffect(() => {
        const root = document.documentElement;

        // Логика тем
        if (theme === 'dark') {
            root.style.setProperty('--bg-color', '#222222');
            root.style.setProperty('--text-color', '#eeeeee');
        } else {
            root.style.setProperty('--bg-color', '#ffffff');
            root.style.setProperty('--text-color', '#1a1a1a');
        }

        // Логика размеров и скруглений
        root.style.setProperty('--font-scale', fontScale);
        root.style.setProperty('--border-radius', `${borderRadius}px`);

    }, [theme, fontScale, borderRadius]); // Запускать эффект, когда меняются эти переменные

    // Собираем всё, что хотим "раздать" детям
    const value = {
        theme, setTheme,
        fontScale, setFontScale,
        borderRadius, setBorderRadius
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// 3. Создаем кастомный хук для удобства (best practice)
export const useTheme = () => {
    return useContext(ThemeContext);
};