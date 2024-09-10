import React from 'react';
import SymbolTrendComponent from "../../analyze/components/SymbolTrendComponent";

function DataDisplay({ selectedSymbol }) {
    return (
        <div className="data-display">
            <SymbolTrendComponent selectedSymbol={selectedSymbol} />
        </div>
    );
}

export default DataDisplay;