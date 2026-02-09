
import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  onPhotoUpload: (photo: string) => void;
  onUrlChange: (url: string) => void;
  currentPhoto: string;
  currentUrl?: string;
}

const MAX_FILE_SIZE_KB = 500;
const MAX_PIXELS = 2500; 

const ImageUploader: React.FC<ImageUploaderProps> = ({ onPhotoUpload, onUrlChange, currentPhoto, currentUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) return;

    // 1. Validação de Tamanho (KB) - Resolve o erro de arquivos gigantes
    const fileSizeKB = file.size / 1024;
    if (fileSizeKB > MAX_FILE_SIZE_KB) {
      setError(`ARQUIVO REJEITADO: A foto tem ${fileSizeKB.toFixed(0)}KB. O limite máximo é de ${MAX_FILE_SIZE_KB}KB. Reduza o tamanho da imagem.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result !== 'string') return;
      
      const img = new Image();
      img.onerror = () => {
        setError("Erro: Arquivo inválido ou corrompido.");
      };
      
      img.onload = () => {
        // 2. Validação de Resolução
        if (img.width > MAX_PIXELS || img.height > MAX_PIXELS) {
          setError(`RESOLUÇÃO MUITO ALTA: ${img.width}x${img.height}px. O máximo é ${MAX_PIXELS}px.`);
          if (fileInputRef.current) fileInputRef.current.value = '';
          return;
        }

        const targetSize = 92;
        const borderRadius = 8;
        const canvas = document.createElement('canvas');
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          onPhotoUpload(img.src);
          return;
        }
        
        // Desenha com cantos arredondados no Canvas
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
        ctx.clip();

        const sourceSize = Math.min(img.width, img.height);
        const sourceX = (img.width - sourceSize) / 2;
        const sourceY = (img.height - sourceSize) / 2;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetSize, targetSize);

        ctx.drawImage(img, sourceX, sourceY, sourceSize, sourceSize, 0, 0, targetSize, targetSize);

        // OTIMIZAÇÃO: JPEG qualidade 0.7 é muito mais leve que PNG
        const resizedImageDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        onPhotoUpload(resizedImageDataUrl);
        onUrlChange('');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">URL da Foto</label>
        <input
          type="text"
          value={currentUrl || ''}
          onChange={(e) => {
            setError(null);
            onUrlChange(e.target.value);
          }}
          placeholder="https://exemplo.com/suafoto.jpg"
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#203864] focus:outline-none"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={currentUrl || currentPhoto}
            alt="Preview"
            width="92"
            height="92"
            className="w-[92px] h-[92px] object-cover rounded-lg border-2 border-white shadow-sm"
          />
        </div>
        <div className="flex-grow">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`w-full px-4 py-2 rounded-lg text-sm font-bold transition-all ${error ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-[#203864] text-white hover:bg-[#1a2d52]'}`}
          >
            {error ? 'ERRO NO ARQUIVO' : 'SUBIR FOTO'}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg"
          />
          <p className="text-[10px] text-gray-400 mt-1 font-medium">Máx: 500KB</p>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-600 text-white rounded-lg shadow-lg text-[11px] font-bold animate-pulse">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
