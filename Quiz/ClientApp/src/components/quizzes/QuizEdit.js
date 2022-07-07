import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import QuizDesigner from "./QuizDesigner";

export default function QuizEdit(props) {
    const { id } = useParams();
    const quiz = useSelector(({ quizzes }) => quizzes[id]);
    const questions = useSelector(({ questions }) => Object.values(questions));

    return (
        <div>
            Edit Quiz #{id}
            <div>
                <QuizDesigner quiz={quiz} questions={questions} />
            </div>
        </div>
    );
}
