import request from '../../common/api/request';

export const getAllSymbols = () => {
    return request.get('/monitor/get_all_symbols');
};

export const addSymbol = (symbol) => {
    return request.post('/monitor/add_config_symbols', { symbols: [symbol] });
};

export const deleteSymbol = (symbol) => {
    return request.post(`/monitor/remove_config_symbol`, {symbol: symbol});
};

export const subscribeNewSymbol = (symbol) => {
    return request.post(`/monitor/subscribe_new_symbol`, {symbol: symbol});
}