import { useEffect, useState } from "react";
import { TripListModel } from './../components/TripList';

export const useFetch = (url: string): [TripListModel[] | null] => {
    const [data, setData] = useState<TripListModel[] | null>(null);

    useEffect(() => {      
        const fetchData = async () =>  {
            const res = await fetch(url);
            const json = await res.json();
            setData(json);
        }
        fetchData();
    }, [url])    

    return [data]
}