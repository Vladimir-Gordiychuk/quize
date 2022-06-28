import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchChallenge, submitAnswers } from "../../actions";

import QuizView from "./QuizView";

import history from "../../history";
import routes from "../../routes";

function navigate(id, page) {
    history.push(routes.getChallengeViewRoute(id, page));
}

export default function QuizPage() {
    const { id, page } = useParams();

    const challenge = useSelector(({ challenges }) => challenges[id]);
    const answers = useSelector(({ answers }) => answers);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!challenge) {
            // fetch specified challenge info
            dispatch(fetchChallenge(id));
        }
    }, []);

    if (!challenge) {
        return <div>Data not found (or not loaded yet).</div>;
    }

    const onSubmit = () => {
        dispatch(submitAnswers(challenge.id, answers));
    };

    return (
        <QuizView
            challenge={challenge}
            page={page}
            onPageChanged={(newPage) => navigate(id, newPage)}
            onSubmit={onSubmit}
        />
    );
}
