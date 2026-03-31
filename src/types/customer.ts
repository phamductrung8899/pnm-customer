export interface PhoneNumber {
  id: string;
  originalNumber: string;
  maskedNumber: string;
  status: 'active' | 'inactive' | 'pending';
  assignedDate: string;
  monthlyFee: number;
}

export interface CustomerProfile {
  id: string;
  companyName: string;
  taxCode: string;
  representativeName: string;
  email: string;
  phone: string;
  address: string;
  contractNumber: string;
  contractDate: string;
  packageName: string;
  phoneNumbers: PhoneNumber[];
}

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
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}
