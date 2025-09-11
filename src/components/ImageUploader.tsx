import React, { useRef } from 'react';

interface ImageUploaderProps {
  onPhotoUpload: (photo: string) => void;
  currentPhoto: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onPhotoUpload, currentPhoto }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result !== 'string') {
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        const targetSize = 92; // The desired fixed size for the signature photo
        const borderRadius = 8; // The radius for the corners
        const canvas = document.createElement('canvas');
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          // Fallback to original if canvas is not supported for some reason
          onPhotoUpload(img.src);
          return;
        }
        
        // Create a rounded rectangle path to clip the image
        ctx.beginPath();
        ctx.moveTo(borderRadius, 0);
        ctx.lineTo(targetSize - borderRadius, 0);
        ctx.quadraticCurveTo(targetSize, 0, targetSize, borderRadius);
        ctx.lineTo(targetSize, targetSize - borderRadius);
        ctx.quadraticCurveTo(targetSize, targetSize, targetSize - borderRadius, targetSize);
        ctx.lineTo(borderRadius, targetSize);
        ctx.quadraticCurveTo(0, targetSize, 0, targetSize - borderRadius);
        ctx.lineTo(0, borderRadius);
        ctx.quadraticCurveTo(0, 0, borderRadius, 0);
        ctx.closePath();
        
        // Clip to the path, so anything drawn next will be constrained to this shape
        ctx.clip();

        // Calculate cropping dimensions to make the source image a square, centered
        const sourceSize = Math.min(img.width, img.height);
        const sourceX = (img.width - sourceSize) / 2;
        const sourceY = (img.height - sourceSize) / 2;

        // Draw the cropped and resized image onto the canvas
        ctx.drawImage(
          img,
          sourceX,
          sourceY,
          sourceSize,
          sourceSize,
          0,
          0,
          targetSize,
          targetSize
        );

        // Get the resized image as a PNG data URL, which now has rounded corners baked in
        const resizedImageDataUrl = canvas.toDataURL('image/png');
        onPhotoUpload(resizedImageDataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Sua Foto</label>
      <div className="mt-1 flex items-center space-x-4">
        <img
          src={currentPhoto}
          alt="Preview"
          className="w-[92px] h-[92px] object-cover rounded-lg"
        />
        <button
          type="button"
          onClick={handleClick}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Alterar Foto
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/gif"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
