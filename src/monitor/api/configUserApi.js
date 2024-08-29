import request from '../../common/api/request';

export const getWatchListSymbols = () => {
    const userId = localStorage.getItem('user_id');
    return request.get('/account/getWatchListSymbol', {
        params: {
            userId: userId,
        }
    });
};

export const addWatchSymbol = (symbol) => {
    const userId = localStorage.getItem('user_id');
    return request.post('/account/addWatchListSymbol', { symbol: symbol, userId: userId});
};

export const deleteWatchSymbol = (symbol) => {
    const userId = localStorage.getItem('user_id');
    return request.post(`/account/removeWatchListSymbol`, {symbol: symbol, userId: userId});
};