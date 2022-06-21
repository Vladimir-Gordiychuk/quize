import Modal from "../Modal";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import history from "../../history";

import { fetchQuestion, deleteQuestion } from "../../actions";

function QuestionDelete() {
    const { id } = useParams();
    const question = useSelector(({ questions }) => questions[id]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!question && id) {
            dispatch(fetchQuestion(id));
        }
    }, []);

    const onDismiss = () => {
        history.back();
    };

    const onConfirm = () => {
        dispatch(deleteQuestion(id));
    };

    const renderQuestion = () => {
        return (
            <Modal onDismiss={onDismiss}>
                <i className="close icon" onClick={onDismiss}></i>
                <div className="header">Delete Question #{question.id}</div>
                <div className="image content">
                    <div className="description">
                        <div className="ui header">{question.text}</div>
                        <p>Delete this question?</p>
                    </div>
                </div>
                <div className="actions">
                    <div className="ui negative button" onClick={onConfirm}>
                        Yes
                    </div>
                    <div className="ui black deny button" onClick={onDismiss}>
                        No
                    </div>
                </div>
            </Modal>
        );
    };

    const renderError = () => {
        return (
            <Modal onDismiss={onDismiss}>
                <i className="close icon"></i>
                <div className="header">Delete Question #{id}</div>
                <div className="image content">
                    <div className="description">
                        <div className="ui header">
                            Specified question not found.
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <div className="ui button">Ok</div>
                </div>
            </Modal>
        );
    };

    if (question) {
        return renderQuestion(question);
    }

    return renderError();
}

export default QuestionDelete;
