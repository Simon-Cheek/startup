import React from 'react';
import './app.css';
import { verify } from './SupportJS/login';


export function Home() {

    React.useEffect(() => {
        verify();
    });



    return (
        <div className="main-login main">

            <div className="description">
                <h2 className="statement">Productivity Software</h2>
                <h2 className="statement">for <span className="collab">Collaborators</span></h2>
            </div>

            <div>
                <form action="index.html" method="GET" className="login" id="login-form">
                    <h3>Login</h3>
                    <section>
                        <label for="user">Username</label>
                        <input type="text" name="user" id="user" />
                    </section>

                    <section>
                        <label for="pw">Password</label>
                        <input type="password" name="pw" id="pw" />
                    </section>

                    <button className="btn login-btn" type="submit">Submit</button>

                    <a href="signup.html">
                        <p className="signup-prompt">New to Gollab? Register here!</p>
                    </a>

                </form>
            </div>

        </div>

    )
}