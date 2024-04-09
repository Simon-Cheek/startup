import React from 'react';
import './app.css';
import { Link } from 'react-router-dom';
import { register } from './SupportJS/register';

export function Register() {

    React.useEffect(register);

    return (
        <div id="register" className="main">
            <section className="main-display">
                <h4 className="statement collab underline">Register</h4>
                <form method="get" className="create-user" id="register-form">
                    <section>
                        <label htmlFor="user">Username</label>
                        <input type="text" name="user" id="user" />
                    </section>

                    <section>
                        <label htmlFor="pw">Password</label>
                        <input type="password" name="pw" id="pw" />
                    </section>
                    <button type="submit" className="bttn-default">Create</button>
                </form>
                <Link to="/"><button className="bttn-default bttn-delete">Cancel</button></Link>
            </section>

        </div>
    )
}