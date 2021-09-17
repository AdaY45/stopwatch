import { useState, useRef, useCallback, useEffect } from "react";

const useDoubleClick = (callback) => {
    const [element, setElement] = useState(null);
    const countRef = useRef(0);
    const timerRef = useRef(null);
    const inputCallbackRef = useRef(null);
    const callbackRef = useCallback(node =>{
        setElement(node);
        callbackRef.current = node;
    }, []);

    useEffect(() => {
        inputCallbackRef.current = callback;
    });

    useEffect(() => {
        const handler = () => {
            const isDoubleClick = countRef.current + 1 === 2;
            const timerIsPresent = timerRef.current;
            if(timerIsPresent && isDoubleClick) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
                countRef.current = 0;
                if(inputCallbackRef.current) {
                    inputCallbackRef.current();
                }
            }
            if(!timerIsPresent) {
                countRef.current = countRef.current + 1;
                const timer = setTimeout(() => {
                    clearTimeout(timerRef.current);
                    timerRef.current = null;
                    countRef.current = 0;
                }, 300);
                timerRef.current = timer;
            }
        }
        if(element) {
            element.addEventListener("click", handler);
        }

        return () => {
            if(element) {
                element.removeEventListener("click", handler);
            }
        };
    }, [element]);
    return callbackRef;
};

export default useDoubleClick;