import React from 'react';
import SubmitButton from '@/components/common/SubmitButton';

interface DownloadButtonsProps {
  onDownloadImage: () => void;
  onDownloadVideo: () => void;
}

export default function DownloadButtons({
  onDownloadImage,
  onDownloadVideo,
}: DownloadButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
      <SubmitButton onClick={onDownloadImage} className="w-full sm:w-auto">
        Download image
      </SubmitButton>
      <SubmitButton onClick={onDownloadVideo} className="w-full sm:w-auto">
        Download video
      </SubmitButton>
    </div>
  );
}
