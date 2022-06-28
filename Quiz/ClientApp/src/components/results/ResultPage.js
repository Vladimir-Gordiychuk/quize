import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchResult } from "../../actions";

export default function ResultPage() {
    const { id } = useParams();

    const result = useSelector(({ results }) => results[id]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!result) {
            dispatch(fetchResult(id));
        }
    }, []);

    if (!result) {
        return <div>Loading..</div>;
    }

    if (result.status !== "Submitted") {
        return (
            <div>
                <h4>It seems your answers haven't been submitted.</h4>
                <h4>Status: {result.status}</h4>
            </div>
        );
    }

    return (
        <div>
            <h3>Congrads on your challenge #{result.id}!</h3>
            <h4>
                Your score: {result.correctAnswers} / {result.totalQuestions}
            </h4>
        </div>
    );
}
