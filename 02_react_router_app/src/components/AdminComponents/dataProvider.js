// import jsonServerProvider from 'ra-data-json-server';
//
// export const dataProvider =  jsonServerProvider('https://68e9272ef2707e6128cdd00e.mockapi.io');
// // https://68e9272ef2707e6128cdd00e.mockapi.io/users

import jsonServerProvider from 'ra-data-json-server';
import { fetchUtils } from 'react-admin';

const apiUrl = 'https://68e9272ef2707e6128cdd00e.mockapi.io';
const baseProvider = jsonServerProvider(apiUrl);

const dataProvider = {
    // 1. Копируем все стандартные методы (getOne, update, delete...)
    ...baseProvider,

    // 2. Перезаписываем ТОЛЬКО получение списка
    getList: (resource, params) => {
        // Игнорируем params (где лежат sort, pagination, filter)
        // И делаем просто чистый запрос: GET /users
        const url = `${apiUrl}/${resource}`;

        return fetchUtils.fetchJson(url).then(({ json }) => {
            // React-admin требует вернуть объект { data: [], total: 10 }
            return {
                data: json,
                // Так как пагинации нет, total — это просто длина всего массива
                total: json.length,
            };
        });
    },
};

export default dataProvider;