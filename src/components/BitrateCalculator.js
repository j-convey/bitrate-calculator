import React, { useState, useCallback } from 'react';
import InputGroup from './InputGroup';
import EncodingOptions from './EncodingOptions';
import Results from './Results';
import { calculateAdjustedBitrate, extractVideoMetadata, defaultEncoding, defaultResolution } from '../utils/bitrateCalculations';

function BitrateCalculator() {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [fileSize, setFileSize] = useState('');
    const [bitrate, setBitrate] = useState(null);
    const [currentEncoding, setCurrentEncoding] = useState(defaultEncoding);
    const [targetEncoding, setTargetEncoding] = useState(null);
    const [adjustedBitrate, setAdjustedBitrate] = useState(null);
      const [currentResolution, setCurrentResolution] = useState(defaultResolution);
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
         calculateAdjustedBitrate(bitrate, currentEncoding, targetEncoding, currentResolution, targetResolution, setAdjustedBitrate, setIdealBitrate);
    };

    const handleResolutionSelect = (type, resolution) => {
        if (type === 'current') {
            setCurrentResolution(resolution);
        } else if (type === 'target') {
            setTargetResolution(resolution);
        }
        calculateAdjustedBitrate(bitrate, currentEncoding, targetEncoding, currentResolution, targetResolution, setAdjustedBitrate, setIdealBitrate);
    };



   const handleFileDrop = useCallback(async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('video/')) {
            const {duration, fileSizeGB, encoding, resolution} = await extractVideoMetadata(file)

            setHours(Math.floor(duration / 3600) );
            setMinutes(Math.floor((duration % 3600) / 60));
            setSeconds(Math.floor(duration % 60));
            setFileSize(fileSizeGB);
            if(encoding){
                setCurrentEncoding(encoding);
             }
            if(resolution){
                 setCurrentResolution(resolution)
             }

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
        <div className={`calculator-container ${isDragging ? 'drag-over' : ''}`} onDrop={handleFileDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
              <InputGroup label="Hours" id="hours" type="number" value={hours} placeholder="Drag a video file or enter hours"  onChange={(e) => setHours(parseInt(e.target.value) || 0)}/>
             <InputGroup label="Minutes" id="minutes" type="number" value={minutes} placeholder="Drag a video file or enter minutes"  onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}/>
            <InputGroup label="Seconds" id="seconds" type="number" value={seconds} placeholder="Drag a video file or enter seconds"  onChange={(e) => setSeconds(parseInt(e.target.value) || 0)} />
            <InputGroup label="File Size (GB)" id="fileSize" type="text" value={fileSize}  placeholder="Drag a video file or enter file size"  onChange={(e) => setFileSize(e.target.value)}  />
            <button onClick={handleCalculate}>Calculate Bitrate</button>
            {bitrate && <Results bitrate={bitrate} adjustedBitrate={adjustedBitrate} idealBitrate={idealBitrate}/>}

             {bitrate && showEncodingOptions && (
                 <EncodingOptions
                     currentEncoding={currentEncoding}
                     targetEncoding={targetEncoding}
                     currentResolution={currentResolution}
                     targetResolution={targetResolution}
                     onEncodingSelect={handleEncodingSelect}
                     onResolutionSelect={handleResolutionSelect}
                 />
            )}

         </div>
    );
}

export default BitrateCalculator;