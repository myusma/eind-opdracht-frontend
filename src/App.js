import React, { useContext, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/navBar/NavBar';
import Home from './pages/home/Home';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import Search from './pages/search/Search';
import './App.css';
import { AuthContext } from './context/AuthContext';
import Reservation from './pages/reservation/Reservation';
import NotFound from './pages/notFound/NotFound';

const Results = lazy(() => import('./pages/results/Results'));
const Details = lazy(() => import('./pages/details/Details'));

function App() {
    const { isAuth } = useContext(AuthContext);

    return (
        <>
            <NavBar title="SMART TARAVEL" />

            <div className="content">
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/search" element={isAuth === true ? <Search /> : <Navigate to="/" />} />
                        <Route exact path="/results" element={<Results />} />
                        <Route exact path="/details/:id" element={<Details />} />
                        <Route exact path="/signin" element={<SignIn />} />
                        <Route exact path="/signup" element={<SignUp />} />
                        <Route exact path="/reservation/:id" element={<Reservation />} />
                        <Route exact path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </div>
        </>
    );
}

export default App;