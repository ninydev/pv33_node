import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {DEFAULT_VALUES} from "../config.js";


export const UserFormComponent = ({ initialData, onSubmit, isLoading }) => {
    // Инициализируем стейт: если есть initialData (редактирование) — берем её, иначе дефолт
    const [formData, setFormData] = useState(initialData || DEFAULT_VALUES);

    useEffect(() => {
        setFormData(initialData)
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if(!formData) {
        return <p>Loading form data...</p>;
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#fff'
            }}
        >
            {/* Секция 1: Аватар и Основное */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>

                {/* Превью аватара */}
                <div style={{ flexShrink: 0, textAlign: 'center' }}>
                    <img
                        src={formData.avatar || 'https://via.placeholder.com/150'}
                        alt="Avatar Preview"
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: `4px solid ${formData.color}` // Фишка: рамка цвета пользователя
                        }}
                    />
                </div>

                {/* Поля */}
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label>
                        Имя:
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>

                    <label>
                        Ссылка на аватар (URL):
                        <input
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            placeholder="https://..."
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                </div>
            </div>

            {/* Секция 2: Контакты (Grid Layout) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </label>

                <label>
                    Телефон:
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </label>

                <label>
                    Страна:
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </label>

                <label>
                    Любимый цвет:
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                        <input
                            type="color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            style={{ height: '40px', width: '60px', padding: '0', border: 'none' }}
                        />
                        <span style={{ color: '#666' }}>{formData.color}</span>
                    </div>
                </label>
            </div>

            {/* Метаданные (Только для редактирования) */}
            {initialData && (
                <div style={{ fontSize: '12px', color: '#999', marginBottom: '20px', textAlign: 'right' }}>
                    ID: {formData.id} <br/>
                    Создан: {new Date(formData.createdAt).toLocaleString()}
                </div>
            )}

            {/* Кнопки действий */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <Link to="/users">
                    <button type="button" style={{ padding: '10px 20px', background: '#ccc', border: 'none', cursor: 'pointer' }}>
                        Отмена
                    </button>
                </Link>

                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                        padding: '10px 20px',
                        background: isLoading ? '#888' : '#007bff',
                        color: 'white',
                        border: 'none',
                        cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isLoading ? 'Сохранение...' : 'Сохранить'}
                </button>
            </div>
        </form>
    );
};