import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import './index.css';

function Header(props) {
   


function handleLogout() {
    localStorage.removeItem("JWT_REPORTS");
    localStorage.removeItem("LAST_DATE");
    localStorage.removeItem("LAST_TYPE_IRM");
    props.history.push('/login')
}
return(
    <nav className="navbar navbar-dark nav_color">
        <div className="row col-12n d-flex justify-content-center text-white">
        <Link to="/">
            <button className="btn btn-success m-2">Accueil</button>
        </Link>
        </div>
        <div className="ml-auto">
       
        <Link to="/login">
            <button className="btn btn-info m-2">Login</button>
        </Link>
        <button className="btn btn-danger m-2" onClick={() => handleLogout()}>Logout</button>
        <Link to="/timeline">
            <button className="btn btn-success m-2">Timeline</button>
        </Link>
        </div>
    </nav>
    )
}

export default withRouter(Header);