import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="index.html"> <img src="Assets/logo.png" alt="Logo" id="logo" /><span
                id="main-title">Gollab</span>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="profile.html"><span className="nav-text">Profile</span><span
                            className="sr-only">(current)</span></a>
                    </li>

                    <li className="nav-item active">
                        <a className="nav-link" href="goals.html"><span className="nav-text">My Goals</span><span
                            className="sr-only">(current)</span></a>
                    </li>

                    <li className="nav-item active">
                        <a className="nav-link" href="friendlist.html"><span className="nav-text">Friends</span><span
                            className="sr-only">(current)</span></a>
                    </li>

                </ul>
            </div>
        </nav>
    )

}
