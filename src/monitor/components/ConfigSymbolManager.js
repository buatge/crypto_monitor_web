import React, { useState, useEffect } from 'react';
import { getAllSymbols, addSymbol, deleteSymbol } from '../api/configSymbolApi';
import { Container, Typography, TextField, Chip, IconButton, Stack, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function SymbolConfiguration() {
    const [symbols, setSymbols] = useState([]);
    const [filteredSymbols, setFilteredSymbols] = useState([]);
    const [newSymbol, setNewSymbol] = useState('');


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
            await addSymbol([newSymbol]);  // 将单个 symbol 包装为长度为1的数组
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
        const filter = event.target.value.toLowerCase();
        setNewSymbol(filter);
        if (filter) {
            const filtered = symbols.filter(item => item.symbol.toLowerCase().includes(filter));
            setFilteredSymbols(filtered);
        } else {
            setFilteredSymbols(symbols);
        }
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Symbol Configuration
            </Typography>
            <Box style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                <TextField
                    variant="outlined"
                    label="Add New Symbol"
                    value={newSymbol}
                    onChange={handleFilterChange}
                    style={{ flexGrow: 1, marginRight: '0.5rem' }}
                />
                <IconButton color="primary" onClick={handleAddSymbol} aria-label="add symbol">
                    <AddIcon />
                </IconButton>
            </Box>
            <Box>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {filteredSymbols.map(item => (
                        <Chip
                            key={item.symbol}
                            label={item.symbol}
                            onDelete={() => handleDeleteSymbol(item.symbol)}
                            deleteIcon={<DeleteIcon />}
                            style={{ margin: '0.5rem' }}
                        />
                    ))}
                </Stack>
            </Box>
        </Container>
    );
}

export default SymbolConfiguration;




