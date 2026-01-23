import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import fetchUserUpdate from "../api/fetchUserUpdate.js";
import logger from "../../../utils/logger.js";
import {UserFormComponent} from "./UserFormComponent.jsx";
import fetchUserById from "../api/fetchUserById.js";


export default function UserUpdateComponent({userId}) {



    const [user, setUser] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        try {
             fetchUserById(userId)
                .then( userData => {
                    logger.log(userData);
                    setUser(userData);
                })
        } catch (err) {
            logger.error('Ошибка загрузки пользователя:', err);
            setError(err.message || 'Не удалось загрузить пользователя');
        }
        finally {
            setIsLoading(false);
        }

    }, []);


    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const handleUpdateUser = async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            // Здесь должен быть вызов API для обновления пользователя
            await fetchUserUpdate(userId, formData);

            // После успешного обновления перенаправляем на страницу деталей пользователя
            navigate(`/users/${userId}`);

        } catch (err) {
            logger.error('Ошибка обновления:', err);
            setError(err.message || 'Не удалось обновить пользователя');
        } finally {
            setIsLoading(false);
        }
    };


    return(
        <div>
            <h2>User Update Component</h2>
            {error && <p style={{color: 'red'}}>Error: {error}</p>}
            <UserFormComponent
                initialData ={user}
                onSubmit={handleUpdateUser}
                isLoading={isLoading}
            />
        </div>
    )
}