import type { CustomerData, Ticket, ServiceProfile } from '@/types/customer';

export interface AdminCustomer {
  id: string;
  name: string;
  phone: string;
  data: CustomerData;
}

const serviceProfilesABC: ServiceProfile[] = [
  {
    id: 'sp-001',
    name: 'Hồ sơ TMĐT - AX',
    serviceModel: 'AX',
    phoneNumbers: ['1900xxxx01', '1900xxxx02', '1900xxxx03'],
    dailyCallLimit: 200,
    apiKeys: [
      { id: 'ak-1', key: 'pk_live_abc123456789', createdAt: '01/06/2024', status: 'active' },
      { id: 'ak-2', key: 'pk_live_abc987654321', createdAt: '15/08/2024', status: 'active' },
    ],
    logRetentionDays: 90,
  },
  {
    id: 'sp-002',
    name: 'Hồ sơ Giao hàng - AXB',
    serviceModel: 'AXB',
    phoneNumbers: ['1900xxxx04', '1900xxxx05'],
    dailyCallLimit: 150,
    apiKeys: [
      { id: 'ak-3', key: 'pk_live_def456789012', createdAt: '01/09/2024', status: 'active' },
    ],
    logRetentionDays: 60,
  },
];

const serviceProfilesXYZ: ServiceProfile[] = [
  {
    id: 'sp-003',
    name: 'Hồ sơ Vận tải - AXB',
    serviceModel: 'AXB',
    phoneNumbers: ['1900xxxx10', '1900xxxx11'],
    dailyCallLimit: 200,
    apiKeys: [
      { id: 'ak-4', key: 'pk_live_xyz111222333', createdAt: '01/09/2024', status: 'active' },
    ],
    logRetentionDays: 30,
  },
];

const serviceProfilesDEF: ServiceProfile[] = [
  {
    id: 'sp-004',
    name: 'Hồ sơ BĐS - AX',
    serviceModel: 'AX',
    phoneNumbers: ['1900xxxx20'],
    dailyCallLimit: 100,
    apiKeys: [
      { id: 'ak-5', key: 'pk_live_def999888777', createdAt: '15/12/2024', status: 'active' },
    ],
    logRetentionDays: 90,
  },
];

export const mockAdminCustomers: AdminCustomer[] = [
  {
    id: 'KH-2024-00158',
    name: 'Công ty CP Công nghệ ABC',
    phone: '0912345678',
    data: {
      general: {
        companyName: 'Công ty CP Công nghệ ABC',
        customerId: 'KH-2024-00158',
        businessType: 'Công ty Cổ phần',
        establishedDate: '15/03/2018',
        nationality: 'Việt Nam',
        address: 'Tầng 12, Tòa nhà Landmark, 72 Nguyễn Trãi, Thanh Xuân, Hà Nội',
      },
      legal: {
        businessLicenseNo: '0108456789',
        licenseIssuedDate: '20/03/2018',
        licenseIssuedPlace: 'Sở KH&ĐT Thành phố Hà Nội',
        taxCode: '0108456789',
        registeredAddress: 'Tầng 12, Tòa nhà Landmark, 72 Nguyễn Trãi, Thanh Xuân, Hà Nội',
        representative: {
          fullName: 'Nguyễn Văn An',
          position: 'Giám đốc điều hành',
          idNumber: '001099012345',
          idIssuedDate: '10/05/2020',
          idIssuedPlace: 'Cục Cảnh sát QLHC về TTXH',
        },
        representativeDocuments: [
          { id: '1', name: 'CCCD_NguyenVanAn.pdf', url: '#', uploadedAt: '01/06/2024', size: '2.1 MB' },
        ],
        authorizationDocuments: [
          { id: '2', name: 'GiayUyQuyen_2024.pdf', url: '#', uploadedAt: '01/06/2024', size: '1.5 MB' },
        ],
      },
      contact: { address: 'Tầng 12, Tòa nhà Landmark, 72 Nguyễn Trãi, Thanh Xuân, Hà Nội', phone: '024 3999 8888', email: 'contact@abctech.vn', contactPerson: 'Trần Thị Bích Ngọc' },
      serviceTerms: { serviceScope: 'Dịch vụ Phone Number Masking — Cuộc gọi ẩn danh cho nền tảng TMĐT', securityTermsUrl: 'https://example.com/dieu-khoan-bao-mat', dataProcessingTermsUrl: 'https://example.com/xu-ly-dlcn' },
      serviceContracts: [
        { id: '3', name: 'HopDong_DichVu_2024.pdf', url: '#', uploadedAt: '15/06/2024', size: '3.2 MB' },
        { id: '4', name: 'PhuLuc_HopDong_01.pdf', url: '#', uploadedAt: '20/06/2024', size: '1.1 MB' },
      ],
      numberContracts: [
        { id: '5', name: 'HopDong_DauSo_2024.pdf', url: '#', uploadedAt: '15/06/2024', size: '2.8 MB' },
      ],
      payment: { companyName: 'Công ty CP Công nghệ ABC', taxCode: '0108456789', invoiceAddress: 'Tầng 12, Tòa nhà Landmark, 72 Nguyễn Trãi, Thanh Xuân, Hà Nội', invoiceEmail: 'ketoan@abctech.vn', billingCycle: 'Hàng tháng', paymentMethod: 'Chuyển khoản ngân hàng' },
      onboardingStatus: 'completed',
      subscriptionStatus: 'active',
      serviceProfiles: serviceProfilesABC,
    },
  },
  {
    id: 'KH-2024-00201',
    name: 'Công ty TNHH Vận tải XYZ',
    phone: '0987654321',
    data: {
      general: {
        companyName: 'Công ty TNHH Vận tải XYZ',
        customerId: 'KH-2024-00201',
        businessType: 'Công ty TNHH',
        establishedDate: '10/08/2020',
        nationality: 'Việt Nam',
        address: '123 Lê Lợi, Quận 1, TP. Hồ Chí Minh',
      },
      legal: {
        businessLicenseNo: '0315678901',
        licenseIssuedDate: '15/08/2020',
        licenseIssuedPlace: 'Sở KH&ĐT TP. Hồ Chí Minh',
        taxCode: '0315678901',
        registeredAddress: '123 Lê Lợi, Quận 1, TP. Hồ Chí Minh',
        representative: {
          fullName: 'Lê Hoàng Nam',
          position: 'Giám đốc',
          idNumber: '079099876543',
          idIssuedDate: '05/01/2021',
          idIssuedPlace: 'Cục Cảnh sát QLHC về TTXH',
        },
        representativeDocuments: [
          { id: '10', name: 'CCCD_LeHoangNam.pdf', url: '#', uploadedAt: '15/08/2024', size: '1.8 MB' },
        ],
        authorizationDocuments: [],
      },
      contact: { address: '123 Lê Lợi, Quận 1, TP. HCM', phone: '028 3888 7777', email: 'info@xyztransport.vn', contactPerson: 'Phạm Minh Tuấn' },
      serviceTerms: { serviceScope: 'Dịch vụ Phone Number Masking — Cuộc gọi ẩn danh cho vận tải', securityTermsUrl: 'https://example.com/bao-mat', dataProcessingTermsUrl: 'https://example.com/dlcn' },
      serviceContracts: [
        { id: '11', name: 'HopDong_XYZ_2024.pdf', url: '#', uploadedAt: '01/09/2024', size: '2.5 MB' },
      ],
      numberContracts: [
        { id: '12', name: 'HopDong_DauSo_XYZ.pdf', url: '#', uploadedAt: '01/09/2024', size: '2.0 MB' },
      ],
      payment: { companyName: 'Công ty TNHH Vận tải XYZ', taxCode: '0315678901', invoiceAddress: '123 Lê Lợi, Quận 1, TP. HCM', invoiceEmail: 'ketoan@xyztransport.vn', billingCycle: 'Hàng tháng', paymentMethod: 'Chuyển khoản ngân hàng' },
      onboardingStatus: 'completed',
      subscriptionStatus: 'active',
      serviceProfiles: serviceProfilesXYZ,
    },
  },
  {
    id: 'KH-2024-00315',
    name: 'Công ty CP Bất động sản DEF',
    phone: '0901122334',
    data: {
      general: {
        companyName: 'Công ty CP Bất động sản DEF',
        customerId: 'KH-2024-00315',
        businessType: 'Công ty Cổ phần',
        establishedDate: '22/11/2019',
        nationality: 'Việt Nam',
        address: 'Tầng 8, Tòa nhà Pearl Plaza, Điện Biên Phủ, Bình Thạnh, TP. HCM',
      },
      legal: {
        businessLicenseNo: '0316789012',
        licenseIssuedDate: '25/11/2019',
        licenseIssuedPlace: 'Sở KH&ĐT TP. Hồ Chí Minh',
        taxCode: '0316789012',
        registeredAddress: 'Tầng 8, Tòa nhà Pearl Plaza, Điện Biên Phủ, Bình Thạnh, TP. HCM',
        representative: {
          fullName: 'Trần Thanh Hải',
          position: 'Tổng giám đốc',
          idNumber: '079088765432',
          idIssuedDate: '12/03/2019',
          idIssuedPlace: 'Cục Cảnh sát QLHC về TTXH',
        },
        representativeDocuments: [
          { id: '20', name: 'CCCD_TranThanhHai.pdf', url: '#', uploadedAt: '01/12/2024', size: '2.0 MB' },
        ],
        authorizationDocuments: [
          { id: '21', name: 'UyQuyen_DEF_2024.pdf', url: '#', uploadedAt: '01/12/2024', size: '1.2 MB' },
        ],
      },
      contact: { address: 'Tầng 8, Tòa nhà Pearl Plaza, TP. HCM', phone: '028 3555 6666', email: 'info@defrealty.vn', contactPerson: 'Ngô Thị Hương' },
      serviceTerms: { serviceScope: 'Dịch vụ Phone Number Masking — Cuộc gọi ẩn danh cho BĐS', securityTermsUrl: 'https://example.com/bao-mat', dataProcessingTermsUrl: 'https://example.com/dlcn' },
      serviceContracts: [
        { id: '22', name: 'HopDong_DEF_2024.pdf', url: '#', uploadedAt: '15/12/2024', size: '3.0 MB' },
      ],
      numberContracts: [],
      payment: { companyName: 'Công ty CP Bất động sản DEF', taxCode: '0316789012', invoiceAddress: 'Tầng 8, Pearl Plaza, TP. HCM', invoiceEmail: 'ketoan@defrealty.vn', billingCycle: 'Hàng quý', paymentMethod: 'Chuyển khoản ngân hàng' },
      onboardingStatus: 'in_progress',
      subscriptionStatus: 'active',
      serviceProfiles: serviceProfilesDEF,
    },
  },
];

export const mockAdminTickets: Ticket[] = [
  {
    id: 'TK-2025-001', category: 'legal_update', title: 'Cập nhật giấy phép kinh doanh mới',
    description: 'Công ty vừa gia hạn giấy phép kinh doanh, cần cập nhật lại thông tin pháp lý trên hệ thống.',
    status: 'resolved', createdAt: '2025-02-15T09:30:00', updatedAt: '2025-02-18T14:00:00',
    attachments: ['giay_phep_kd_2025.pdf'],
    customerId: 'KH-2024-00158', customerName: 'Công ty CP Công nghệ ABC', customerPhone: '0912345678',
    kpiDeadline: '2025-02-17T09:30:00',
    replies: [
      { id: 'r1', sender: 'support', content: 'Chúng tôi đã nhận được yêu cầu. Đang xác minh tài liệu.', timestamp: '2025-02-15T10:00:00' },
      { id: 'r2', sender: 'support', content: 'Thông tin đã được cập nhật thành công.', timestamp: '2025-02-18T14:00:00' },
    ],
  },
  {
    id: 'TK-2025-002', category: 'number_request', title: 'Yêu cầu bổ sung 3 số điện thoại mới',
    description: 'Do mở rộng hoạt động, chúng tôi cần bổ sung thêm 3 số điện thoại masking cho chi nhánh Hà Nội.',
    status: 'received', createdAt: '2025-03-01T11:00:00', updatedAt: '2025-03-02T08:30:00',
    attachments: [],
    customerId: 'KH-2024-00158', customerName: 'Công ty CP Công nghệ ABC', customerPhone: '0912345678',
    kpiDeadline: '2025-03-04T11:00:00',
    replies: [
      { id: 'r3', sender: 'support', content: 'Yêu cầu đã được tiếp nhận. Đội ngũ kỹ thuật sẽ xử lý trong 2-3 ngày làm việc.', timestamp: '2025-03-02T08:30:00' },
    ],
  },
  {
    id: 'TK-2025-003', category: 'error_complaint', title: 'Lỗi không kết nối được cuộc gọi trên số 1900xxxx03',
    description: 'Từ sáng nay, số 1900xxxx03 không thể nhận cuộc gọi. Các số khác hoạt động bình thường.',
    status: 'pending', createdAt: '2025-03-10T07:45:00', updatedAt: '2025-03-10T07:45:00',
    attachments: ['log_error_screenshot.png'],
    customerId: 'KH-2024-00201', customerName: 'Công ty TNHH Vận tải XYZ', customerPhone: '0987654321',
    kpiDeadline: '2025-03-11T07:45:00',
    replies: [],
  },
  {
    id: 'TK-2025-004', category: 'plan_update', title: 'Nâng cấp gói cước lên Premium',
    description: 'Chúng tôi muốn nâng cấp từ gói Enterprise Plus lên Premium để có thêm tính năng ghi âm cuộc gọi.',
    status: 'closed', createdAt: '2025-01-20T14:00:00', updatedAt: '2025-01-25T16:30:00',
    attachments: [],
    customerId: 'KH-2024-00315', customerName: 'Công ty CP Bất động sản DEF', customerPhone: '0901122334',
    kpiDeadline: '2025-01-23T14:00:00',
    replies: [
      { id: 'r4', sender: 'support', content: 'Yêu cầu nâng cấp đã được xử lý. Gói mới sẽ có hiệu lực từ 01/02/2025.', timestamp: '2025-01-23T10:00:00' },
      { id: 'r5', sender: 'customer', content: 'Cảm ơn, tôi đã xác nhận thông tin gói mới.', timestamp: '2025-01-24T09:00:00' },
      { id: 'r6', sender: 'support', content: 'Ticket đã được đóng. Cảm ơn quý khách.', timestamp: '2025-01-25T16:30:00' },
    ],
  },
  {
    id: 'TK-2025-005', category: 'error_complaint', title: 'Chất lượng cuộc gọi kém trên đầu số 1900xxxx01',
    description: 'Cuộc gọi bị ngắt quãng, nhiễu tiếng ồn, khách hàng phản ánh rất nhiều trong 2 ngày qua.',
    status: 'received', createdAt: '2025-03-15T10:20:00', updatedAt: '2025-03-15T14:00:00',
    attachments: ['recording_sample.mp3', 'complaint_log.xlsx'],
    customerId: 'KH-2024-00201', customerName: 'Công ty TNHH Vận tải XYZ', customerPhone: '0987654321',
    kpiDeadline: '2025-03-16T10:20:00',
    replies: [
      { id: 'r7', sender: 'support', content: 'Chúng tôi đang kiểm tra hệ thống. Sẽ cập nhật kết quả sớm nhất.', timestamp: '2025-03-15T14:00:00' },
    ],
  },
];
