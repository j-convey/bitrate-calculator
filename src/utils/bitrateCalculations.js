export const defaultEncoding = 'h264';
export const defaultResolution = "HD";


 export const calculateAdjustedBitrate = (bitrate, currentEncoding, targetEncoding, currentResolution, targetResolution, setAdjustedBitrate, setIdealBitrate) => {
     if (!bitrate || !currentEncoding || !targetEncoding || !currentResolution || !targetResolution) {
      return;
      }
    let idealAdjustmentFactor;
    let recommendedAdjustmentFactor;


     if(currentResolution === "UHD" && targetResolution === "HD" && currentEncoding === "h265" && targetEncoding === "h265"){
       idealAdjustmentFactor = 0.25;
      recommendedAdjustmentFactor = 0.3;
     }else if (currentResolution === "UHD" && targetResolution === "UHD" && currentEncoding === "h264" && targetEncoding === "h265"){
        idealAdjustmentFactor = 0.5;
        recommendedAdjustmentFactor = 0.6;
     } else if (currentResolution === "UHD" && targetResolution === "UHD" && currentEncoding === "h264" && targetEncoding === "av1"){
        idealAdjustmentFactor = 0.4;
       recommendedAdjustmentFactor = 0.5;
      } else if (currentResolution === "UHD" && targetResolution === "HD" && currentEncoding === "h264" && targetEncoding === "h265"){
        idealAdjustmentFactor = 0.15;
       recommendedAdjustmentFactor = 0.20;
      }else if (currentResolution === "UHD" && targetResolution === "HD" && currentEncoding === "h264" && targetEncoding === "av1"){
        idealAdjustmentFactor = 0.10;
        recommendedAdjustmentFactor = 0.15
      }else if (currentResolution === "HD" && targetResolution === "HD" && currentEncoding === "h264" && targetEncoding === "h265"){
       idealAdjustmentFactor = 0.5;
      recommendedAdjustmentFactor = 0.6;
      }else if (currentResolution === "HD" && targetResolution === "HD" && currentEncoding === "h264" && targetEncoding === "av1"){
        idealAdjustmentFactor = 0.4;
        recommendedAdjustmentFactor = 0.5;
      } else{
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