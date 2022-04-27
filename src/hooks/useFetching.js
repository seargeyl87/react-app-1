import {useState} from 'react';

export let useFetching = (callback) => {
    let [isLoading, setIsLoading] = useState(false);
    let [error, setError] = useState('');
    
    let fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e) {
         setError(e.massage)
        } finally {
            setIsLoading(false)
        }
    }
    
     return [fetching, isLoading, error]
     
}
