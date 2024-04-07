import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Header } from './header';

export default function App() {
    return (
        <>
            <Header />
            <div className='body bg-dark text-light'>App will display here</div>;
        </>
    )

}