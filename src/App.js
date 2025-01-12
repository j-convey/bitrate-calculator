import React, { useState } from 'react';
import './App.css';

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [fileSize, setFileSize] = useState('');
  const [bitrate, setBitrate] = useState(null);

  const handleCalculate = () => {
    const lengthSeconds = hours * 3600 + minutes * 60 + seconds;

    const sizeNum = parseFloat(fileSize);
    let fileSizeInBytes;

    fileSizeInBytes = sizeNum * 1024 ** 3;

    const bitrateBps = (fileSizeInBytes * 8) / lengthSeconds;
    const bitrateKbps = bitrateBps / 1000;
    const bitrateMbps = bitrateKbps / 1000;

    setBitrate({ kbps: bitrateKbps, Mbps: bitrateMbps });
  
  
  };
  

  return (
    <div className="app">
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
      </div>
    </div>
  );
}

export default App;
