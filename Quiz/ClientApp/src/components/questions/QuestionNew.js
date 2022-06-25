import React from "react";
import { useDispatch } from "react-redux";
import { createQuestion } from "../../actions";

import QuestionForm from "./QuestionForm";

export default function QuestionNew() {
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        dispatch(createQuestion(values));
    };

    return (
        <QuestionForm
            onSubmit={onSubmit}
            initialValues={{ text: "", options: [] }}
        />
    );
}
