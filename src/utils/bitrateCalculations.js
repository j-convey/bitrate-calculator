export const defaultEncoding = 'h264';
export const defaultResolution = "HD";


 export const calculateAdjustedBitrate = (bitrate, currentEncoding, targetEncoding, currentResolution, targetResolution, setAdjustedBitrate, setIdealBitrate) => {
     if (!bitrate || !currentEncoding || !targetEncoding || !currentResolution || !targetResolution) {
      return;
      }
    let idealAdjustmentFactor;
    let recommendedAdjustmentFactor;
    const adjustmentFactors = new Map();
    adjustmentFactors.set('HD-HD-h264-h265', { ideal: 0.5, recommended: 0.6 });
    adjustmentFactors.set('HD-HD-h265-av1', { ideal: 0.4, recommended: 0.7 }); 
    adjustmentFactors.set('HD-HD-h264-av1', { ideal: 0.65, recommended: 0.35 }); 

    adjustmentFactors.set('UHD-UHD-h264-h265', { ideal: 0.5, recommended: 0.6 });
    adjustmentFactors.set('UHD-UHD-h265-av1', { ideal: 0.4, recommended: 0.7 }); 
    adjustmentFactors.set('UHD-UHD-h264-av1', { ideal: 0.65, recommended: 0.35 });

     adjustmentFactors.set('UHD-HD-h265-h265', { ideal: 0.5, recommended: 0.6 });
     adjustmentFactors.set('UHD-HD-h265-av1', { ideal: 0.45, recommended: 0.55 });
     adjustmentFactors.set('UHD-HD-h264-h265', { ideal: 0.7, recommended: 0.3 }); 
     adjustmentFactors.set('UHD-HD-h264-av1', { ideal: 0.6, recommended: 0.4 });
   
    const key = `${currentResolution}-${targetResolution}-${currentEncoding}-${targetEncoding}`;

    const factors = adjustmentFactors.get(key);
    
    if (factors) {
      idealAdjustmentFactor = factors.ideal;
      recommendedAdjustmentFactor = factors.recommended;
    } else {
      idealAdjustmentFactor = 1;
      recommendedAdjustmentFactor = 1;
    }

    const adjustedKbps = bitrate.kbps * recommendedAdjustmentFactor;
      const adjustedMbps = bitrate.Mbps * recommendedAdjustmentFactor;
    const idealKbps = bitrate.kbps * idealAdjustmentFactor;
    const idealMbps = bitrate.Mbps * idealAdjustmentFactor;
     setAdjustedBitrate({ kbps: adjustedKbps, Mbps: adjustedMbps });
      setIdealBitrate({kbps: idealKbps, Mbps: idealMbps});
};

export  const extractVideoMetadata = (file) => {
     return new Promise((resolve) => {
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

             resolve({
                   duration: duration,
                   fileSizeGB: (file.size / 1024 ** 3).toFixed(2),
                   encoding: encoding,
                   resolution: resolution
                  });
          video.remove();
        };
       video.src = URL.createObjectURL(file);
     });
};