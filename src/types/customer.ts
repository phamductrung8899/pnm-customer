export interface AttachedFile {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
  size?: string;
}

export interface Representative {
  fullName: string;
  position: string;
  idNumber: string;
  idIssuedDate: string;
  idIssuedPlace: string;
}

export interface CustomerGeneral {
  companyName: string;
  customerId: string;
  businessType: string;
  establishedDate: string;
  nationality: string;
  address: string;
}

export interface CustomerLegal {
  businessLicenseNo: string;
  licenseIssuedDate: string;
  licenseIssuedPlace: string;
  taxCode: string;
  registeredAddress: string;
  representative: Representative;
  representativeDocuments: AttachedFile[];
  authorizationDocuments: AttachedFile[];
}

export interface ContactAddress {
  address: string;
  phone: string;
  email: string;
  contactPerson: string;
}

export interface ServiceTerms {
  serviceScope: string;
  securityTermsUrl: string;
  dataProcessingTermsUrl: string;
}

export interface PaymentInfo {
  companyName: string;
  taxCode: string;
  invoiceAddress: string;
  invoiceEmail: string;
  billingCycle: string;
  paymentMethod: string;
}

export type OnboardingStatus = 'completed' | 'in_progress' | 'pending';
export type SubscriptionStatus = 'active' | 'suspended' | 'inactive';

export interface CustomerData {
  general: CustomerGeneral;
  legal: CustomerLegal;
  contact: ContactAddress;
  serviceTerms: ServiceTerms;
  serviceContracts: AttachedFile[];
  numberContracts: AttachedFile[];
  payment: PaymentInfo;
  onboardingStatus: OnboardingStatus;
  subscriptionStatus: SubscriptionStatus;
}

// Report types
export interface DailyCallData {
  date: string;
  inbound: number;
  outbound: number;
  total: number;
}

export interface MonthlyCallData {
  month: string;
  inbound: number;
  outbound: number;
  total: number;
}

export interface NumberTrafficDetail {
  phoneNumber: string;
  originalNumber: string;
  inboundCalls: number;
  outboundCalls: number;
  totalMinutes: number;
  successRate: number;
}

export interface RevenueComponent {
  name: string;
  amount: number;
  color: string;
}

export interface MonthlyRevenue {
  month: string;
  rental: number;
  calls: number;
  sms: number;
  maintenance: number;
  total: number;
}

export interface NumberCostDetail {
  phoneNumber: string;
  rental: number;
  calls: number;
  sms: number;
  maintenance: number;
  total: number;
}

// Ticket types
export type TicketCategory =
  | 'legal_update'
  | 'plan_update'
  | 'number_request'
  | 'error_complaint';

export type TicketStatus =
  | 'pending'
  | 'received'
  | 'resolved'
  | 'closed';

export interface TicketReply {
  id: string;
  sender: 'customer' | 'support';
  content: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  category: TicketCategory;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  attachments: string[];
  replies: TicketReply[];
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  kpiDeadline?: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}
