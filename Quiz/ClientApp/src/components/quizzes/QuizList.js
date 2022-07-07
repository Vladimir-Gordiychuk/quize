import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import routes from "../../routes";
import { fetchQuizzes } from "../../actions";

class QuizList extends React.Component {
    componentDidMount() {
        if (!this.props.quizzes || !this.props.quizzes.length) {
            this.props.fetchQuizzes();
        }
    }

    renderItem(quiz) {
        return (
            <li key={quiz.id}>
                <div>Quiz #{quiz.id}</div>
                <Link to={routes.getQuizEditRoute(quiz.id)}>{quiz.title}</Link>
            </li>
        );
    }

    render() {
        if (!this.props.quizzes || !this.props.quizzes.length) {
            return <div>Quiz list is empty!</div>;
        }

        const items = this.props.quizzes.map((item) => this.renderItem(item));

        return <ul>{items}</ul>;
    }
}

const mapStateToProps = ({ quizzes }) => ({ quizzes: Object.values(quizzes) });

export default connect(mapStateToProps, {
    fetchQuizzes,
})(QuizList);
