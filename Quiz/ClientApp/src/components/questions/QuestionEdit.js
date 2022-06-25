import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import QuestionForm from "./QuestionForm";
import { fetchQuestion, updateQuestion } from "../../actions";

function QuestionEdit() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const question = useSelector(({ questions }) => questions[id]);

    useEffect(() => {
        if (!question && id) {
            dispatch(fetchQuestion(id));
        }
    }, []);

    if (!question) {
        return <div>Loading...</div>;
    }

    console.log(question);

    const onSubmit = (values) => {
        values.id = id;
        dispatch(updateQuestion(values));
    };

    return <QuestionForm initialValues={question} onSubmit={onSubmit} />;
}

export default QuestionEdit;
