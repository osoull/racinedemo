import { create } from 'zustand';
import * as faceapi from 'face-api.js';
import { createWorker } from 'tesseract.js';

interface KYCState {
  status: 'pending' | 'verified' | 'rejected' | null;
  isLoading: boolean;
  error: string | null;
  verifyIdentity: (idImage: string, selfieImage: string) => Promise<void>;
  verifyDocuments: (documents: File[]) => Promise<void>;
  reset: () => void;
}

export const useKYCStore = create<KYCState>((set) => ({
  status: null,
  isLoading: false,
  error: null,

  verifyIdentity: async (idImage: string, selfieImage: string) => {
    set({ isLoading: true, error: null });
    try {
      // Load face-api models
      await Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
      ]);

      // Create Tesseract worker for OCR
      const worker = await createWorker('ara');

      // Perform ID OCR
      const { data: { text } } = await worker.recognize(idImage);
      
      // Validate ID number format
      const hasValidIdNumber = /\d{10}/.test(text);

      if (!hasValidIdNumber) {
        throw new Error('رقم الهوية غير صالح');
      }

      // Face detection and matching
      const idFaceDetection = await faceapi.detectSingleFace(idImage)
        .withFaceLandmarks()
        .withFaceDescriptor();

      const selfieFaceDetection = await faceapi.detectSingleFace(selfieImage)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!idFaceDetection || !selfieFaceDetection) {
        throw new Error('لم يتم التعرف على الوجه في إحدى الصور');
      }

      // Compare faces
      const distance = faceapi.euclideanDistance(
        idFaceDetection.descriptor,
        selfieFaceDetection.descriptor
      );

      const isMatch = distance < 0.6; // Threshold for face matching

      if (!isMatch) {
        throw new Error('الصور غير متطابقة');
      }

      set({ status: 'verified' });
      await worker.terminate();

    } catch (error: any) {
      set({ error: error.message, status: 'rejected' });
    } finally {
      set({ isLoading: false });
    }
  },

  verifyDocuments: async (documents: File[]) => {
    set({ isLoading: true, error: null });
    try {
      // Document verification logic here
      // This could include checking file types, sizes, and content
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      for (const doc of documents) {
        if (!allowedTypes.includes(doc.type)) {
          throw new Error('نوع الملف غير مدعوم');
        }
        if (doc.size > maxSize) {
          throw new Error('حجم الملف كبير جداً');
        }
      }

      // Here you would typically upload these documents to your backend
      // and perform additional verification

      set({ status: 'verified' });
    } catch (error: any) {
      set({ error: error.message, status: 'rejected' });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ status: null, error: null, isLoading: false });
  }
}));