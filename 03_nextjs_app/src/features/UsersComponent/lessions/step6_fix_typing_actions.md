### Крок 6: Виправлення типізації в Server Actions

У цьому кроці ми розібрали та виправили помилку типізації `TS2345`, яка виникала при передачі даних з Zod-валідації до функцій API.

#### 1. Проблема: Невідповідність типів
Помилка виникала через те, що інференційований тип зі схеми Zod (`UserFormData`) мав опціональні поля, тоді як тип `UserCreateInput` очікував обов'язкові рядки. TypeScript не дозволяє передавати об'єкт, де поля можуть бути `undefined`, у функцію, яка вимагає `string`.

#### 2. Вирішення: Синхронізація схеми та типів
Ми оновили `UserSchema`, додавши значення за замовчуванням за допомогою методу `.default()`. Тепер Zod гарантує, що після успішного парсингу ми отримаємо об'єкт зі всіма необхідними полями-рядками.

Приклад оновленої схеми:
```typescript
// schemas.ts
export const UserSchema = z.object({
    name: z.string().min(2, { message: "Ім'я має бути не менше 2 символів" }),
    email: z.string().email({ message: "Некоректний формат email" }),
    phone: z.string().default(''), 
    country: z.string().default(''),
    avatar: z.string().url().or(z.string().length(0)).default(''),
    color: z.string().regex(/^#[0-9A-F]{6}$/i).default('#ffffff'),
});
```

#### 3. Типізація стану Server Action
Для кращої підтримки TypeScript та роботи з хуком `useActionState` ми додали інтерфейс `ActionState` у файл `types.ts`. Це дозволяє уникнути типу `any` та чітко описати структуру відповіді сервера (помилки валідації та загальне повідомлення).

```typescript
// types.ts
export interface ActionState {
    errors?: Record<string, string[]>;
    message?: string | null;
}
```

#### 4. Явне вказання типів в Action
Ми оновили функцію `createUserAction`, вказавши типи для `prevState` та `Promise<ActionState>`. Також ми використали `as UserCreateInput` при виклику `fetchUserCreate`, щоб підтвердити відповідність даних вимогам API.

```typescript
// actions.ts
export async function createUserAction(
    prevState: ActionState, 
    formData: FormData
): Promise<ActionState> {
    // ...
    await fetchUserCreate(validatedFields.data as UserCreateInput);
    // ...
}
```

#### Висновок
Сувора типізація Server Actions забезпечує надійність додатка, дозволяючи виявляти помилки невідповідності даних ще на етапі написання коду, а не під час виконання в браузері чи на сервері.

---
**Наступний крок:** Робота з редагуванням користувачів та обробка динамічних маршрутів.
