// creating a custom hook -> to handle all the api call with loading.
import { useState } from "react";

const useFetch = (cb, options = {}) => {
 
    const [data, setData] = useState(null); // big outage happened because of using "" here hahahaha
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await cb(options, ...args);
            setData(response);
        } catch (error) {
            setError(error);
        } finally {    //  no matter what happens to above try,catch finally will always run
            setLoading(false);
        }
    };
    return { data, loading, error, fn };
}

export default useFetch;


