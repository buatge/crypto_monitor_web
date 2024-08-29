import React from 'react';

function DataDisplay({ selectedSymbol }) {
    return (
        <div className="data-display">
            {selectedSymbol ? (
                <div>
                    <h2>{selectedSymbol} Data</h2>
                    <p>此处展示 {selectedSymbol} 相关的市场数据</p>
                </div>
            ) : (
                <div>
                    <h2>请选择一个币对</h2>
                    <p>选择右侧列表中的币对以查看详情</p>
                </div>
            )}
        </div>
    );
}

export default DataDisplay;