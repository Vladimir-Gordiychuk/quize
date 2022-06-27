import { useEffect, useState } from "react";

function getTimeLeft(future) {
    let difference = future - new Date();

    if (difference > 0) {
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    } else {
        return null;
    }
}

export default function Timer(props) {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(props.expire));

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(getTimeLeft(props.expire));
        }, 1000);
    });

    if (timeLeft) {
        return (
            <div>
                {timeLeft.minutes}:{timeLeft.seconds}
            </div>
        );
    } else {
        return <div>Time out!</div>;
    }
}
