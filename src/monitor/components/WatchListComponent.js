import React, {useState} from 'react';
import '../styles/Watchlist.css';
import AddSymbolModal from './AddSymbolModal'
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from '@mui/icons-material/Settings';
import {useNavigate} from "react-router-dom";

function WatchListComponent({ watchlistSymbols, addSymbol, onDelete, handleSymbolClick }) {

    const navigate = useNavigate();

    const [hoveredSymbol, setHoveredSymbol] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const username = localStorage.getItem('username');

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleAddSymbol = (symbol) => {
        addSymbol(symbol.toUpperCase());
    };

    const handleMouseEnter = (symbol) => {
        setHoveredSymbol(symbol);
    };

    const handleMouseLeave = () => {
        setHoveredSymbol(null);
    };

    const handleDelete = (symbol) => {
        onDelete(symbol); // 调用父组件传入的删除方法
    };

    const handleSettingsClick = () => {
        navigate('/settings'); // 跳转到设置页面
    };

    return (
        <div className="watchlist">
            {/* Header section */}
            {/*<div className="page-setting">*/}
            {/*    <span style={{ fontWeight: 'bold' }}>用户名：{localStorage.getItem('user_id')}</span>*/}
            {/*</div>*/}
            <div className="watchlist-header">
                <h3>Watchlist</h3>
                <button className="add-button" onClick={handleOpenModal}>Add Symbol</button>
            </div>
            <table className="watchlist-table">
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Last</th>
                    <th>Chg%</th>
                    <SettingsIcon
                        onClick={() => handleSettingsClick()}
                        style={{
                            position: 'absolute',
                            right: '30px',
                            marginTop: '5px',
                            cursor: 'pointer',
                            color: 'lightgray',
                    }} />
                </tr>
                </thead>
                <tbody>
                {watchlistSymbols.map((item, index) => (
                    <tr key={index} onClick={() => handleSymbolClick(item)}
                        onMouseEnter={() => handleMouseEnter(item)}
                        onMouseLeave={() => handleMouseLeave()}
                    >
                        <td>{item}</td>
                        <td>item.last</td>
                        <td>item.changePercent</td>
                        {hoveredSymbol === item && (
                            <DeleteIcon
                                onClick={() => handleDelete(item)}
                                style={{
                                    position: 'absolute',
                                    right: '30px',
                                    cursor: 'pointer',
                                    color: 'red',
                                }}
                            />
                        )}
                    </tr>
                ))}
                </tbody>
            </table>

            <AddSymbolModal
                isOpen={modalIsOpen}
                onClose={handleCloseModal}
                onAddSymbol={handleAddSymbol}
            />
        </div>
    );
}

export default WatchListComponent;