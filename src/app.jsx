import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Header } from './header';
import { Footer } from './footer';
import { Home } from './home';
import { Profile } from './profile';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/goals'>Goals</Route>
                    <Route path='/friendlist'>Friendlist</Route>
                </Routes>

                <Footer />

            </BrowserRouter>
        </>
    )

}