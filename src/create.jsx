import React from 'react';
import './app.css';
import { Link } from 'react-router-dom';
import { verifyUser } from './SupportJS/verify';
import { setupWS } from './SupportJS/socket';
import { createGoals } from './SupportJS/create';



export function Create() {

    React.useEffect(() => {
        verifyUser();
        setupWS();
        createGoals();
    }
    );

    return (
        <div className="main">
            <section className="main-display">
                <h4 className="statement collab underline">Create A New Goal</h4>
                <form action="profile.html" method="get" className="create-goal" id="create-goal">
                    <h5 className=''>Goal Type:</h5>
                    <div className="goal-selection">
                        <label htmlFor="daily">Daily</label>
                        <input type="radio" id="daily" name="goaltype" value="daily" checked />
                        <label htmlFor="weekly">Weekly</label>
                        <input type="radio" id="weekly" name="goaltype" value="weekly" />
                    </div>

                    <div className="underline">
                        <label htmlFor="due-date">
                            <h5>Deadline:</h5>
                        </label>
                        <input type="date" className="goal-deadline" />
                    </div>


                    <h5>Input Your Goal Here:</h5>
                    <textarea name="goal-content" id="goal-content" cols="25" rows="5"></textarea>
                    <button type="submit" className="bttn-default">Create</button>
                </form>
                <Link to="/profile"><button className="bttn-default bttn-delete">Cancel</button></Link>
            </section>

        </div>
    )
}