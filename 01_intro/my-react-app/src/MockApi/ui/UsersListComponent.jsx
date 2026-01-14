import {useEffect, useState} from "react";
import {useRenderLogger} from "../../hooks/useRenderLogger.js";
import {MOCK_API_USERS_URL} from "../config.js";

export default function UsersListComponent() {

    useRenderLogger('UsersListComponent')
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(MOCK_API_USERS_URL)
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            }
            )
    },[])


    if (isLoading) {return <>Loading...</>;}
    if (error) {return <>Error: {error.message}</>;}

    return(
        <>
            <h1>Users List</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.name}</li>
                ))}
            </ul>
        </>
    )
}