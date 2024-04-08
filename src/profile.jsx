import React from 'react';
import './app.css';



export function Profile() {



    return (
        <div class="main">
            <div className="main-display">
                <section>
                    <h1 className="statement underline">Welcome, <span className="collab user-info">Username</span></h1>
                    <p className="blue" id="active-goals">0 Active Goals</p>
                    <p className="green" id="completed-goals">0 Completed Goals</p>
                    <p className="red" id="expired-goals">0 Expired Goals</p>
                </section>


                <section className="list-display" id="daily-list-js">
                    <h3 className="underline">Due Today</h3>
                </section>


                <section className="list-display" id="weekly-list-js">
                    <h3 className="underline">Due This Week</h3>
                </section>

                <div>
                    <a href="goals.html"><button className="bttn-default">View All Goals</button></a>
                    <a href="create.html"><button className="bttn-default">Create Goal</button></a>
                    <button className="bttn-default" id="logout">LogOut</button>
                </div>
            </div>
        </div>
    );
}