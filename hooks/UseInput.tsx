import { useState } from "react";

const useInput = (initialValue : any = "") => {
    const [value, setvalue] = useState(initialValue);
  
    return {
      value,
      setvalue,
      onChange: (event: any) => {
        setvalue(event.target.value);
      },
    };
  };
  
  export default useInput;
  