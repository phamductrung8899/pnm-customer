import { mockCustomer } from '@/data/mockCustomer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, FileText, Phone, Mail, MapPin, Calendar } from 'lucide-react';

const ProfileManagement = () => {
  const c = mockCustomer;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý hồ sơ</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="h-5 w-5 text-primary" />
              Thông tin doanh nghiệp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="grid grid-cols-[140px_1fr] gap-2">
              <span className="text-muted-foreground">Tên công ty:</span>
              <span className="font-medium">{c.companyName}</span>
              <span className="text-muted-foreground">Mã số thuế:</span>
              <span>{c.taxCode}</span>
              <span className="text-muted-foreground">Người đại diện:</span>
              <span>{c.representativeName}</span>
              <span className="text-muted-foreground">Địa chỉ:</span>
              <span>{c.address}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-primary" />
              Thông tin hợp đồng
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="grid grid-cols-[140px_1fr] gap-2">
              <span className="text-muted-foreground">Số hợp đồng:</span>
              <span className="font-medium">{c.contractNumber}</span>
              <span className="text-muted-foreground">Ngày ký:</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{c.contractDate}</span>
              <span className="text-muted-foreground">Gói cước:</span>
              <Badge variant="secondary">{c.packageName}</Badge>
              <span className="text-muted-foreground">Email:</span>
              <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{c.email}</span>
              <span className="text-muted-foreground">Điện thoại:</span>
              <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{c.phone}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Phone className="h-5 w-5 text-primary" />
            Danh sách số điện thoại ({c.phoneNumbers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Số gốc</TableHead>
                <TableHead>Số masking</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Ngày cấp</TableHead>
                <TableHead className="text-right">Phí/tháng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {c.phoneNumbers.map(pn => (
                <TableRow key={pn.id}>
                  <TableCell className="font-mono">{pn.originalNumber}</TableCell>
                  <TableCell className="font-mono font-medium">{pn.maskedNumber}</TableCell>
                  <TableCell>
                    <Badge variant={pn.status === 'active' ? 'default' : 'secondary'}>
                      {pn.status === 'active' ? 'Hoạt động' : pn.status === 'inactive' ? 'Ngừng' : 'Chờ'}
                    </Badge>
                  </TableCell>
                  <TableCell>{pn.assignedDate}</TableCell>
                  <TableCell className="text-right">{new Intl.NumberFormat('vi-VN').format(pn.monthlyFee)}₫</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileManagement;
