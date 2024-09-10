import React, {useRef} from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    TimeScale,
    Title,
    Tooltip,
    Legend,
    Filler, // 导入 Filler 来支持区域填充
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom'; // 从 chartjs-plugin-zoom 导入插件
import annotationPlugin from 'chartjs-plugin-annotation'; // 用于画虚线的插件
import 'chartjs-adapter-date-fns'; // 导入时间适配器
import moment from 'moment-timezone';

// 注册 chart.js 的核心组件
ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    TimeScale,
    Title,
    Tooltip,
    Legend,
    Filler, // 注册 Filler
    annotationPlugin, // 注册 annotation 插件
    zoomPlugin // 注册 zoom 插件
);


function ZoomLineChartComponent({data}) {


    const chartRef = useRef(null);
    const tooltipRef = useRef(null);

    // 检查数据是否为空
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    const handleClick = (event) => {
        const chart = chartRef.current;
        if (!chart) return;

        const canvasPosition = chart.canvas.getBoundingClientRect();
        const mouseX = event.nativeEvent.clientX - canvasPosition.left;

        // 获取 X 轴坐标
        const xScale = chart.scales.x;
        const xValue = xScale.getValueForPixel(mouseX);

        // 查找数据点的值
        const dataset = chart.data.datasets[0];
        const data = dataset.data;
        const closestPoint = data.reduce((closest, point) => {
            const pixel = xScale.getPixelForValue(new Date(point.x));
            const mouseDist = Math.abs(mouseX - pixel);
            const closestDist = Math.abs(mouseX - xScale.getPixelForValue(new Date(closest.x)));
            return mouseDist < closestDist ? point : closest;
        }, data[0]);

        // 更新 tooltip 内容
        const xLabel = closestPoint.x;
        const yValue = closestPoint.y;
        const trend = yValue === 1 ? 'Uptrend' : yValue === -1 ? 'Downtrend' : 'Sideways';

        // 更新 tooltip 内容
        if (tooltipRef.current) {
            tooltipRef.current.innerHTML = `
        <div>Date: ${xLabel}</div>
        <div>Trend: ${trend}</div>
        <div>Close: ${closestPoint.z}</div>
      `;
            tooltipRef.current.style.top = `${event.nativeEvent.clientY}px`;
            tooltipRef.current.style.left = `${event.nativeEvent.clientX}px`;
            tooltipRef.current.style.display = 'block';
        }
    };

    // 将 trend 转换为数字值
    const trendMap = { 'uptrend': 1, 'downtrend': -1, 'sideways': 0 };

    console.log(data[data.length - 1].datetime)
    const transformedData = data.map(entry => ({
        datetime: moment(entry.datetime).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm'),
        close: entry.close,
        trend: trendMap[entry.trend],
    }));

    const chartData = {
        labels: transformedData.map(entry => entry.datetime),
        datasets: [
            {
                label: '',
                data: transformedData.map(entry => ({
                        x: entry.datetime,
                        y: entry.trend,
                        z: entry.close,
                    })
                ),
                borderColor: '#8884d8',
                fill: true, // 启用区域填充
                segment: {
                    backgroundColor: (ctx) => {
                        const prevValue = ctx.p0.parsed.y;
                        const currValue = ctx.p1.parsed.y;

                        // 当区域的起始值和结束值都大于 0 时
                        if (prevValue > 0 && currValue > 0) return 'rgba(0, 255, 0, 0.2)';
                        // 当区域的起始值和结束值都小于 0 时
                        if (prevValue < 0 && currValue < 0) return 'rgba(255, 0, 0, 0.2)';
                        // 当区域的起始值为0且结束值大于0
                        if (prevValue === 0 && currValue > 0) return 'rgba(0, 255, 0, 0.2)';
                        // 当区域的起始值为0且结束值小于0
                        if (prevValue === 0 && currValue < 0) return 'rgba(255, 0, 0, 0.2)';
                        // 当区域的起始值大于0且结束值小于0
                        if (prevValue > 0 && currValue < 0) return 'rgba(255, 0, 0, 0.2)';
                        // 当区域的起始值小于0且结束值大于0
                        if (prevValue < 0 && currValue > 0) return 'rgba(0, 255, 0, 0.2)';
                        return 'rgba(0, 0, 0, 0)'; // 默认不填充
                    },
                    borderColor: (ctx) => {
                        const currentValue = ctx.p1.parsed.y;
                        return currentValue > 0
                            ? 'green' // 0 以上绿色边界
                            : currentValue < 0
                                ? 'red' // 0 以下红色边界
                                : 'gray'; // 等于 0 时灰色边界
                    },
                },
                pointRadius: 1,
                pointHoverRadius: 7,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'hour', // 设置为按小时显示
                    displayFormats: {
                        hour: 'MMM d, HH:mm', // 自定义显示格式为 日期+小时
                    },
                    tooltipFormat: 'MMM d, yyyy, HH:mm', // Tooltip中显示日期+小时
                },
                title: {
                    display: false,
                    text: 'Datetime',
                },
            },
            y: {
                title: {
                    display: false,
                    text: 'Trend',
                },
                ticks: {
                    callback: (value) => {
                        return value === 1 ? 'Uptrend' : value === -1 ? 'Downtrend' : value === 0 ? 'Sideways' : "";
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false // 隐藏图例
            },
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: 0,
                        yMax: 0,
                        borderColor: 'gray', // 虚线的颜色
                        borderWidth: 2,
                        borderDash: [10, 5], // 虚线样式
                        label: {
                            display: true,
                            content: '0 Line',
                            position: 'end',
                        },
                    },
                },
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x', // 只允许X轴拖动
                },
                zoom: {
                    wheel: {
                        enabled: true, // 启用鼠标滚轮缩放
                    },
                    pinch: {
                        enabled: true, // 启用手势缩放
                    },
                    mode: 'x', // 只允许X轴缩放
                    limits: {
                        x: { min: 'original', max: 'original' }, // 限制缩放边界为原始数据范围
                    },
                },
            },
            tooltip: {
                enabled: false, // 禁用默认工具提示
            }
        },
    };


    return (
        <div style={{ position: 'relative', height: '400px', width: '100%' }}>
            <Line data={chartData} options={options}
                  onClick={ handleClick }
                  ref={chartRef}
            />
                <div
                    ref={tooltipRef}
                    style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        border: '1px solid black',
                        padding: '5px',
                        borderRadius: '3px',
                        pointerEvents: 'none',
                        display: 'none', // 初始隐藏
                    }}
                />
        </div>
    );
}

export default ZoomLineChartComponent;