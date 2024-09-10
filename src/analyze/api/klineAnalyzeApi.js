import request from '../../common/api/request';

export const getAnalyzeSymbolTrend = (symbol) => {
    return request.get('/kline_analyze/get_kline_analyze_by_trend', {
        params: {
            symbol: symbol,
            start_time: "2024-01-01",
        }
    });
};