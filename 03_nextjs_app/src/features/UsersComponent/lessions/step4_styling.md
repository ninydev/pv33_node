### Крок 4: Стилізація — від інлайнових стилів до Tailwind CSS

У цьому кроці ми розберемося, куди "зникли" стилі та чому таблиця виглядає інакше.

#### 1. Як було в React (Inline Styles)
В оригінальному компоненті `UsersListComponent.jsx` стилі були прописані безпосередньо в JSX через атрибут `style`:

```jsx
<table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
<footer style={{ marginTop: '20px', background: '#f5f5f5' }}>
```

Це простий підхід, але він має недоліки:
- Код стає громіздким.
- Немає підтримки медіа-запитів (`@media`).
- Важко перевикористовувати стилі.

#### 2. Як тепер у Next.js (Tailwind CSS)
У проекті Next.js ми використовуємо **Tailwind CSS** — utility-first CSS фреймворк. Замість написання об'єктів стилів, ми використовуємо готові класи прямо в `className`.

Приклад з нашого `UsersList.tsx`:
```tsx
<table className="min-w-full border-collapse border border-gray-200">
```

- `min-w-full` — аналог `width: 100%`.
- `border-collapse` — аналог `border-collapse: collapse`.
- `border-gray-200` — задає колір рамки.

#### 3. Чому таблиця біла?
У файлі `03_nextjs_app/src/app/users/page/[page]/page.tsx` ми обгорнули список у контейнер з білим фоном:
```tsx
<div className="bg-white shadow-md rounded-lg p-6">
    <UsersList users={users} />
</div>
```
- `bg-white` — задає білий фон.
- `shadow-md` — додає тінь.
- `rounded-lg` — заокруглює кути.

#### Порівняння підходів

| Характеристика | React (Inline Styles) | Next.js (Tailwind CSS) |
| :--- | :--- | :--- |
| **Місце опису** | Прямо в JS об'єкті `style={...}` | В атрибуті `className="..."` |
| **Синтаксис** | CamelCase (`backgroundColor`) | Utility класи (`bg-gray-100`) |
| **Продуктивність** | Створює нові об'єкти при рендері | Використовує готовий мінімізований CSS |
| **Адаптивність** | Важко реалізувати | Дуже просто (`md:flex`, `lg:block`) |

#### Де шукати глобальні налаштування?
Всі базові стилі (шрифти, колір фону всього додатку) знаходяться в `03_nextjs_app/src/app/globals.css`. Там же підключається Tailwind через `@import "tailwindcss";`.

---
**Наступний крок:** Робота з формами та Server Actions.
