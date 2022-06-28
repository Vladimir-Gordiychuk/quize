import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { startQuiz, fetchLastChallenge } from "../../actions";
import routes from "../../routes";

export default function QuizStart() {
    const dispatch = useDispatch();
    const activeChallenge = useSelector(({ challenges }) => challenges.active);

    useEffect(() => {
        dispatch(fetchLastChallenge());
    }, []);

    const onStartClick = () => {
        dispatch(startQuiz());
    };

    if (activeChallenge) {
        return (
            <div>
                <h2 className="text-center">You've active quiz alredy!</h2>
                <div className="row justify-content-center">
                    <div className="col-2">
                        <Link
                            to={routes.getChallengeViewRoute(
                                activeChallenge.id
                            )}
                            className="btn-lg btn-primary"
                        >
                            Continue
                        </Link>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h2 className="text-center">You've got no active quizzes.</h2>
                <div className="row justify-content-center">
                    <div className="col-2">
                        <button
                            className="btn-lg btn-primary"
                            onClick={onStartClick}
                        >
                            Start New Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
