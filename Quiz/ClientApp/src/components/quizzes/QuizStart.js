import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { startQuiz } from "../../actions";

export default function QuizStart() {
    const dispatch = useDispatch();
    const activeQuiz = useSelector(({ activeQuiz }) => activeQuiz);

    const onStartClick = () => {
        dispatch(startQuiz());
    };

    if (activeQuiz) {
        return <div>Your current quize: {activeQuiz.quiz.title}</div>;
    } else {
        return <button onClick={onStartClick}>Take a Quiz</button>;
    }
}
