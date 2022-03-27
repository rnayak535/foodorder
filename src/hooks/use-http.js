import { useState, useCallback } from "react";

const useHttp = () => {

    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendHttpRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        
        try{
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                header: requestConfig.header ? requestConfig.header : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            });
           
            if(!response.ok){
                throw new Error('Request Failed');
            }
            const data = await response.json();
            applyData(data);
        } catch(err){
            setError(err.message || 'Something Went Wrong!')
        }
        setIsLoading(false);
    }, []);

    return {
        isloading,
        error,
        sendHttpRequest,
    };
};

export default useHttp;