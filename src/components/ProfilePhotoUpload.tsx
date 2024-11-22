import React, { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { useAuthStore } from '../services/auth';

interface ProfilePhotoUploadProps {
  currentPhotoUrl?: string | null;
  onUpload: (file: File) => Promise<void>;
  readOnly?: boolean;
}

export default function ProfilePhotoUpload({ 
  currentPhotoUrl, 
  onUpload,
  readOnly = false 
}: ProfilePhotoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();

  React.useEffect(() => {
    if (currentPhotoUrl) {
      setPreviewUrl(currentPhotoUrl);
    }
  }, [currentPhotoUrl]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('يرجى اختيار صورة صالحة');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('حجم الصورة يجب أن لا يتجاوز 5 ميجابايت');
      return;
    }

    try {
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      await onUpload(file);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('حدث خطأ أثناء رفع الصورة');
      setPreviewUrl(currentPhotoUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    if (readOnly) return;
    
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative w-32 h-32 mx-auto">
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
            {!readOnly && (
              <button
                onClick={handleRemovePhoto}
                className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </>
        ) : (
          <div className="w-full h-full rounded-full bg-[#2B227C]/10 flex items-center justify-center">
            <span className="text-[#2B227C] text-4xl font-medium">
              {user?.name?.[0]}
            </span>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {!readOnly && (
        <div className="flex flex-col items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profile-photo-input"
          />
          
          <label
            htmlFor="profile-photo-input"
            className="flex items-center gap-2 px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648] cursor-pointer"
          >
            {previewUrl ? (
              <>
                <Camera className="h-5 w-5" />
                <span>تغيير الصورة</span>
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                <span>رفع صورة</span>
              </>
            )}
          </label>
          
          <p className="text-sm text-gray-500">
            يمكنك رفع صورة بحجم أقصى 5 ميجابايت
          </p>
        </div>
      )}
    </div>
  );
}