import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import QuizDesigner from "./QuizDesigner";

import { createQuiz, updateQuiz } from "../../actions";

export default function QuizEdit(props) {
    const { id } = useParams();
    const quizId = parseInt(id);

    const quiz = useSelector(({ quizzes, newQuiz }) =>
        quizId ? quizzes[id] : newQuiz
    );
    const questions = useSelector(({ questions }) => Object.values(questions));
    const dispatch = useDispatch();

    const submitAction = quizId ? updateQuiz : createQuiz;
    const onQuizSubmit = (quizData) => dispatch(submitAction(quizData));

    const caption = quizId ? `Edit Quiz #${quizId}` : "Create a New Quiz";

    return (
        <div>
            {caption}
            <div>
                <QuizDesigner
                    quiz={quiz}
                    questions={questions}
                    onQuizSubmit={onQuizSubmit}
                />
            </div>
        </div>
    );
}
