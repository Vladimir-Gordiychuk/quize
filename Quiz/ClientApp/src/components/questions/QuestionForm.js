import React, { useState } from "react";
import { Form, Field } from "react-final-form";

export default function QuestionForm({ initialValues, onSubmit }) {
    const [text, setText] = useState(initialValues.text || "");
    const [options, setOptions] = useState(initialValues.options || []);

    const validate = (question) => {
        const errors = {};
        if (!question.text) {
            errors.text = "Question cannot be empty.";
        }
        if (!question.options || question.options.length < 2) {
            //errors.options = "At least one option must be specified.";
        } else {
            errors.options = question.options.map((option) =>
                option.text ? {} : { text: "Option cannot be empty." }
            );
        }
        return errors;
    };

    const renderField = ({ input, meta, label }) => (
        <div className="field">
            <label>{label}</label>
            <input
                {...input}
                type="text"
                placeholder="Type your question here."
            />
            {meta.error && meta.touched && (
                <div className="ui error message">
                    <div className="header">{meta.error}</div>
                </div>
            )}
        </div>
    );

    const renderOption = (index) => (
        <div className="field" key={index}>
            <label>Option #{index + 1}</label>
            <div className="fields">
                <div className="two wide field" style={{ marginTop: "10px" }}>
                    <div className="ui checkbox">
                        <Field
                            name={`options[${index}].correct`}
                            type="checkbox"
                        >
                            {({ input }) => (
                                <input type="checkbox" {...input} />
                            )}
                        </Field>
                        <label>Is True</label>
                    </div>
                </div>
                <div className="eight wide field">
                    <Field name={`options[${index}].text`} type="text">
                        {({ input, meta }) => (
                            <React.Fragment>
                                <input type="text" {...input} />
                                {meta.error && meta.touched && (
                                    <div className="ui error message">
                                        <div className="header">
                                            {meta.error}
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        )}
                    </Field>
                </div>
            </div>
        </div>
    );

    const items = options.map((option, index) => renderOption(index));

    const addOption = (formValues) => {
        setText(formValues.text);
        setOptions([
            ...formValues.options,
            {
                text: "",
                correct: false,
            },
        ]);
    };

    const renderBody = ({
        handleSubmit,
        form,
        submitting,
        pristine,
        error,
        meta,
        submitFailed,
        values,
    }) => {
        return (
            <form
                className={"ui form " + (submitFailed ? "error" : "")}
                onSubmit={handleSubmit}
            >
                <Field name="text" label="Question content">
                    {renderField}
                </Field>
                {items}
                <div className="ui button" onClick={() => addOption(values)}>
                    Add Options
                </div>
                <button type="submit" className="ui button">
                    Submit
                </button>
            </form>
        );
    };

    return (
        <Form
            subscription={{ submitFailed: true, values: true }}
            onSubmit={onSubmit}
            validate={validate}
            render={renderBody}
            initialValues={{ text, options }}
        />
    );
}
