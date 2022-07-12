import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import QuizDesigner from "./QuizDesigner";

import { createQuiz } from "../../actions";

export default function QuizEdit(props) {
    const { id } = useParams();
    const quizId = parseInt(id);

    const quiz = useSelector(({ quizzes, newQuiz }) =>
        quizId ? quizzes[id] : newQuiz
    );
    const questions = useSelector(({ questions }) => Object.values(questions));
    const dispatch = useDispatch();

    const updateQuiz = (quiz) => {
        throw new Error("Not implemented yet!");
    };

    const submitAction = quizId
        ? (quiz) => dispatch(updateQuiz(quiz))
        : (quiz) => dispatch(createQuiz(quiz));
    const caption = quizId ? `Edit Quiz #${quizId}` : "Create a New Quiz";

    return (
        <div>
            {caption}
            <div>
                <QuizDesigner
                    quiz={quiz}
                    questions={questions}
                    onQuizSubmit={submitAction}
                />
            </div>
        </div>
    );
}
