import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchChallenge } from "../../actions";

import QuizView from "./QuizView";

export default function QuizPage() {
    const { id } = useParams();

    const challenge = useSelector(({ challenges }) => challenges[id]);

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

    return <QuizView challenge={challenge} />;
}
