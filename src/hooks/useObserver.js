import {useEffect, useRef} from "react";

export let useObserver = (ref, canLoad, isLoading, callback) => {
    let observer = useRef();
    useEffect(() => {
        if(isLoading) return;
        if(observer.current) observer.current.disconnect();
        let cb = function(entries, observer) {
          if(entries[0].isIntersecting && canLoad) {
            callback()
          }
        };
         observer.current = new IntersectionObserver(cb);
         observer.current.observe(ref.current);
     
      }, [isLoading])
}