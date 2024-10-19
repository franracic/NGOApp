import React, { useEffect } from "react";

interface PdfViewerProps {
  title: string;
  url?: string;
  onComplete: () => void;
  completeAfterSeconds?: number;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  title,
  url,
  onComplete,
  completeAfterSeconds = 10,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, completeAfterSeconds * 1000);

    return () => clearTimeout(timer);
  }, [onComplete, completeAfterSeconds]);

  return <iframe src={url} width="100%" height="480px" title={title}></iframe>;
};
