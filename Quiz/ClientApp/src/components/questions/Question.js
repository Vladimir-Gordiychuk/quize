import "./Question.css";

import { useState, useEffect } from "react";
import { getQuestion } from "../../apis/quize";
import { useParams } from "react-router-dom";

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

function Question() {
    const [question, setQuestion] = useState(null);
    const params = useParams();

    useEffect(() => {
        getQuestion(params.id).then((question) => setQuestion(question));
    }, []);

    if (!question) return <div>Loading...</div>;

    const options = mixMap(question.options.length).map((id) => ({
        ...question.options[id],
        id,
    }));

    const items = options.map((option) => (
        <div className="item" key={option.id}>
            <div className="ui left floated compact middle aligned">
                <div className="ui read-only fitted checkbox">
                    <input type="checkbox" checked={option.correct} readOnly />
                    <label></label>
                </div>
            </div>
            <div className="content">
                <div className="description">{option.text}</div>
            </div>
        </div>
    ));

    document.createElement("div");

    return (
        <form>
            <h2 className="question-header">{question.text}</h2>
            <div className="ui horizontal divider">
                Select correct statements
            </div>
            <div className="ui relaxed list">{items}</div>
        </form>
    );
}

export default Question;
