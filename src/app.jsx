import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Header } from './header';
import { Footer } from './footer';
import { Home } from './home';
import { Register } from './register';
import { Profile } from './profile';
import { Create } from './create';
import { Goals } from './goals';
import { Friendlist } from './friendlist';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/goals' element={<Goals />} />
                    <Route path="/friendlist" element={<Friendlist />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="*" />
                </Routes>

                <Footer />

            </BrowserRouter>
        </>
    )

}