import { useState } from "react";
import { Form, Field } from "react-final-form";

import QuestionSelector from "../questions/QuestionSelector";

/**
 *
 * @param {{
 * quiz: {
 *  id: number,
 *  questions: [
 *      { id: number, text: string}
 *  ]
 * },
 * questions: [
 *  { id: number, text: string }
 * ],
 * onQuizSubmit : Function
 * }} props
 * @returns
 */
export default function QuizDesigner({ quiz, questions, onQuizSubmit }) {
    const [selected, setSelected] = useState(
        (quiz &&
            quiz.questions &&
            quiz.questions.map((question) => question.id)) ||
            []
    );

    if (!quiz) return null;

    const onSubmit = (formValues) => {
        onQuizSubmit({
            ...formValues,
            questionIds: selected,
            id: quiz.id || undefined,
        });
    };

    const validate = (quiz) => {
        return {};
    };

    const renderForm = ({ handleSubmit }) => {
        return (
            <form onSubmit={handleSubmit}>
                <Field name="title" type="text">
                    {({ input, meta }) => (
                        <div className="form-group">
                            <label htmlFor="quizTitle">Title</label>
                            <input
                                type="text"
                                id="quizTitle"
                                className="form-control"
                                {...input}
                                aria-describedby="quizTitleHelp"
                                placeholder="Enter title for your quiz"
                            />
                            <small
                                id="quizTitleHelp"
                                className="form-text text-muted"
                            >
                                This is title is visible to the users before
                                they start the quiz.
                            </small>
                        </div>
                    )}
                </Field>

                <Field name="timeLimit" type="number">
                    {({ input, meta }) => (
                        <div className="form-group">
                            <label htmlFor="quizTimeLimit">Time Limit</label>
                            <input
                                type="number"
                                max="3600"
                                min="10"
                                id="quizTimeLimit"
                                className="form-control"
                                {...input}
                            />
                            <small
                                id="quizTimeLimitHelp"
                                className="form-text text-muted"
                            >
                                Time limit to pass the quiz measured in seconds.
                            </small>
                        </div>
                    )}
                </Field>

                <QuestionSelector
                    questions={questions}
                    selection={selected}
                    onSelect={onSelect}
                />
                <div className="fixed-bottom">
                    <div class="d-flex justify-content-center m-2">
                        <button type="submit" className="btn-lg btn-primary">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        );
    };

    const onSelect = (id) => {
        if (selected.find((x) => x === id)) {
            setSelected(selected.filter((x) => x !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    return (
        <div>
            <Form
                subscription={{ pristine: true, values: true }}
                onSubmit={onSubmit}
                validate={validate}
                render={renderForm}
                initialValues={{
                    title: quiz.title,
                    timeLimit: quiz.timeLimit,
                }}
            />
        </div>
    );
}
