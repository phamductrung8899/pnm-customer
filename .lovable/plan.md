

## Kế hoạch xây dựng Báo cáo & Tiếp nhận yêu cầu cho Anon Shield Hub

### Bước 1: Copy code từ repo GitHub vào project hiện tại
- Cập nhật `index.css` với theme đỏ (primary: 0 72% 51%) từ repo gốc
- Tạo `src/components/Header.tsx` với navigation 3 tab
- Tạo `src/components/ProfileSidebar.tsx` và các component profile
- Tạo `src/types/customer.ts` và `src/data/mockCustomer.ts`
- Cập nhật `src/App.tsx` với routing cho 3 trang
- Tạo trang `ProfileManagement.tsx` từ repo

### Bước 2: Xây dựng trang Báo cáo (Reports)
**Dashboard báo cáo doanh thu hàng tháng** gồm:

- **Tổng lưu lượng cuộc gọi**:
  - Biểu đồ cột thể hiện số lượng cuộc gọi theo ngày trong tháng
  - Bộ lọc chuyển đổi xem theo ngày / tháng
  - Bảng chi tiết lưu lượng theo từng đầu số (số gốc, số lượng gọi vào/ra, tổng phút)
  - Card tổng quan: tổng cuộc gọi, cuộc gọi thành công, thời lượng trung bình

- **Tổng cước gọi hàng tháng**:
  - Card tổng doanh thu tháng hiện tại
  - Biểu đồ tròn/cột phân tách doanh thu theo thành phần (phí thuê số, phí cuộc gọi, phí SMS, phí duy trì)
  - Bảng chi tiết cước theo từng đầu số

- Sử dụng **Recharts** cho biểu đồ, dữ liệu mock

### Bước 3: Xây dựng trang Tiếp nhận yêu cầu (Request Management)
**Cổng tiếp nhận ticket** với 3 tab chính:

**Tab 1 - Tạo ticket mới:**
- Chọn loại ticket từ 4 nhóm:
  - Cập nhật thông tin tài liệu pháp lý
  - Cập nhật thông tin gói cước đang sử dụng
  - Yêu cầu bổ sung hoặc thu hồi số điện thoại
  - Báo lỗi, khiếu nại
- Form soạn ticket: tiêu đề, mô tả chi tiết, đính kèm tài liệu (UI upload file)
- Nút gửi ticket

**Tab 2 - Danh sách ticket:**
- Bảng danh sách tất cả ticket đã tạo
- Hiển thị trạng thái bằng badge màu: Chưa tiếp nhận (xám), Đã tiếp nhận (vàng), Đã xử lý (xanh), Đã đóng (đen)
- Bộ lọc theo loại ticket và trạng thái
- Click vào ticket để xem chi tiết: nội dung, lịch sử phản hồi qua lại, form phản hồi thêm khi cần bổ sung thông tin

**Tab 3 - FAQ & Hướng dẫn:**
- Danh sách câu hỏi thường gặp dạng accordion
- Phân nhóm theo chủ đề: Tài khoản, Cước phí, Kỹ thuật, Số điện thoại
- Mỗi mục gồm câu hỏi và hướng dẫn xử lý chi tiết

### Dữ liệu
- Tất cả sử dụng mock data phù hợp với ngữ cảnh dịch vụ Phone Number Masking
- Types TypeScript cho ticket, report data

