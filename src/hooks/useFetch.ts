import { useEffect, useRef, useState } from "react";
import { TripListModel } from './../components/TripList';

type DataType = TripListModel[] | null;
type IsPendingType = boolean;
type ErrorType = string | null;
type useFetchModel = [DataType, IsPendingType, ErrorType];

export const useFetch = (url: string): useFetchModel => {
    const [data, setData] = useState<DataType>(null);
    const [isPending, setIsPending] = useState<IsPendingType>(false);
    const [error, setError] = useState<ErrorType>(null)

    useEffect(() => {  
        const controller = new AbortController();
        
        const fetchData = async () =>  {
            setIsPending(true)
            
            try {
                const res = await fetch(url, {
                    signal: controller.signal
                });
                if(!res.ok)
                    throw new Error(res.statusText);

                const json = await res.json();
                setIsPending(false)
                setData(json);                
                setError(null);
            } catch (err) {
                if(err instanceof Error) {
                    if(err.name === 'AbortError') {
                        console.log('the fetch was aborted')
                    } else {
                        setIsPending(true)
                        setError('Could not fetch the data');
                        console.log(err.message);                        
                    }                 
                }
            }
            
        }
        fetchData();

        return () => {
            controller.abort();
        }
    }, [url])    

    return [data, isPending, error]
}