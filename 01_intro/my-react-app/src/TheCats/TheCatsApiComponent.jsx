import logger from "../utils/logger.js";
import {useRenderLogger} from "../hooks/useRenderLogger.js";
import {useEffect, useState} from "react";

const THE_CATS_API_URL = 'https://api.thecatapi.com/v1/images/search';


export default function TheCatsApiComponent() {
    useRenderLogger('TheCatsApiComponent');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const [cats, setCats] = useState([]);

    useEffect(() => {

        fetch(THE_CATS_API_URL + '?limit=10')
            .then(response => {
                try {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                } catch (error) {
                    logger.error('Error parsing response:', error);
                    throw error;
                }
            })
            .then(data => {
                logger.log(data);
                setCats(prevCats => [...prevCats, ...data]);
                setIsLoading(true);
                // setCats([...cats, ...data]);
            })
            .catch(error => {
                logger.error('Error fetching cat data:', error);
                setIsLoading(true);
                setError(error);
            });

    //     const fetchCats = () => {
    //     fetch(THE_CATS_API_URL + '?limit=10')
    //         .then(response => response.json())
    //         .then(data => {
    //             logger.log(data);
    //             setCats(prevCats => [...prevCats, ...data]);
    //             // setCats([...cats, ...data]);
    //         })
    //         .catch(error => {
    //             logger.error('Error fetching cat data:', error);
    //         });
    // }
    //     fetchCats();
    }, []);


    // const rs = await fetch(THE_CATS_API_URL + '?limit=10');
    // const data = await rs.json();
    // cats.push(...data);

    // fetchCats();

    if (!isLoading) {
        return <>Loading...</>;
    }

    if (error) {
        return <>Error: {error.message}</>;
    }

    return(
        <>
           <h1> The Cats </h1>
            <ul>
                {cats.map((cat, index) => (
                    <li key={index}>
                        <img src={cat.url} alt="Cat" width="200" />
                    </li>
                ))}
            </ul>
        </>
    )
}