import React, { useState, useCallback } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faFileUpload);
library.add(faQuestionCircle);


function App() {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [fileSize, setFileSize] = useState('');
    const [bitrate, setBitrate] = useState(null);
    const [currentEncoding, setCurrentEncoding] = useState(null);
    const [targetEncoding, setTargetEncoding] = useState(null);
    const [adjustedBitrate, setAdjustedBitrate] = useState(null);
    const [currentResolution, setCurrentResolution] = useState(null);
    const [targetResolution, setTargetResolution] = useState(null);
    const [showEncodingOptions, setShowEncodingOptions] = useState(false);
    const [idealBitrate, setIdealBitrate] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleCalculate = () => {
        const lengthSeconds = hours * 3600 + minutes * 60 + seconds;
        const sizeNum = parseFloat(fileSize);
        let fileSizeInBytes = sizeNum * 1024 ** 3;
        const bitrateBps = (fileSizeInBytes * 8) / lengthSeconds;
        const bitrateKbps = bitrateBps / 1000;
        const bitrateMbps = bitrateBps / 1000;

        setBitrate({ kbps: bitrateKbps, Mbps: bitrateMbps });
        setShowEncodingOptions(true);
        setAdjustedBitrate(null);
        setIdealBitrate(null)
    };

    const handleEncodingSelect = (type, encoding) => {
        if (type === 'current') {
            setCurrentEncoding(encoding);
        } else if (type === 'target') {
            setTargetEncoding(encoding);
        }
        calculateAdjustedBitrate();
    };


    const handleResolutionSelect = (type, resolution) => {
        if (type === 'current') {
            setCurrentResolution(resolution);
        } else if (type === 'target') {
            setTargetResolution(resolution);
        }
        calculateAdjustedBitrate();
    };


    const calculateAdjustedBitrate = () => {
        if (!bitrate || !currentEncoding || !targetEncoding || !currentResolution || !targetResolution) {
            return;
        }
        let idealAdjustmentFactor;
        let recommendedAdjustmentFactor;


        if (currentResolution === "UHD" && targetResolution === "HD" && currentEncoding === "h265" && targetEncoding === "h265") {
            idealAdjustmentFactor = 0.25;
            recommendedAdjustmentFactor = 0.3;
        } else if (currentResolution === "UHD" && targetResolution === "UHD" && currentEncoding === "h264" && targetEncoding === "h265") {
            idealAdjustmentFactor = 0.5;
            recommendedAdjustmentFactor = 0.6;
        } else if (currentResolution === "UHD" && targetResolution === "UHD" && currentEncoding === "h264" && targetEncoding === "av1") {
            idealAdjustmentFactor = 0.4;
            recommendedAdjustmentFactor = 0.5;
        } else if (currentResolution === "UHD" && targetResolution === "HD" && currentEncoding === "h264" && targetEncoding === "h265") {
            idealAdjustmentFactor = 0.15;
            recommendedAdjustmentFactor = 0.20;
        } else if (currentResolution === "UHD" && targetResolution === "HD" && currentEncoding === "h264" && targetEncoding === "av1") {
            idealAdjustmentFactor = 0.10;
            recommendedAdjustmentFactor = 0.15
        } else if (currentResolution === "HD" && targetResolution === "HD" && currentEncoding === "h264" && targetEncoding === "h265") {
            idealAdjustmentFactor = 0.5;
            recommendedAdjustmentFactor = 0.6;
        } else if (currentResolution === "HD" && targetResolution === "HD" && currentEncoding === "h264" && targetEncoding === "av1") {
            idealAdjustmentFactor = 0.4;
            recommendedAdjustmentFactor = 0.5;
        } else {
            idealAdjustmentFactor = 1;
            recommendedAdjustmentFactor = 1;
        }

        const adjustedKbps = bitrate.kbps * recommendedAdjustmentFactor;
        const adjustedMbps = bitrate.Mbps * recommendedAdjustmentFactor;
        const idealKbps = bitrate.kbps * idealAdjustmentFactor;
        const idealMbps = bitrate.Mbps * idealAdjustmentFactor;
        setAdjustedBitrate({ kbps: adjustedKbps, Mbps: adjustedMbps });
        setIdealBitrate({ kbps: idealKbps, Mbps: idealMbps });
    };

     const handleFileDrop = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
         if (file && file.type.startsWith('video/')) {
             let encoding = null;
             let resolution = null;


             const fileExtension = file.name.split('.').pop().toLowerCase();
             if (fileExtension === 'mp4') {
                 encoding = 'h264';
                 resolution = "HD"
             } else if (fileExtension === 'mov' || fileExtension === 'm4v') {
                 encoding = 'h264'
                 resolution = "HD"
             } else if (fileExtension === 'mkv') {
                 encoding = 'h265'
                 resolution = "UHD"

             } else if (fileExtension === 'avi') {
                 encoding = "h264"
                 resolution = "SD"

             } else {
                 encoding = null;
                 resolution = null;
             }


             const video = document.createElement('video');
             video.preload = 'metadata';
             video.onloadedmetadata = () => {
                 const duration = video.duration;
                 const hours = Math.floor(duration / 3600);
                 const minutes = Math.floor((duration % 3600) / 60);
                 const seconds = Math.floor(duration % 60);


                 setHours(hours);
                 setMinutes(minutes);
                 setSeconds(seconds);
                 setFileSize((file.size / 1024 ** 3).toFixed(2));

                 if (encoding) {
                     setCurrentEncoding(encoding);
                 }
                 if (resolution) {
                     setCurrentResolution(resolution)
                 }

                 video.remove();

             };
             video.src = URL.createObjectURL(file);
         }
    }, []);


    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        setIsDragging(true);
    }, []);


     const handleDragLeave = useCallback((event) => {
        event.preventDefault();
         setIsDragging(false);
    }, []);


    return (
        <div className={`app dark-mode ${isDragging ? 'drag-over' : ''}`} onDrop={handleFileDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
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
                           placeholder="Drag a video file or enter hours"
                          onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                         />
                   </div>
                    <div className="input-group">
                      <label htmlFor="minutes">Minutes:</label>
                         <input
                            type="number"
                            id="minutes"
                           value={minutes}
                             placeholder="Drag a video file or enter minutes"
                           onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                       />
                 </div>
                <div className="input-group">
                    <label htmlFor="seconds">Seconds:</label>
                   <input
                        type="number"
                        id="seconds"
                         value={seconds}
                           placeholder="Drag a video file or enter seconds"
                        onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                    />
               </div>
                <div className="input-group">
                    <label htmlFor="fileSize">File Size (GB):</label>
                      <input
                        type="text"
                       id="fileSize"
                       placeholder="Drag a video file or enter file size"
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
                                <div className="button-group">
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
                                <h3 className="resolution-label">Resolution:</h3>
                                <div className="button-group">
                                    <button
                                        className={currentResolution === 'SD' ? 'selected' : ''}
                                        onClick={() => handleResolutionSelect('current', 'SD')}
                                    >
                                        SD
                                    </button>
                                    <button
                                        className={currentResolution === 'HD' ? 'selected' : ''}
                                        onClick={() => handleResolutionSelect('current', 'HD')}
                                    >
                                        HD
                                    </button>
                                    <button
                                        className={currentResolution === 'UHD' ? 'selected' : ''}
                                        onClick={() => handleResolutionSelect('current', 'UHD')}
                                    >
                                        UHD
                                    </button>
                                </div>
                            </div>
                             <div className="encoding-selection">
                                <h3>Converting To:</h3>
                                  <div className="button-group">
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
                                     <h3 className="resolution-label">Resolution:</h3>
                                    <div className="button-group">
                                        <button
                                            className={targetResolution === 'SD' ? 'selected' : ''}
                                            onClick={() => handleResolutionSelect('target', 'SD')}
                                        >
                                            SD
                                        </button>
                                        <button
                                            className={targetResolution === 'HD' ? 'selected' : ''}
                                            onClick={() => handleResolutionSelect('target', 'HD')}
                                        >
                                            HD
                                        </button>
                                        <button
                                            className={targetResolution === 'UHD' ? 'selected' : ''}
                                            onClick={() => handleResolutionSelect('target', 'UHD')}
                                        >
                                            UHD
                                        </button>
                                    </div>
                                </div>
                                {adjustedBitrate && (
                                   <div className="results adjusted-bitrate">
                                        <h2>Adjusted Bitrate</h2>
                                        {idealBitrate && <p>Ideal Bitrate: {idealBitrate.kbps.toFixed(2)} kbps / {idealBitrate.Mbps.toFixed(2)} Mbps</p>}
                                        <p>Recommended Bitrate: {adjustedBitrate.kbps.toFixed(2)} kbps / {adjustedBitrate.Mbps.toFixed(2)} Mbps</p>
                                       <p>Note that these values may not result in a consistent file size.</p>
                                   </div>
                                )}
                    </div>
                )}
                     <div className="drag-drop-tooltip">
                          <FontAwesomeIcon icon={faQuestionCircle}  className="drag-drop-icon" />
                          <span className="drag-drop-tooltiptext">Drag and drop a video to auto-fill the time and file size.</span>
                      </div>
            </div>
        </div>
    );
}

export default App;