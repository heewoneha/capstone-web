import React from 'react';
import SubmitButton from '@/components/common/SubmitButton';

interface DownloadButtonsProps {
  onDownloadImage: () => void;
  onDownloadVideo: () => void;
}

export default function DownloadButtons({ onDownloadImage, onDownloadVideo }: DownloadButtonsProps) {
  return (
    <div className="flex gap-4 items-center">
      <SubmitButton onClick={onDownloadImage}>
        Download image
      </SubmitButton>
      <SubmitButton onClick={onDownloadVideo}>
        Download video
      </SubmitButton>
    </div>
  );
} 