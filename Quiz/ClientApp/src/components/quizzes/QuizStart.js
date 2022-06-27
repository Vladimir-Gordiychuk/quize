import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { startQuiz } from "../../actions";
import QuizView from "./QuizView";

export default function QuizStart() {
    const dispatch = useDispatch();
    const activeQuiz = useSelector(({ activeQuiz }) => activeQuiz);

    const onStartClick = () => {
        dispatch(startQuiz());
    };

    if (activeQuiz) {
        return (
            <div>
                <QuizView />
            </div>
        );
    } else {
        return <button onClick={onStartClick}>Take a Quiz</button>;
    }
}
