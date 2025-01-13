import React, { useState, useCallback } from 'react';
import './App.css';
import BitrateCalculator from './components/BitrateCalculator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
library.add(faFileUpload);
library.add(faQuestionCircle);
library.add(faGithub);


function App() {
    const [isDragging, setIsDragging] = useState(false);


    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((event) => {
        event.preventDefault();
        setIsDragging(false);
    }, []);

    return (
        <div
            className={`app dark-mode ${isDragging ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <header className="app-header">
                <h1>Bitrate Calculator</h1>
                <a
                    href="https://github.com/j-convey/bitrate-calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                >
                    <FontAwesomeIcon icon={faGithub} className="github-icon" />
                </a>
            </header>
            <BitrateCalculator setIsDragging={setIsDragging} />
            <div className="drag-drop-tooltip">
                <FontAwesomeIcon icon={faQuestionCircle} className="drag-drop-icon" />
                <span className="drag-drop-tooltiptext">Drag and drop a video to auto-fill the time and file size.</span>
            </div>
        </div>
    );
}

export default App;