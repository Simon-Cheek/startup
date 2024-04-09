import React from 'react';
import './app.css';
import { Link } from 'react-router-dom';
import { verifyUser } from './SupportJS/verify';
import { setupWS } from './SupportJS/socket';
import { friendConfig } from './SupportJS/friends';

export function Friendlist() {

    React.useEffect(() => {
        verifyUser();
        setupWS();
        friendConfig();
    });

    return (
        <div className="main">

            <div className="main-display">
                <h3 className="statement collab underline">Friends</h3>
                <p id="friend-desc">Friends are those who's profiles you have access to. In order for friends to see your
                    profile, you must add them directly.</p>


                <div className="main-friendlist">

                    <div className="add-friend list-display">
                        <h5>Add Friend</h5>
                        <form action="friendlist.html" method="get" id="add-form">
                            <label htmlFor="newfriend">Username </label>
                            <input type="text" id="newfriend" name="newfriend" required />
                            <button type="submit" className="bttn-default">Add</button>
                        </form>
                    </div>

                    <div className="friendlist list-display">
                    </div>

                </div>

            </div>




        </div>
    );
}