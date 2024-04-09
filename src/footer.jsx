import React from 'react';
import './app.css';
import { updatePrices } from './SupportJS/stocks';
import { useLocation } from 'react-router-dom';


export function Footer() {

    React.useEffect(() => {
        updatePrices();
    });

    const location = useLocation();


    return (
        <>
            {location.pathname == "/" && <div id="stock-container" className="footer">
                <div className="stock-section">
                    <p className="price" id="meta"></p>
                    <p className="price" id="aapl"></p>
                    <p className="price" id="amzn"></p>
                    <p className="price" id="nflx"></p>
                    <p className="price" id="goog"></p>
                </div>
            </div>}
            <div className="credits">
                <p>Created by <a href="https://www.simoncheek.com" target="_blank">Simon Cheek</a><span
                    className="credit-dot">&#x2022;</span></p>
                <p><a href="https://github.com/Simon-Cheek/startup">GitHub Repository</a><span
                    className="credit-dot">&#x2022;</span></p>
                <p>Photo by <a
                    href="https://unsplash.com/@brandi1?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Brandi
                    Redd</a> on <a
                        href="https://unsplash.com/photos/scattered-sheets-of-white-paper-covering-the-entire-frame-aJTiW00qqtI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

                </p>
            </div>
        </>
    )
}