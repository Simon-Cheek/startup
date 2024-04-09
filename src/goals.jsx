import React from 'react';
import './app.css';
import { Link } from 'react-router-dom';
import { verifyUser } from './SupportJS/verify';
import { setupWS } from './SupportJS/socket';
import { goalConfig } from './SupportJS/goal';


export function Goals() {

    React.useEffect(() => {
        verifyUser();
        setupWS();
        goalConfig();
    });

    return (
        <div className="main">

            <section className="main-display">

                <h3 className="statement underline"><span className="collab user-info">Username</span><span className="collab">:</span>
                    Goals</h3>


                <div className="list-display" id="total-list">
                    <h4 className="underline">Active</h4>
                </div>

                <div className="list-display" id="expired-list">
                    <h4 className="underline">Previous</h4>
                </div>

                <Link to="/profile"><button className="bttn-default">Back to Profile</button></Link>
            </section>


        </div>
    );
}