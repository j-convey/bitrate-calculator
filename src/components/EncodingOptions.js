import React from 'react';
import '../App.css';
function EncodingOptions({ currentEncoding, targetEncoding, currentResolution, targetResolution, onEncodingSelect, onResolutionSelect }) {
return (
<div className="encoding-options">
<h2>Encoding Options</h2>
<div className="encoding-selection">
<h3>Current Encoding:</h3>
<div className="button-group">
<button
className={currentEncoding === 'h264' ? 'selected' : ''}
onClick={() => onEncodingSelect('current', 'h264')}
>
h264
</button>
<button
className={currentEncoding === 'h265' ? 'selected' : ''}
onClick={() => onEncodingSelect('current', 'h265')}
>
h265
</button>
<button
className={currentEncoding === 'av1' ? 'selected' : ''}
onClick={() => onEncodingSelect('current', 'av1')}
>
av1
</button>
</div>
<h3 className="resolution-label">Resolution:</h3>
<div className="button-group">
<button
className={currentResolution === 'SD' ? 'selected' : ''}
onClick={() => onResolutionSelect('current', 'SD')}
>
SD
</button>
<button
className={currentResolution === 'HD' ? 'selected' : ''}
onClick={() => onResolutionSelect('current', 'HD')}
>
HD
</button>
<button
className={currentResolution === 'UHD' ? 'selected' : ''}
onClick={() => onResolutionSelect('current', 'UHD')}
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
onClick={() => onEncodingSelect('target', 'h264')}
>
h264
</button>
<button
className={targetEncoding === 'h265' ? 'selected' : ''}
onClick={() => onEncodingSelect('target', 'h265')}
>
h265
</button>
<button
className={targetEncoding === 'av1' ? 'selected' : ''}
onClick={() => onEncodingSelect('target', 'av1')}
>
av1
</button>
</div>
<h3 className="resolution-label">Resolution:</h3>
<div className="button-group">
<button
className={targetResolution === 'SD' ? 'selected' : ''}
onClick={() => onResolutionSelect('target', 'SD')}
>
SD
</button>
<button
className={targetResolution === 'HD' ? 'selected' : ''}
onClick={() => onResolutionSelect('target', 'HD')}
>
HD
</button>
<button
className={targetResolution === 'UHD' ? 'selected' : ''}
onClick={() => onResolutionSelect('target', 'UHD')}
>
UHD
</button>
</div>
</div>
</div>
);
}

export default EncodingOptions;