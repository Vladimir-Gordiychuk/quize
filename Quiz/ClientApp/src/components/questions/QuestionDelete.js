import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
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
            <Modal isOpen={true} backdrop={true} toggle={onDismiss}>
                <ModalHeader>Delete Question #{question.id}</ModalHeader>
                <ModalBody>
                    <h3>{question.text}</h3>
                    <p>Delete this question?</p>
                </ModalBody>
                <ModalFooter>
                    <div className="btn btn-danger" onClick={onConfirm}>
                        Yes
                    </div>
                    <div className="btn btn-secondary" onClick={onDismiss}>
                        No
                    </div>
                </ModalFooter>
            </Modal>
        );
    };

    const renderError = () => {
        return (
            <Modal isOpen={true}>
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
                    <div className="ui button" onClick={onDismiss}>
                        Ok
                    </div>
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
