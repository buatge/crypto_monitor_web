import React, {useState} from 'react';
import '../styles/Watchlist.css';
import AddSymbolModal from './AddSymbolModal'
import DeleteIcon from "@mui/icons-material/Delete";

function WatchListComponent({ watchlistSymbols, addSymbol, onDelete, handleSymbolClick }) {

    const [hoveredSymbol, setHoveredSymbol] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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

    return (
        <div className="watchlist">
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
                                    right: '10px',
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