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
            }
            )
    },[page, limit])

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


    if (isLoading) {return <>Loading...</>;}
    if (error) {return <>Error: {error.message}</>;}

    return(
        <>
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
                {users.map((user, index) => (
                    <li key={user.id}>{user.name} | <a href="#" onClick={() => deleteUser(user.id)}>Delete</a></li>
                ))}
            </ul>
        </>
    )
}