import React from 'react';
import '../App.css'

function Results({ bitrate, adjustedBitrate, idealBitrate }) {
    return (
        <>
            {bitrate && (
                <div className="results">
                    <h2>Results</h2>
                    <p>Average bitrate: {bitrate.kbps.toFixed(2)} kbps</p>
                    <p>Average bitrate: {bitrate.Mbps.toFixed(2)} Mbps</p>
                </div>
            )}
                {adjustedBitrate && (
                     <div className="results adjusted-bitrate">
                        <h2>Adjusted Bitrate</h2>
                          {idealBitrate && <p>Ideal Bitrate: {idealBitrate.kbps.toFixed(2)} kbps / {idealBitrate.Mbps.toFixed(2)} Mbps</p>}
                        <p>Recommended Bitrate: {adjustedBitrate.kbps.toFixed(2)} kbps / {adjustedBitrate.Mbps.toFixed(2)} Mbps</p>
                        <p>Note that these values may not result in a consistent file size.</p>
                    </div>
                   )}
        </>
    );
}

export default Results;