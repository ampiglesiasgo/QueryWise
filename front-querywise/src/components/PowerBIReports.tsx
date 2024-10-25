import React from 'react';

interface PowerBIReportProps {
  embedUrl: string;
  width?: string; // Puedes hacer estos valores configurables si lo deseas
  height?: string;
}

const PowerBIReport: React.FC<PowerBIReportProps> = ({ embedUrl, width = "100%", height = "600px" }) => {
  return (
    <div style={{ width, height }}>
      <iframe
        title="Power BI Report"
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default PowerBIReport;
