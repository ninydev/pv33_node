'use client';

import { useState } from 'react';
import { removeBackgroundAction } from '../actions/removeBackgroundAction';

export const XimilarUploader = () => {
  const [loading, setLoading] = useState(false);
  const [resultImg, setResultImg] = useState('');
  const [error, setError] = useState('');
  const [originalImg, setOriginalImg] = useState('');

  const processImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');
    setResultImg('');
    
    // Show original image
    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImg(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('image', file);

    const result = await removeBackgroundAction(formData);

    if (result.success && result.imageUrl) {
      setResultImg(result.imageUrl);
    } else {
      setError(result.error || 'Failed to process image');
    }
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
      <h3 className="text-xl font-bold">Удаление фона (Ximilar)</h3>
      
      <div className="flex flex-col gap-2">
        <label className="font-medium">Выберите фото:</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={processImage} 
          disabled={loading}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer disabled:opacity-50"
        />
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-blue-600">
          <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
          <p>Нейронка работает...</p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {originalImg && (
          <div className="flex flex-col gap-2">
            <p className="font-medium text-center">Оригинал:</p>
            <div className="relative aspect-square border rounded overflow-hidden bg-gray-50">
              <img src={originalImg} alt="Original" className="object-contain w-full h-full" />
            </div>
          </div>
        )}

        {resultImg && (
          <div className="flex flex-col gap-2">
            <p className="font-medium text-center">Результат:</p>
            <div className="relative aspect-square border rounded overflow-hidden bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAACBJREFUGFdjZEADDAwM/8ECIAYTAInBBECSRBaAZMAYMAAAnOQQA6H96fAAAAAASUVORK5CYII=')] bg-repeat">
              <img src={resultImg} alt="No background" className="object-contain w-full h-full" />
            </div>
            <a 
              href={resultImg} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-center text-blue-600 hover:underline text-sm"
            >
              Открыть в полном размере
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
