import React, {useEffect} from 'react';
import SymbolManager from '../components/ConfigSymbolManager';
import {useNavigate} from "react-router-dom";

function SymbolPage() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("SymbolPage")
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <SymbolManager />
        </div>
    );
}

export default SymbolPage;