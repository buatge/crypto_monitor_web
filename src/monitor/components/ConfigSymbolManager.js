import React, { useState, useEffect } from 'react';
import {getAllSymbols, addSymbol, deleteSymbol, subscribeNewSymbol} from '../api/configSymbolApi';
import { Container, Typography, TextField, Chip, IconButton, Stack, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SpiderControlButton from "../../spider/components/SpiderControlButton";

function SymbolConfiguration() {
    const [symbols, setSymbols] = useState([]);
    const [filteredSymbols, setFilteredSymbols] = useState([]);
    const [newSymbol, setNewSymbol] = useState('');
    const [hoveredSymbol, setHoveredSymbol] = useState(null);

    const handleMouseEnter = (symbol) => {
        setHoveredSymbol(symbol);
    };

    const handleMouseLeave = () => {
        setHoveredSymbol(null);
    };

    const fetchSymbols = async () => {
        try {
            const data = await getAllSymbols(); // 调用后端API获取所有 symbols
            console.info('symbols = ', data);
            setSymbols(data.data || []); // 将 symbols 更新到 state 中
            setFilteredSymbols(data.data);
        } catch (error) {
            console.error('Failed to fetch symbols', error);
        }
    };

    useEffect(() => {
        // 获取当前配置的所有 symbols
        console.info('start fetch symbols');
        fetchSymbols();
    }, []);


    const handleAddSymbol = async () => {
        if (!newSymbol) return;
        try {
            await addSymbol(newSymbol);  // 将单个 symbol 包装为长度为1的数组
            await subscribeNewSymbol(newSymbol);
            fetchSymbols();  // 添加成功后重新获取 symbols 列表
            setNewSymbol('');
        } catch (error) {
            console.error('Failed to add symbol', error);
        }
    };

    const handleDeleteSymbol = async (symbol) => {
        try {
            await deleteSymbol(symbol);
            fetchSymbols();  // 删除成功后重新获取 symbols 列表
        } catch (error) {
            console.error('Failed to delete symbol', error);
        }
    };

    const handleFilterChange = (event) => {
        const filter = event.target.value.toUpperCase();
        setNewSymbol(filter);
        if (filter) {
            const filtered = symbols.filter(item => item.symbol.toUpperCase().includes(filter));
            setFilteredSymbols(filtered);
        } else {
            setFilteredSymbols(symbols);
        }
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Symbol 配置
            </Typography>
            <Box
                style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem',
                    backgroundColor: '#f5f5f5', // Light grey background
                    borderRadius: '8px', // Rounded corners
                }}
            >
                <TextField
                    label="Add New Symbol"
                    value={newSymbol}
                    onChange={handleFilterChange}
                    fullWidth // Ensures the TextField takes up the full width available
                    InputProps={{
                        style: {
                            padding: '0.3rem',
                            borderRadius: '4px', // Slight rounding to match the parent Box
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Slight shadow for depth
                        },
                    }}
                    style={{
                        width: '50%',
                        marginRight: '0.1rem',
                        backgroundColor: '#fff', // White background for the TextField
                        borderRadius: '4px', // Slight rounding to match the parent Box
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Slight shadow for depth
                    }}
                />
                <IconButton
                    color="primary"
                    onClick={handleAddSymbol}
                    aria-label="add symbol"
                    style={{
                        backgroundColor: '#3f51b5', // Primary color background
                        color: '#fff', // White icon color
                        padding: '0.5rem', // Adjust padding for better sizing
                        borderRadius: '50%', // Circular button
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Slight shadow for depth
                    }}
                >
                    <AddIcon />
                </IconButton>

                <SpiderControlButton
                    style={{
                        marginLeft: 'auto',  // 推动按钮到右边
                    }}
                    />
            </Box>

            <Box>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {filteredSymbols.map(item => (
                        <Box
                            key={item.symbol}
                            onMouseEnter={() => handleMouseEnter(item.symbol)}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                margin: '0.5rem',
                                padding: '0.5rem',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                            }}
                        >
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <span>{item.symbol}</span>
                                <span style={{
                                    display: 'inline-block',
                                    width: '10px',
                                    height: '10px',
                                    backgroundColor: item.subscribed ? 'green' : 'red',
                                    borderRadius: '50%',
                                    marginLeft: '8px',
                                }}/>
                            </div>
                            <div style={{fontSize: '0.8rem', color: '#888', marginTop: '4px'}}>
                                {new Date(item.latest_time).toLocaleString()}
                            </div>
                            {hoveredSymbol === item.symbol && (
                                <DeleteIcon
                                    onClick={() => handleDeleteSymbol(item.symbol)}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: '10px',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        color: 'gray',
                                    }}
                                />
                                )}
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Container>
    );
}

export default SymbolConfiguration;




