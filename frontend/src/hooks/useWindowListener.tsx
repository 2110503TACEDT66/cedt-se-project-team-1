import { useEffect } from "react"

export default function useWindowListener(eventType: string, listener: EventListener) {
    
    useEffect(() => {
        window.addEventListener(eventType, listener);
        return () => {
            window.removeEventListener(eventType, listener);
        }
    }, [])
}