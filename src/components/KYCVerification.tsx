import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, Upload, Check, AlertCircle } from 'lucide-react';
import { useKYCStore } from '../services/kyc';

export default function KYCVerification() {
  const webcamRef = useRef<Webcam>(null);
  const [step, setStep] = useState<'id' | 'selfie' | 'documents'>('id');
  const [idImage, setIdImage] = useState<string | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const { verifyIdentity, verifyDocuments, status, isLoading, error } = useKYCStore();

  const captureId = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setIdImage(imageSrc);
      setStep('selfie');
    }
  };

  const captureSelfie = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc && idImage) {
      setSelfieImage(imageSrc);
      await verifyIdentity(idImage, imageSrc);
      setStep('documents');
    }
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await verifyDocuments(files);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">التحقق من الهوية</h2>
        <p className="text-gray-600">يرجى اتباع الخطوات التالية لإكمال عملية التحقق</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-8">
        {step === 'id' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">التقط صورة للهوية الوطنية</h3>
            <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <button
              onClick={captureId}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
            >
              <Camera className="h-5 w-5" />
              <span>التقط صورة</span>
            </button>
          </div>
        )}

        {step === 'selfie' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">التقط صورة شخصية</h3>
            <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <button
              onClick={captureSelfie}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
            >
              <Camera className="h-5 w-5" />
              <span>التقط صورة</span>
            </button>
          </div>
        )}

        {step === 'documents' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">رفع المستندات المطلوبة</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-500 mb-4">
                  اسحب وأفلت المستندات هنا أو اضغط للاختيار
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleDocumentUpload}
                  className="hidden"
                  id="document-upload"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="document-upload"
                  className="inline-flex items-center justify-center px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  اختر الملفات
                </label>
              </div>
            </div>
          </div>
        )}

        {status === 'verified' && (
          <div className="p-4 bg-green-50 rounded-lg flex items-center gap-2 text-green-700">
            <Check className="h-5 w-5" />
            <p>تم التحقق بنجاح</p>
          </div>
        )}
      </div>
    </div>
  );
}