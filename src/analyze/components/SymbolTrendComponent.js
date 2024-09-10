import React, {useEffect, useRef, useState} from 'react';
import {getAnalyzeSymbolTrend} from "../api/klineAnalyzeApi";
// import SymbolTrendChart from "./SymbolTrendChart";
import ZoomLineChartComponent from "./ZoomLineChartComponent";
import '../styles/SymbolTrendChartStyle.css'

function SymbolTrendComponent({ selectedSymbol }) {


    const [klinesDataCollection, setKlinesDataCollection] = useState(null)
    const [symbolTrendData, setSymbolTrendData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [trends, setTrends] = useState([{
            timeframes: ['green', 'green', 'red', 'red'],
        }]);
    const [selected, setSelected] = useState(null); // 用于存储当前选中的时间段
    const [updateTime, setUpdateTime] = useState(null);

    const fetchklines = async () => {
        try {
            setLoading(true);
            if (!selectedSymbol) {
                console.log("无选中币对")
                setLoading(false); // 数据加载完成
                return;
            }

            const data = await getAnalyzeSymbolTrend(selectedSymbol); // 调用后端API获取所有 symbols
            setLoading(false); // 数据加载完成
            setKlinesDataCollection(data.data)
            setSymbolTrendData(data.data.kline_1h)
            updateTrend(data.data)
            setUpdateTime(new Date())

        } catch (error) {
            console.error('Failed to fetch symbols', error);
            setLoading(false);
        }
    };

    const updateTrend = (klineData) => {

        const trend_1h = klineData.kline_1h[klineData.kline_1h.length - 1].trend
        const trend_4h = klineData.kline_4h[klineData.kline_4h.length - 1].trend
        const trend_1d = klineData.kline_1d[klineData.kline_1d.length - 1].trend
        const trend_7d = klineData.kline_7d[klineData.kline_7d.length - 1].trend

        const getTrendColor = (trend) => {
            if (trend === 'uptrend') {
                return 'green'
            } else if (trend === 'downtrend') {
                return 'red'
            } else {
                return 'gray'
            }
        }

        const newTimeFrames = [getTrendColor(trend_1h),
            getTrendColor(trend_4h), getTrendColor(trend_1d), getTrendColor(trend_7d)]

        setTrends([{
                    symbol: '',
                    timeframes: newTimeFrames,
                }])
    }

    useEffect(() => {
        // 获取当前配置的所有 symbols
        console.info('start fetch symbols');
        fetchklines();
    }, [selectedSymbol]);

    const onTrendTimeClcik = (klineInterval) => {
        setSelected(klineInterval);
        if (klineInterval === 0) {
            console.log(klinesDataCollection)
            setSymbolTrendData(klinesDataCollection.kline_1h)
        } else if (klineInterval === 1) {
            setSymbolTrendData(klinesDataCollection.kline_4h)
        } else if (klineInterval === 2) {
            setSymbolTrendData(klinesDataCollection.kline_1d)
        } else if (klineInterval === 3) {
            setSymbolTrendData(klinesDataCollection.kline_7d)
        }
    };

    return (
        <div className="data-display">
            {loading? (
                <div className="loading-container">
                    <p>加载中...</p>
                </div>
            ) : (
                symbolTrendData ? (
                    <div>
                        <div className="trend-dashboard">
                            <div className="dashboard-header">
                                <h2>Trend Dashboard</h2>
                                <p>Update Time {updateTime.toLocaleString()}</p>
                            </div>
                            <div className="dashboard-content">
                                <div className="timeframes">
                                    <span></span>
                                    <span></span>
                                    <span
                                        className={selected === '1h' ? 'active' : ''}
                                        onClick={() => onTrendTimeClcik('1h')}
                                    >1h</span>
                                    <span
                                        className={selected === '4h' ? 'active' : ''}
                                        onClick={() => onTrendTimeClcik('4h')}
                                    >4h</span>
                                    <span
                                        className={selected === '1d' ? 'active' : ''}
                                        onClick={() => onTrendTimeClcik('1d')}
                                    >1d</span>
                                    <span
                                        className={selected === '1w' ? 'active' : ''}
                                        onClick={() => onTrendTimeClcik('1w')}
                                    >1w</span>
                                    <span></span>
                                    <span></span>
                                </div>
                                {trends.map((trend, index) => (

                                    <div className="trend-row" key={index}>
                                        <span></span>
                                        <span></span>
                                        {trend.timeframes.map((color, i) => (
                                            <div key={i} className={`trend-circle ${color}`}
                                                 onClick={() => onTrendTimeClcik(i)}
                                            >
                                            </div>
                                        ))}
                                        <span></span>
                                        <span></span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <ZoomLineChartComponent className="trend-line-chart"
                            data={symbolTrendData}/>
                    </div>
            ) : (
                <div>
                <h2>请选择一个币对</h2>
                <p>选择右侧列表中的币对以查看详情</p>
                </div>
                )
                )}
        </div>


    );
}

export default SymbolTrendComponent;