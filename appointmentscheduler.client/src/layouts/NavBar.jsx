import '../styles/NavBar.css';
import {Link} from 'react-router-dom';

export default function NavBar() {
    return(
        <div className="mb-5">
            <nav style={{height:55}} className="navbar navbar-expand-lg navbar-scroll fixed-top shadow-0 border-bottom border-dark">
                <div className="container">
                    <a className="navbar-brand" href="#!"><i className="fab fa-mdb fa-4x"></i></a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Coaches</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/appointments" className="nav-link">Appointments</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/schedules" className="nav-link">Schedules</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" style={{opacity:"40%"}} href="#!">Sign In</a>
                        </li>
                        <Link to="/create-appointment" className="btn btn-dark ms-3">Get Started</Link>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}