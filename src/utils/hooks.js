import React from "react";

export function useDebounce/* :String */(value = "" /* :String */, delay = 100 /* :Number */) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const TimeId = setTimeout(() => {
            setDebouncedValue(value);
        });
        return () => clearTimeout(TimeId);
    }, [value, delay]);

    return debouncedValue;
}