export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user' | 'borrower';
  status: 'active' | 'inactive';
  password?: string; // Added password as optional
  kycStatus?: 'pending' | 'verified' | 'rejected';
  kycDate?: string;
  photoUrl?: string;
  investorType?: 'basic' | 'qualified';
  borrowerType?: 'company' | 'establishment';
  permissions?: string[];
  companyInfo?: {
    registrationNumber: string;
    address: string;
    phone: string;
  };
  bankInfo?: {
    bankName: string;
    accountName: string;
    iban: string;
    swift: string;
    verified: boolean;
    verificationDate?: string;
  };
  documents?: {
    id: string;
    title: string;
    type: string;
    size: string;
    status: 'pending' | 'verified' | 'rejected';
    uploadedAt: string;
  }[];
}