import React, {useEffect, useState} from 'react';
import '../styles/WatchListPageCss.css';
import WatchListComponent from '../components/WatchListComponent';
import DataDisplay from '../components/SymbolDetailsDisplay';
import {addWatchSymbol, deleteWatchSymbol, getWatchListSymbols} from "../api/configUserApi";

function WatchListPage() {
    const [watchlist, setWatchlist] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState(null);

    const fetchSymbols = async () => {
        try {
            const data = await getWatchListSymbols(); // 调用后端API获取所有 symbols
            console.info('user_id = ', localStorage.getItem('user_id'))
            setWatchlist(data.data || []); // 将 symbols 更新到 state 中
        } catch (error) {
            console.error('Failed to fetch symbols', error);
        }
    };

    useEffect(() => {
        // 获取所有symbol
        fetchSymbols();
    }, []);

    const addSymbol = async (symbol) => {
        if (!watchlist.includes(symbol)) {
            console.log('add symbol', symbol);
            await addWatchSymbol(symbol);
            fetchSymbols()
        }
    };

    const delSymbol = async (symbol) => {
        if (watchlist.includes(symbol)) {
            console.log('delete symbol', symbol);
            await deleteWatchSymbol(symbol);
            fetchSymbols()
        }
    }

    const handleSymbolClick = (symbol) => {
        setSelectedSymbol(symbol);
    };

    return (
        <div className="app-container">
            <DataDisplay selectedSymbol={selectedSymbol} />
            <WatchListComponent
                watchlistSymbols={watchlist}
                addSymbol={addSymbol}
                onDelete={delSymbol}
                handleSymbolClick={handleSymbolClick}
            />
        </div>
    );
}

export default WatchListPage;