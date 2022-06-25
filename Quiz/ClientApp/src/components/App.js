import "./custom.css";

import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import {
    ApplicationPaths,
    LoginActions,
    LogoutActions,
} from "./api-authorization/ApiAuthorizationConstants";

import Logo from "./Logo";
import QuestionList from "./questions/QuestionList";
import Question from "./questions/Question";
import QuestionDelete from "./questions/QuestionDelete";
import QuestionNew from "./questions/QuestionNew";
import QuestionEdit from "./questions/QuestionEdit";

import { Login } from "./api-authorization/Login";
import { Logout } from "./api-authorization/Logout";

export default class App extends React.Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Routes>
                    <Route path="/questions" element={<QuestionList />} />
                    <Route path="/questions/new" element={<QuestionNew />} />

                    <Route path="/questions/:id" element={<Question />} />
                    <Route
                        path="/questions/:id/edit"
                        element={<QuestionEdit />}
                    />
                    <Route
                        path="/questions/:id/delete"
                        element={<QuestionDelete />}
                    />
                    <Route path="/" element={<Logo />} />
                    <Route path={ApplicationPaths.ApiAuthorizationPrefix}>
                        <Route
                            path={ApplicationPaths.Login}
                            element={loginAction(LoginActions.Login)}
                        />
                        <Route
                            path={ApplicationPaths.LoginFailed}
                            element={loginAction(LoginActions.LoginFailed)}
                        />
                        <Route
                            path={ApplicationPaths.LoginCallback}
                            element={loginAction(LoginActions.LoginCallback)}
                        />
                        <Route
                            path={ApplicationPaths.Profile}
                            element={loginAction(LoginActions.Profile)}
                        />
                        <Route
                            path={ApplicationPaths.Register}
                            element={loginAction(LoginActions.Register)}
                        />
                        <Route
                            path={ApplicationPaths.LogOut}
                            element={logoutAction(LogoutActions.Logout)}
                        />
                        <Route
                            path={ApplicationPaths.LogOutCallback}
                            element={logoutAction(LogoutActions.LogoutCallback)}
                        />
                        <Route
                            path={ApplicationPaths.LoggedOut}
                            element={logoutAction(LogoutActions.LoggedOut)}
                        />
                    </Route>
                </Routes>
            </Layout>
        );
    }
}

function loginAction(name) {
    return <Login action={name}></Login>;
}

function logoutAction(name) {
    return <Logout action={name}></Logout>;
}
