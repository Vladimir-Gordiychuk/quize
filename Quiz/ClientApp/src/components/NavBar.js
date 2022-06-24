import { NavLink } from "react-router-dom";

const NavBar = (props) => {
    const linkClass = (status) => (status.isActive ? "active item" : "item");

    return (
        <div className="ui secondary pointing menu">
            <NavLink to="/questions" className={linkClass}>
                Questions
            </NavLink>
            <NavLink to="/" className={linkClass}>
                Logo
            </NavLink>
            <div className="right menu">
                <a className="ui item">Logout</a>
            </div>
        </div>
    );
};

export default NavBar;
