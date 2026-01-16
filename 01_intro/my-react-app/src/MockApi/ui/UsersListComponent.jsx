import {useEffect, useState} from "react";
import {useRenderLogger} from "../../hooks/useRenderLogger.js";
import {MOCK_API_USERS_URL} from "../config.js";
import logger from "../../utils/logger.js";

export default function UsersListComponent() {

    useRenderLogger('UsersListComponent')
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [selectedUser, setSelectedUser] = useState(null);
    const [currentAction, setCurrentAction] = useState('all'); // 'show' | 'edit' | 'all' | null

    useEffect(() => {
        const url = new URL(MOCK_API_USERS_URL);
        url.searchParams.append('page', page);
        url.searchParams.append('limit', limit);
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Ошибка сервера');
                // Може не працювати
                const totalCount = response.headers.get('X-Total-Count');
                logger.log('Total:', totalCount);
                return response.json()
            })
            .then(data => {
                setUsers(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                logger.error('Error fetching users data:', error);
                setIsLoading(false);
            })
    }, [page, limit])

    const nextPage = () => {
        if (users.length < limit) return;
        setPage(page + 1);
    }
    const prevPage = () => {
        if (page < 2) return;
        setPage(page - 1);
    }

    const changeLimit = (e) => {
        setPage(1);
        setLimit(Number(e.target.value));
    }

    const deleteUser = (id) => {
        fetch(`${MOCK_API_USERS_URL}/${id}`, {method: 'DELETE'})
            .then(() => {
                setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                logger.log('User deleted:', id);
            })
            .catch(error => {
                logger.error('Error deleting user:', error);
            })
    }


    const handleShow = (id) => {
        setSelectedUser(users.find(user => user.id === id));
        setCurrentAction('show');
        console.log('Show user:', id);
    }

    const handleClose = () => {
        setSelectedUser(null);
        setCurrentAction('all');
    }

    const handleEdit = (id) => {
        setSelectedUser(users.find(user => user.id === id));
        setCurrentAction('edit');
        console.log('Edit user:', id);
    }

    if (isLoading) {
        return <>Loading...</>;
    }
    if (error) {
        return <>Error: {error.message}</>;
    }

    if (currentAction === 'show') return (<>
            <div>User: {selectedUser.name}</div>
            <button onClick={handleClose}>Close</button>
        </>);

    if (currentAction === 'edit') return (<>
            <div>Edit user: {selectedUser.name}</div>
            <button onClick={handleClose}>Close</button>
        </>);

    if (currentAction === 'all') return (<>
            <h1>Users List</h1>
            <div>
                <a href="#" onClick={prevPage}>Prev</a> | {page} |
                <a href="#" onClick={nextPage}>Next</a>
                <select value={limit} onChange={changeLimit}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>
            <ul>
                {users.map((user, index) => (<li key={user.id}>{user.name}
                        &#9745; ==&gt;
                        | <a href="#" onClick={() => handleShow(user.id)}> Show </a>
                        | <a href="#" onClick={() => handleEdit(user.id)}> Edit </a>
                        | <a href="#" onClick={() => deleteUser(user.id)}>Delete</a></li>))}
            </ul>
        </>)
}