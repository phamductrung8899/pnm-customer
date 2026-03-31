import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCustomer } from '@/data/mockCustomer';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AttachedFile } from '@/types/customer';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-2 py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function FileList({ files, title }: { files: AttachedFile[]; title: string }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">{title}</h4>
      <div className="space-y-2">
        {files.map((file) => (
          <div key={file.id} className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.uploadedAt} · {file.size}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LegalInfo() {
  const { legal } = mockCustomer;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thông tin pháp lý</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoRow label="Số GPKD" value={legal.businessLicenseNo} />
          <InfoRow label="Ngày cấp" value={legal.licenseIssuedDate} />
          <InfoRow label="Nơi cấp" value={legal.licenseIssuedPlace} />
          <InfoRow label="Mã số thuế" value={legal.taxCode} />
          <InfoRow label="Địa chỉ đăng ký" value={legal.registeredAddress} />

          <h4 className="text-sm font-semibold pt-2">Người đại diện pháp luật</h4>
          <InfoRow label="Họ và tên" value={legal.representative.fullName} />
          <InfoRow label="Chức vụ" value={legal.representative.position} />
          <InfoRow label="Số CMND/CCCD" value={legal.representative.idNumber} />
          <InfoRow label="Ngày cấp" value={legal.representative.idIssuedDate} />
          <InfoRow label="Nơi cấp" value={legal.representative.idIssuedPlace} />

          <FileList files={legal.representativeDocuments} title="Giấy tờ đại diện" />
          <FileList files={legal.authorizationDocuments} title="Giấy ủy quyền" />
        </CardContent>
      </Card>
    </div>
  );
}
