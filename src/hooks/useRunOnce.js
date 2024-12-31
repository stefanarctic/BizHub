import { useEffect, useState } from "react";

const useRunOnce = callback => {
    const [hasRun, setHasRun] = useState(false);

    useEffect(() => {
        if (!hasRun) {
            callback();
            setHasRun(true);
        }
    }, [callback, hasRun]);
}

export default useRunOnce;