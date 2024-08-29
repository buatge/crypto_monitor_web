import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './login/pages/LoginPage';
import WatchListPage from "./monitor/pages/WatchListPage";

function App() {
    const isAuthenticated = () => {
        return localStorage.getItem('user_id')
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/main-watchlist"
                    element={
                        isAuthenticated() ? (
                            <WatchListPage />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/main-watchlist" replace />} />
            </Routes>
        </Router>
    );
}

export default App;