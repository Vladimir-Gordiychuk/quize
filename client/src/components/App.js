import "./App.css";

import React from "react";
import { Routes, Route } from "react-router-dom";

import Logo from "./Logo";
import NavBar from "./NavBar";
import QuestionList from "./questions/QuestionList";
import Question from "./questions/Question";
import QuestionDelete from "./questions/QuestionDelete";

export default class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <NavBar />
                <Routes>
                    <Route path="/questions" element={<QuestionList />} />
                    <Route path="/questions/:id" element={<Question />} />
                    <Route
                        path="/questions/:id/delete"
                        element={<QuestionDelete />}
                    />
                    <Route path="/" element={<Logo />} />
                </Routes>
            </div>
        );
    }
}
