// src/components/SymbolModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../styles/AddSymbolModal.css';
import {getAllSymbols} from "../api/configSymbolApi";

Modal.setAppElement('#root');

const AddSymbolModal = ({ isOpen, onClose, onAddSymbol }) => {
    const [symbols, setSymbols] = useState([]);
    const [filteredSymbols, setFilteredSymbols] = useState([]);
    const [filterText, setFilterText] = useState('');

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
        // 获取所有symbol
        if (isOpen) {
            fetchSymbols();
        }
    }, [isOpen]);

    const handleFilterChange = (e) => {
        const text = e.target.value;
        setFilterText(text);
        const filtered = symbols.filter((symbol) =>
            symbol.symbol.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredSymbols(filtered);
    };

    const handleAddSymbol = (symbol) => {
        onAddSymbol(symbol);
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-content">
            <div className="modal-header">
                <h2>Select a Symbol</h2>
                <button onClick={onClose} className="close-button">&times;</button>
            </div>
            <input
                type="text"
                value={filterText}
                onChange={handleFilterChange}
                placeholder="Filter symbols..."
                className="filter-input"
            />
            <div className="symbol-list">
                {filteredSymbols.map((item) => (
                    <div key={item.symbol} className="symbol-item">
                        <span>{item.symbol}</span>
                        <button onClick={() => handleAddSymbol(item.symbol)} className="add-button">Add</button>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default AddSymbolModal;