import "./QuestionView.css";

import { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { patchAnswers } from "../../actions";

function rand(count) {
    return Math.floor(Math.random() * count);
}

function mixMap(count) {
    const array = Array.from(Array(count).keys());
    for (let i = 0; i < count * 2; ++i) {
        const i = rand(count);
        const j = rand(count);
        const t = array[i];
        array[i] = array[j];
        array[j] = t;
    }
    return array;
}

function QuestionView({ question, answers, patchAnswers }) {
    const [map, setMap] = useState(mixMap(question.options.length));
    const [options, setOptions] = useState(
        map.map((index) => question.options[index])
    );

    useEffect(() => {
        const newMap = mixMap(question.options.length);
        setMap(newMap);
        setOptions(newMap.map((index) => question.options[index]));
    }, [question]);

    if (!question) return null;

    const onFlagChange = (id) => {
        const patch = {
            [id]: answers[id] ? false : true,
        };
        console.log(patch);
        patchAnswers(patch);
    };

    const items = options.map((option) => (
        <div className="item" key={option.id}>
            <div className="ui left floated compact middle aligned">
                <div className="ui read-only fitted checkbox">
                    <input
                        type="checkbox"
                        checked={answers[option.id] === true}
                        onChange={() => onFlagChange(option.id)}
                    />
                    <label></label>
                </div>
            </div>
            <div className="content">
                <div className="description">{option.text}</div>
            </div>
        </div>
    ));

    return (
        <div>
            <h2 className="question-header">{question.text}</h2>
            <div className="ui horizontal divider">
                Select correct statements
            </div>
            <div className="ui relaxed list">{items}</div>
        </div>
    );
}

const mapStateToProps = ({ answers }) => ({ answers });

export default connect(mapStateToProps, {
    patchAnswers,
})(QuestionView);
