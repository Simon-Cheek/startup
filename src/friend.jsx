import React from 'react';
import './app.css';
import { Link } from 'react-router-dom';
import { verifyUser } from './SupportJS/verify';
import { setupWS } from './SupportJS/socket';
import { getFriend } from './SupportJS/friendProfile';
import { useLocation } from 'react-router-dom';


export function Friend() {

    let friend = "";

    // extract friend name from URL path
    let location = useLocation();
    location = location.pathname;
    if (location.length > 6) {
        friend = location.slice(8);
    } else {
        console.log("something unexpected happened in data retrieval");
    }


    React.useEffect(() => {
        verifyUser();
        setupWS();
        if (friend) {
            getFriend(friend);
        } else {
            alert("URL not valid");
            window.location.href = "/profile";
        }
    });


    return (
        <div className="main">
            <div className="main-display">
                <section>
                    <h1 className="statement underline"><span className="collab">Username</span>'s Profile</h1>
                    <p className="blue" id="active-goals">0 Active Goals</p>
                    <p className="green" id="completed-goals">0 Completed Goals</p>
                    <p className="red" id="expired-goals">0 Expired Goals</p>
                </section>


                <section className="list-display" id="daily-list-js">
                    <h3 className="underline">Active Daily Goals</h3>
                </section>


                <section className="list-display" id="weekly-list-js">
                    <h3 className="underline">Active Weekly Goals</h3>
                </section>


                <section className="list-display" id="expired-list-js">
                    <h3 className="underline">Finished Goals</h3>
                </section>

                <div>
                    <Link to="/profile"><button className="bttn-default">Return to Profile</button></Link>
                </div>
            </div>
        </div>
    );


}