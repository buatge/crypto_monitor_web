import React, {useEffect} from 'react';
import SymbolManager from '../components/ConfigSymbolManager';
import {useNavigate} from "react-router-dom";

function ConfigSymbolPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem('user_id');
        if (!username) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <SymbolManager />
        </div>
    );
}

export default ConfigSymbolPage;