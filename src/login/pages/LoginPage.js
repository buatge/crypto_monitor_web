import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(username, password);
            localStorage.setItem('user_id', username);
            console.log("login success, run to /symbol-configuration")
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Box>
        </Container>
    );
}

export default LoginPage;