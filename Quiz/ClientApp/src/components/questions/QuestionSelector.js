import { Link } from "react-router-dom";
import * as Icons from "react-bootstrap-icons";

/**
 *
 * @param {{
 * questions: [{ id: number, text: string }]
 * selection : [number],
 * onSelect: function}} props
 * @returns JSX
 */
export default function QuestionSelector(props) {
    /**
     * Render question.
     * @param {{id: number, text: string}} question
     * @returns JSX for each question.
     */
    const renderQuestion = (question) => {
        const isSelected = props.selection.find((id) => id === question.id)
            ? true
            : false;
        const selectedClass = isSelected ? "active" : "";
        const icon = isSelected ? <Icons.CheckSquare /> : <Icons.Square />;
        return (
            <div
                key={question.id}
                className="row"
                onClick={() => props.onSelect(question.id)}
            >
                <div className="col-auto">{icon}</div>
                <div className="col">
                    <Link
                        key={question.id}
                        className={`list-group-item list-group-item-action ${selectedClass}`}
                        to={`/questions/${question.id}`}
                    >
                        {question.text}
                    </Link>
                </div>
            </div>
        );
    };

    const renderedQuestions = props.questions.map((question) =>
        renderQuestion(question)
    );

    return <div className="list-group">{renderedQuestions}</div>;
}
