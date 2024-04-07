import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Header } from './header';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Header />

                <Routes>
                    {/* Routes go here */}
                </Routes>

            </BrowserRouter>
        </>
    )

}