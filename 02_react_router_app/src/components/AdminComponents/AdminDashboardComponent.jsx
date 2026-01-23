import { Admin, Resource, ListGuesser } from 'react-admin';
import dataProvider from "./dataProvider.js";

export default function AdminDashboardComponent() {
    return (<div>
        <h2>Admin Dashboard</h2>
        <p>Welcome to the admin dashboard. Here you can manage users and settings.</p>
            <Admin dataProvider={dataProvider} basename="/admin">
                {/* 2. Resource связывает URL/users с компонентом списка.
      ListGuesser - это магия: он сам сделает запрос, посмотрит поля
      и нарисует таблицу. Идеально для первого запуска!
    */}
                <Resource name="users" list={ListGuesser} />
            </Admin>
    </div>
    );
}