// src/features/users/pages/UserCreateComponent.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserFormComponent } from './UserFormComponent'; // Или где лежит ваша форма
import { fetchUserCreate } from '../api/fetchUserCreate'; // Или где лежит ваш запрос

export default function UserCreateComponent() {
    // 1. Настройка навигации
    // useNavigate - это хук React Router для программного перенаправления.
    // Мы используем его, чтобы после успешного создания "кинуть" юзера обратно в список.
    const navigate = useNavigate();

    // 2. Локальное состояние запроса
    // Нам нужно знать, идет ли сейчас отправка, чтобы заблокировать кнопку (isLoading)
    // и есть ли ошибка, чтобы показать её (error).
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // 3. Обработчик бизнес-логики (Handler)
    // Эта функция связывает Форму (View) и API (Model).
    // Она принимает "чистые" данные из формы.
    const handleCreateUser = async (formData) => {
        setIsLoading(true);
        setError(null); // Сбрасываем старые ошибки перед новой попыткой

        try {
            // А. Вызываем API функцию
            // Обратите внимание: мы не обрабатываем тут HTTP заголовки, это делает fetchUserCreate
            await fetchUserCreate(formData);

            // Б. Успех -> Редирект
            // Если await прошел без ошибок, переходим на страницу списка
            navigate('/users');

        } catch (err) {
            // В. Ошибка
            // Если API выбросил исключение (throw new Error), ловим его здесь
            console.error('Ошибка создания:', err);
            setError(err.message || 'Не удалось создать пользователя');
        } finally {
            // Г. Завершение (в любом случае)
            // Разблокируем интерфейс
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Создание нового пользователя</h1>

            {/* Блок вывода ошибки (если она есть) */}
            {error && (
                <div style={{
                    color: 'red',
                    background: '#ffe6e6',
                    padding: '10px',
                    marginBottom: '15px',
                    borderRadius: '4px'
                }}>
                    Ошибка: {error}
                </div>
            )}

            {/* Рендер "Глупого" компонента (View).
               Мы передаем ему только коллбеки и флаги состояния.

               Важно: Мы НЕ передаем initialData, так как это создание нового,
               и форма сама подставит DEFAULT_VALUES из своего кода.
            */}
            <UserFormComponent
                onSubmit={handleCreateUser}
                isLoading={isLoading}
            />
        </div>
    );
}