import { useRef, useEffect } from 'react';

export default function Redirect({ to }) {

    this.ref = useRef();

    useEffect(() => {
        if (this.ref.current) {
            this.ref.current.click();
        }
    }, []);

    return <a href={to}></a>

}