import React from 'react';
import { withRouter, Link } from 'react-router-dom';

function Header(props) {
   


function handleLogout() {
    localStorage.removeItem("JWT_REPORTS")
    props.history.push('/login')
}
return(
    <nav className="navbar navbar-dark bg-primary">
        <div className="row col-12n d-flex justify-content-center text-white p-2">
            <span className="h3">BIENVENUE</span>
        </div>
        <div className="ml-auto">
        <Link to="/login">
            <button className="btn btn-success m-2">Login</button>
        </Link>
            <button className="btn btn-danger m-2" onClick={() => handleLogout()}>Logout</button>
        </div>
    </nav>
    )
}

export default withRouter(Header);