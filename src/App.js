import React, { useState } from 'react';
import './App.css';

function App() {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [fileSize, setFileSize] = useState('');
    const [bitrate, setBitrate] = useState(null);
    const [currentEncoding, setCurrentEncoding] = useState(null);
    const [targetEncoding, setTargetEncoding] = useState(null);
    const [adjustedBitrate, setAdjustedBitrate] = useState(null);
    const [showEncodingOptions, setShowEncodingOptions] = useState(false);

    const handleCalculate = () => {
        const lengthSeconds = hours * 3600 + minutes * 60 + seconds;
        const sizeNum = parseFloat(fileSize);
        let fileSizeInBytes = sizeNum * 1024 ** 3;
        const bitrateBps = (fileSizeInBytes * 8) / lengthSeconds;
        const bitrateKbps = bitrateBps / 1000;
        const bitrateMbps = bitrateKbps / 1000;

        setBitrate({ kbps: bitrateKbps, Mbps: bitrateMbps });
        setShowEncodingOptions(true);
        setAdjustedBitrate(null);
    };

    const handleEncodingSelect = (type, encoding) => {
        if (type === 'current') {
            setCurrentEncoding(encoding);
        } else if (type === 'target') {
            setTargetEncoding(encoding);
        }
        calculateAdjustedBitrate();
    };

    const calculateAdjustedBitrate = () => {
        if (!bitrate || !currentEncoding || !targetEncoding) {
            return;
        }
        let adjustmentFactor = 1.0;

         if (currentEncoding === 'h264' && targetEncoding === 'h265') {
            adjustmentFactor = 0.7;
        } else if (currentEncoding === 'h264' && targetEncoding === 'av1') {
            adjustmentFactor = 0.6;
        } else if (currentEncoding === 'h265' && targetEncoding === 'av1') {
            adjustmentFactor = 0.8;
        } else if (currentEncoding === "h265" && targetEncoding === "h264"){
            adjustmentFactor = 1.3;
        } else if (currentEncoding === "av1" && targetEncoding === "h264"){
            adjustmentFactor = 1.5;
        }else if (currentEncoding === "av1" && targetEncoding === "h265"){
            adjustmentFactor = 1.2;
        }
        const adjustedKbps = bitrate.kbps * adjustmentFactor;
        const adjustedMbps = bitrate.Mbps * adjustmentFactor;
        setAdjustedBitrate({ kbps: adjustedKbps, Mbps: adjustedMbps });
    };

    return (
        <div className="app dark-mode">
            <header className="app-header">
                <h1>Bitrate Calculator</h1>
            </header>
              <div className="calculator-container">
                  <div className="input-group">
                      <label htmlFor="hours">Hours:</label>
                      <input
                          type="number"
                          id="hours"
                          value={hours}
                          onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                      />
                  </div>
                  <div className="input-group">
                      <label htmlFor="minutes">Minutes:</label>
                      <input
                          type="number"
                          id="minutes"
                          value={minutes}
                          onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                      />
                  </div>
                  <div className="input-group">
                      <label htmlFor="seconds">Seconds:</label>
                      <input
                          type="number"
                          id="seconds"
                          value={seconds}
                          onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                      />
                  </div>
                  <div className="input-group">
                      <label htmlFor="fileSize">File Size (GB):</label>
                      <input
                          type="text"
                          id="fileSize"
                          placeholder="e.g., 2.46"
                          value={fileSize}
                          onChange={(e) => setFileSize(e.target.value)}
                      />
                  </div>
                  <button onClick={handleCalculate}>Calculate Bitrate</button>

                  {bitrate && (
                      <div className="results">
                          <h2>Results</h2>
                          <p>Average bitrate: {bitrate.kbps.toFixed(2)} kbps</p>
                          <p>Average bitrate: {bitrate.Mbps.toFixed(2)} Mbps</p>
                      </div>
                  )}

                  {bitrate && showEncodingOptions && (
                      <div className="encoding-options">
                          <h2>Encoding Options</h2>
                          <div className="encoding-selection">
                              <h3>Current Encoding:</h3>
                              <button
                                  className={currentEncoding === 'h264' ? 'selected' : ''}
                                  onClick={() => handleEncodingSelect('current', 'h264')}
                              >
                                  h264
                              </button>
                              <button
                                  className={currentEncoding === 'h265' ? 'selected' : ''}
                                  onClick={() => handleEncodingSelect('current', 'h265')}
                              >
                                  h265
                              </button>
                              <button
                                  className={currentEncoding === 'av1' ? 'selected' : ''}
                                  onClick={() => handleEncodingSelect('current', 'av1')}
                              >
                                  av1
                              </button>
                          </div>
                          <div className="encoding-selection">
                              <h3>Converting To:</h3>
                              <button
                                  className={targetEncoding === 'h264' ? 'selected' : ''}
                                  onClick={() => handleEncodingSelect('target', 'h264')}
                              >
                                  h264
                              </button>
                              <button
                                  className={targetEncoding === 'h265' ? 'selected' : ''}
                                  onClick={() => handleEncodingSelect('target', 'h265')}
                              >
                                  h265
                              </button>
                              <button
                                  className={targetEncoding === 'av1' ? 'selected' : ''}
                                  onClick={() => handleEncodingSelect('target', 'av1')}
                              >
                                  av1
                              </button>
                          </div>
                          {adjustedBitrate && (
                            <div className="results adjusted-bitrate">
                                <h2>Adjusted Bitrate</h2>
                                <p>Adjusted Bitrate: {adjustedBitrate.kbps.toFixed(2)} kbps</p>
                                <p>Adjusted Bitrate: {adjustedBitrate.Mbps.toFixed(2)} Mbps</p>
                            </div>
                          )}
                      </div>
                  )}
              </div>
        </div>
    );
}

export default App;