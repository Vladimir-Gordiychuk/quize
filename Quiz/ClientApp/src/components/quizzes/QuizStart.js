import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";

import { startQuiz } from "../../actions";
import QuizView from "./QuizView";

export default function QuizStart() {
    const dispatch = useDispatch();
    const activeChallenge = useSelector(({ activeQuiz }) => activeQuiz);

    const onStartClick = () => {
        dispatch(startQuiz());
    };

    if (activeChallenge) {
        return (
            <div>
                <h2 className="text-center text-primary">
                    You've active quiz alredy!
                </h2>
                <Navigate
                    to={`/challenge/${activeChallenge.id}`}
                    className="btn btn-primary"
                >
                    Continue
                </Navigate>
            </div>
        );
    } else {
        return (
            <button className="btn btn-primary" onClick={onStartClick}>
                Start New Quiz
            </button>
        );
    }
}
