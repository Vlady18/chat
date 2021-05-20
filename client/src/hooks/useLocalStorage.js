import {useEffect, useState} from "react";
const PREFIX = 'MY-CHAT'
const useLocalStorage = (key, initialValue) => {
    const prefixKey = PREFIX + key
    const [value, setValue] = useState(()=>{
        const data = localStorage.getItem(prefixKey);
        if(data != null) return JSON.parse(data)
        if(typeof initialValue === "function") {
            return initialValue()
        } else{
            return initialValue
        }
    })
    useEffect(()=>{
        localStorage.setItem(prefixKey, JSON.stringify(value))
    }, [value, prefixKey])
    return [value, setValue]
}

export default useLocalStorage