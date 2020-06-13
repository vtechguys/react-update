import React from "react";
import { useLocation } from "react-router-dom";
export function useDebounce /* :String */(
  value = "" /* :String */,
  delay = 100 /* :Number */
) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const TimeId = setTimeout(() => {
      setDebouncedValue(value);
    });
    return () => clearTimeout(TimeId);
  }, [value, delay]);

  return debouncedValue;
}
export function useQuery() {
  return Object.fromEntries( 
      Array.from(
        ( new URLSearchParams( useLocation().search) )
          .entries() 
      )
    );
}