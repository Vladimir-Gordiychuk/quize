import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import QuizView from "./QuizView";

export default function QuizPage() {
    const { id } = useParams();

    const challenge = useSelector(({ challenges }) => challenges[id]);

    return <QuizView challenge={challenge} />;
}
