import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {isSpiderRunningApi, startSpiderApi} from "../api/SpiderOprateApi";

function SpiderControlButton() {
    const [isSpiderRunning, setIsSpiderRunning] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSpiderStatus = async () => {
            try {
                const data = await isSpiderRunningApi()
                setIsSpiderRunning(data.running);
            } catch (error) {
                console.error('Failed to check spider status', error);
            } finally {
                setLoading(false);
            }
        };

        checkSpiderStatus();
    }, []);

    const handleStartSpider = async () => {
        try {
            const data = await startSpiderApi()
            setIsSpiderRunning(true);
        } catch (error) {
            console.error('Failed to start spider', error);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            {loading ? (
                <CircularProgress />
            ) : (
                <Button
                    variant="contained"
                    onClick={handleStartSpider}
                    disabled={isSpiderRunning}
                    style={{
                        backgroundColor: isSpiderRunning ? 'gray' : '#1976d2',
                        color: '#fff',
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        cursor: isSpiderRunning ? 'not-allowed' : 'pointer',
                        marginLeft: 'auto'
                    }}
                >
                    {isSpiderRunning ? 'Spider is Running' : 'Start the Spider'}
                </Button>
            )}
        </Box>
    );
}

export default SpiderControlButton;