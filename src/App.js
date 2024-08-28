import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './login/pages/LoginPage';
import SymbolConfiguration from "./monitor/components/ConfigSymbolManager"; // Ensure you use correct import paths

function App() {
    const isAuthenticated = () => {
        return !!localStorage.getItem('authToken'); // 假设 authToken 存储在 localStorage 中
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/symbol-configuration"
                    element={
                        isAuthenticated() ? (
                            <SymbolConfiguration />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/symbol-configuration" replace />} />
            </Routes>
        </Router>
    );
}

export default App;