import type {
  CustomerProfile,
  DailyCallData,
  MonthlyCallData,
  NumberTrafficDetail,
  RevenueComponent,
  MonthlyRevenue,
  NumberCostDetail,
  Ticket,
  FAQItem,
} from '@/types/customer';

export const mockCustomer: CustomerProfile = {
  id: 'CUST-001',
  companyName: 'Công ty TNHH ABC Solutions',
  taxCode: '0123456789',
  representativeName: 'Nguyễn Văn An',
  email: 'contact@abcsolutions.vn',
  phone: '0901234567',
  address: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
  contractNumber: 'HD-2024-0456',
  contractDate: '2024-01-15',
  packageName: 'Enterprise Plus',
  phoneNumbers: [
    { id: '1', originalNumber: '02871001001', maskedNumber: '1900xxxx01', status: 'active', assignedDate: '2024-01-15', monthlyFee: 500000 },
    { id: '2', originalNumber: '02871001002', maskedNumber: '1900xxxx02', status: 'active', assignedDate: '2024-02-01', monthlyFee: 500000 },
    { id: '3', originalNumber: '02871001003', maskedNumber: '1900xxxx03', status: 'active', assignedDate: '2024-03-10', monthlyFee: 500000 },
    { id: '4', originalNumber: '02871001004', maskedNumber: '1900xxxx04', status: 'inactive', assignedDate: '2024-04-01', monthlyFee: 500000 },
    { id: '5', originalNumber: '02871001005', maskedNumber: '1900xxxx05', status: 'active', assignedDate: '2024-05-15', monthlyFee: 500000 },
  ],
};

export const mockDailyCallData: DailyCallData[] = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}/03`,
  inbound: Math.floor(Math.random() * 150) + 50,
  outbound: Math.floor(Math.random() * 100) + 30,
  total: 0,
})).map(d => ({ ...d, total: d.inbound + d.outbound }));

export const mockMonthlyCallData: MonthlyCallData[] = [
  { month: '10/2024', inbound: 3200, outbound: 2100, total: 5300 },
  { month: '11/2024', inbound: 3500, outbound: 2300, total: 5800 },
  { month: '12/2024', inbound: 3800, outbound: 2500, total: 6300 },
  { month: '01/2025', inbound: 3100, outbound: 2000, total: 5100 },
  { month: '02/2025', inbound: 3400, outbound: 2200, total: 5600 },
  { month: '03/2025', inbound: 3900, outbound: 2600, total: 6500 },
];

export const mockNumberTraffic: NumberTrafficDetail[] = [
  { phoneNumber: '1900xxxx01', originalNumber: '02871001001', inboundCalls: 1250, outboundCalls: 830, totalMinutes: 4520, successRate: 94.2 },
  { phoneNumber: '1900xxxx02', originalNumber: '02871001002', inboundCalls: 980, outboundCalls: 650, totalMinutes: 3200, successRate: 92.8 },
  { phoneNumber: '1900xxxx03', originalNumber: '02871001003', inboundCalls: 870, outboundCalls: 520, totalMinutes: 2890, successRate: 95.1 },
  { phoneNumber: '1900xxxx04', originalNumber: '02871001004', inboundCalls: 0, outboundCalls: 0, totalMinutes: 0, successRate: 0 },
  { phoneNumber: '1900xxxx05', originalNumber: '02871001005', inboundCalls: 800, outboundCalls: 600, totalMinutes: 2710, successRate: 93.5 },
];

export const mockRevenueComponents: RevenueComponent[] = [
  { name: 'Phí thuê số', amount: 2500000, color: 'hsl(0, 72%, 51%)' },
  { name: 'Phí cuộc gọi', amount: 4800000, color: 'hsl(0, 72%, 65%)' },
  { name: 'Phí SMS', amount: 1200000, color: 'hsl(0, 40%, 45%)' },
  { name: 'Phí duy trì', amount: 800000, color: 'hsl(0, 20%, 70%)' },
];

export const mockMonthlyRevenue: MonthlyRevenue[] = [
  { month: '10/2024', rental: 2500000, calls: 4200000, sms: 1100000, maintenance: 800000, total: 8600000 },
  { month: '11/2024', rental: 2500000, calls: 4500000, sms: 1150000, maintenance: 800000, total: 8950000 },
  { month: '12/2024', rental: 2500000, calls: 4800000, sms: 1200000, maintenance: 800000, total: 9300000 },
  { month: '01/2025', rental: 2500000, calls: 4100000, sms: 1050000, maintenance: 800000, total: 8450000 },
  { month: '02/2025', rental: 2500000, calls: 4400000, sms: 1100000, maintenance: 800000, total: 8800000 },
  { month: '03/2025', rental: 2500000, calls: 4800000, sms: 1200000, maintenance: 800000, total: 9300000 },
];

export const mockNumberCosts: NumberCostDetail[] = [
  { phoneNumber: '1900xxxx01', rental: 500000, calls: 1500000, sms: 350000, maintenance: 160000, total: 2510000 },
  { phoneNumber: '1900xxxx02', rental: 500000, calls: 1200000, sms: 280000, maintenance: 160000, total: 2140000 },
  { phoneNumber: '1900xxxx03', rental: 500000, calls: 1050000, sms: 250000, maintenance: 160000, total: 1960000 },
  { phoneNumber: '1900xxxx04', rental: 500000, calls: 0, sms: 0, maintenance: 160000, total: 660000 },
  { phoneNumber: '1900xxxx05', rental: 500000, calls: 1050000, sms: 320000, maintenance: 160000, total: 2030000 },
];

export const mockTickets: Ticket[] = [
  {
    id: 'TK-2025-001',
    category: 'legal_update',
    title: 'Cập nhật giấy phép kinh doanh mới',
    description: 'Công ty vừa gia hạn giấy phép kinh doanh, cần cập nhật lại thông tin pháp lý trên hệ thống.',
    status: 'resolved',
    createdAt: '2025-02-15T09:30:00',
    updatedAt: '2025-02-18T14:00:00',
    attachments: ['giay_phep_kd_2025.pdf'],
    replies: [
      { id: 'r1', sender: 'support', content: 'Chúng tôi đã nhận được yêu cầu. Đang xác minh tài liệu.', timestamp: '2025-02-15T10:00:00' },
      { id: 'r2', sender: 'support', content: 'Thông tin đã được cập nhật thành công.', timestamp: '2025-02-18T14:00:00' },
    ],
  },
  {
    id: 'TK-2025-002',
    category: 'number_request',
    title: 'Yêu cầu bổ sung 3 số điện thoại mới',
    description: 'Do mở rộng hoạt động, chúng tôi cần bổ sung thêm 3 số điện thoại masking cho chi nhánh Hà Nội.',
    status: 'received',
    createdAt: '2025-03-01T11:00:00',
    updatedAt: '2025-03-02T08:30:00',
    attachments: [],
    replies: [
      { id: 'r3', sender: 'support', content: 'Yêu cầu đã được tiếp nhận. Đội ngũ kỹ thuật sẽ xử lý trong 2-3 ngày làm việc.', timestamp: '2025-03-02T08:30:00' },
    ],
  },
  {
    id: 'TK-2025-003',
    category: 'error_complaint',
    title: 'Lỗi không kết nối được cuộc gọi trên số 1900xxxx03',
    description: 'Từ sáng nay, số 1900xxxx03 không thể nhận cuộc gọi. Các số khác hoạt động bình thường.',
    status: 'pending',
    createdAt: '2025-03-10T07:45:00',
    updatedAt: '2025-03-10T07:45:00',
    attachments: ['log_error_screenshot.png'],
    replies: [],
  },
  {
    id: 'TK-2025-004',
    category: 'plan_update',
    title: 'Nâng cấp gói cước lên Premium',
    description: 'Chúng tôi muốn nâng cấp từ gói Enterprise Plus lên Premium để có thêm tính năng ghi âm cuộc gọi.',
    status: 'closed',
    createdAt: '2025-01-20T14:00:00',
    updatedAt: '2025-01-25T16:30:00',
    attachments: [],
    replies: [
      { id: 'r4', sender: 'support', content: 'Yêu cầu nâng cấp đã được xử lý. Gói mới sẽ có hiệu lực từ 01/02/2025.', timestamp: '2025-01-23T10:00:00' },
      { id: 'r5', sender: 'customer', content: 'Cảm ơn, tôi đã xác nhận thông tin gói mới.', timestamp: '2025-01-24T09:00:00' },
      { id: 'r6', sender: 'support', content: 'Ticket đã được đóng. Cảm ơn quý khách.', timestamp: '2025-01-25T16:30:00' },
    ],
  },
];

export const mockFAQs: FAQItem[] = [
  { id: 'faq-1', category: 'Tài khoản', question: 'Làm thế nào để thay đổi thông tin người đại diện?', answer: 'Quý khách tạo ticket loại "Cập nhật thông tin tài liệu pháp lý" và đính kèm quyết định bổ nhiệm người đại diện mới. Đội ngũ hỗ trợ sẽ xác minh và cập nhật trong 1-2 ngày làm việc.' },
  { id: 'faq-2', category: 'Tài khoản', question: 'Tôi quên mật khẩu đăng nhập, làm sao để lấy lại?', answer: 'Nhấn vào "Quên mật khẩu" tại trang đăng nhập, nhập email đã đăng ký. Hệ thống sẽ gửi link đặt lại mật khẩu trong vòng 5 phút.' },
  { id: 'faq-3', category: 'Cước phí', question: 'Cước phí được tính như thế nào?', answer: 'Cước phí bao gồm: Phí thuê số (cố định/tháng), phí cuộc gọi (theo phút), phí SMS (theo tin nhắn), và phí duy trì hệ thống. Chi tiết xem tại trang Báo cáo.' },
  { id: 'faq-4', category: 'Cước phí', question: 'Khi nào tôi nhận được hóa đơn hàng tháng?', answer: 'Hóa đơn được phát hành vào ngày 5 hàng tháng cho kỳ thanh toán tháng trước. Quý khách sẽ nhận email thông báo kèm file hóa đơn.' },
  { id: 'faq-5', category: 'Kỹ thuật', question: 'Cuộc gọi bị ngắt giữa chừng, nguyên nhân và cách xử lý?', answer: 'Nguyên nhân có thể do: mạng viễn thông không ổn định, vượt quá dung lượng gói cước. Hãy kiểm tra trạng thái số trên portal, nếu vẫn lỗi hãy tạo ticket "Báo lỗi" kèm thời gian xảy ra.' },
  { id: 'faq-6', category: 'Kỹ thuật', question: 'Tôi có thể thiết lập chuyển tiếp cuộc gọi không?', answer: 'Có, tính năng chuyển tiếp cuộc gọi khả dụng cho gói Premium trở lên. Quý khách cấu hình tại mục Quản lý số điện thoại hoặc liên hệ hỗ trợ kỹ thuật.' },
  { id: 'faq-7', category: 'Số điện thoại', question: 'Làm thế nào để yêu cầu thêm số mới?', answer: 'Tạo ticket loại "Yêu cầu bổ sung hoặc thu hồi số điện thoại", nêu rõ số lượng cần thêm và khu vực sử dụng. Thời gian xử lý 2-3 ngày làm việc.' },
  { id: 'faq-8', category: 'Số điện thoại', question: 'Tôi muốn thu hồi số không sử dụng, quy trình như thế nào?', answer: 'Tạo ticket loại "Yêu cầu bổ sung hoặc thu hồi số điện thoại", liệt kê các số cần thu hồi. Sau khi xác nhận, phí thuê số sẽ không tính từ tháng tiếp theo.' },
];

export const ticketCategoryLabels: Record<string, string> = {
  legal_update: 'Cập nhật tài liệu pháp lý',
  plan_update: 'Cập nhật gói cước',
  number_request: 'Bổ sung / Thu hồi số',
  error_complaint: 'Báo lỗi / Khiếu nại',
};

export const ticketStatusLabels: Record<string, string> = {
  pending: 'Chưa tiếp nhận',
  received: 'Đã tiếp nhận',
  resolved: 'Đã xử lý',
  closed: 'Đã đóng',
};

export const ticketStatusColors: Record<string, string> = {
  pending: 'bg-muted text-muted-foreground',
  received: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-800 text-gray-100',
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
