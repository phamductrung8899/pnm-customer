import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ProfileSidebar, type ProfileSection } from '@/components/ProfileSidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, Upload, Save, Pencil, X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { mockAdminCustomers, type AdminCustomer } from '@/data/mockAdminData';
import type { CustomerData, AttachedFile } from '@/types/customer';

export default function AdminProfileManagement() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(mockAdminCustomers[0].id);
  const selectedCustomer = mockAdminCustomers.find(c => c.id === selectedCustomerId)!;
  const [activeSection, setActiveSection] = useState<ProfileSection>('general');

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-5rem)] w-full">
        <ProfileSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6">
          <SidebarTrigger className="mb-4" />
          <div className="mb-6 flex items-center gap-4">
            <Label className="text-sm font-medium whitespace-nowrap">Khách hàng:</Label>
            <Select value={selectedCustomerId} onValueChange={setSelectedCustomerId}>
              <SelectTrigger className="w-[350px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {mockAdminCustomers.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.name} ({c.id})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <EditableSection section={activeSection} customer={selectedCustomer} />
        </main>
      </div>
    </SidebarProvider>
  );
}

function EditableSection({ section, customer }: { section: ProfileSection; customer: AdminCustomer }) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState<CustomerData>(customer.data);

  // Reset data when customer changes
  const [prevId, setPrevId] = useState(customer.id);
  if (customer.id !== prevId) {
    setData(customer.data);
    setPrevId(customer.id);
    setEditing(false);
  }

  const handleSave = () => {
    setEditing(false);
    toast.success('Đã lưu thông tin thành công!');
  };

  const handleCancel = () => {
    setData(customer.data);
    setEditing(false);
  };

  const editButton = (
    <div className="flex gap-2">
      {editing ? (
        <>
          <Button size="sm" onClick={handleSave} className="gap-1"><Save className="h-4 w-4" />Lưu</Button>
          <Button size="sm" variant="outline" onClick={handleCancel} className="gap-1"><X className="h-4 w-4" />Hủy</Button>
        </>
      ) : (
        <Button size="sm" variant="outline" onClick={() => setEditing(true)} className="gap-1"><Pencil className="h-4 w-4" />Chỉnh sửa</Button>
      )}
    </div>
  );

  switch (section) {
    case 'general':
      return <GeneralSection data={data} editing={editing} setData={setData} editButton={editButton} />;
    case 'legal':
      return <LegalSection data={data} editing={editing} setData={setData} editButton={editButton} />;
    case 'contact':
      return <ContactSection data={data} editing={editing} setData={setData} editButton={editButton} />;
    case 'terms':
      return <TermsSection data={data} editing={editing} setData={setData} editButton={editButton} />;
    case 'service-contract':
      return <FileSection title="Hợp đồng sử dụng dịch vụ" files={data.serviceContracts} editButton={editButton} editing={editing} />;
    case 'number-contract':
      return <FileSection title="Hợp đồng đăng ký đầu số" files={data.numberContracts} editButton={editButton} editing={editing} />;
    case 'payment':
      return <PaymentSection data={data} editing={editing} setData={setData} editButton={editButton} />;
    default:
      return null;
  }
}

interface SectionProps {
  data: CustomerData;
  editing: boolean;
  setData: React.Dispatch<React.SetStateAction<CustomerData>>;
  editButton: React.ReactNode;
}

function EditableRow({ label, value, editing, onChange }: { label: string; value: string; editing: boolean; onChange?: (v: string) => void }) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-2 py-2 border-b border-border/50 last:border-0 items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      {editing ? (
        <Input value={value} onChange={e => onChange?.(e.target.value)} className="h-8 text-sm" />
      ) : (
        <span className="text-sm font-medium">{value}</span>
      )}
    </div>
  );
}

function GeneralSection({ data, editing, setData, editButton }: SectionProps) {
  const g = data.general;
  const update = (field: keyof typeof g, value: string) => setData(d => ({ ...d, general: { ...d.general, [field]: value } }));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{g.companyName}</h2>
          <p className="text-sm text-muted-foreground mt-1">Mã khách hàng: {g.customerId}</p>
          <div className="flex gap-2 mt-3">
            <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">Onboarding: Hoàn tất</Badge>
            <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">Thuê bao: Đang hoạt động</Badge>
          </div>
        </div>
        {editButton}
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Thông tin chung</CardTitle></CardHeader>
        <CardContent>
          <EditableRow label="Tên doanh nghiệp" value={g.companyName} editing={editing} onChange={v => update('companyName', v)} />
          <EditableRow label="Loại hình DN" value={g.businessType} editing={editing} onChange={v => update('businessType', v)} />
          <EditableRow label="Ngày thành lập" value={g.establishedDate} editing={editing} onChange={v => update('establishedDate', v)} />
          <EditableRow label="Quốc tịch" value={g.nationality} editing={editing} onChange={v => update('nationality', v)} />
          <EditableRow label="Địa chỉ trụ sở" value={g.address} editing={editing} onChange={v => update('address', v)} />
        </CardContent>
      </Card>
    </div>
  );
}

function LegalSection({ data, editing, setData, editButton }: SectionProps) {
  const l = data.legal;
  const update = (field: string, value: string) => setData(d => ({ ...d, legal: { ...d.legal, [field]: value } }));
  const updateRep = (field: string, value: string) => setData(d => ({ ...d, legal: { ...d.legal, representative: { ...d.legal.representative, [field]: value } } }));

  return (
    <div className="space-y-6">
      <div className="flex justify-end">{editButton}</div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Thông tin pháp lý</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <EditableRow label="Số GPKD" value={l.businessLicenseNo} editing={editing} onChange={v => update('businessLicenseNo', v)} />
          <EditableRow label="Ngày cấp" value={l.licenseIssuedDate} editing={editing} onChange={v => update('licenseIssuedDate', v)} />
          <EditableRow label="Nơi cấp" value={l.licenseIssuedPlace} editing={editing} onChange={v => update('licenseIssuedPlace', v)} />
          <EditableRow label="Mã số thuế" value={l.taxCode} editing={editing} onChange={v => update('taxCode', v)} />
          <EditableRow label="Địa chỉ đăng ký" value={l.registeredAddress} editing={editing} onChange={v => update('registeredAddress', v)} />
          <Separator />
          <h4 className="text-sm font-semibold">Người đại diện pháp luật</h4>
          <EditableRow label="Họ và tên" value={l.representative.fullName} editing={editing} onChange={v => updateRep('fullName', v)} />
          <EditableRow label="Chức vụ" value={l.representative.position} editing={editing} onChange={v => updateRep('position', v)} />
          <EditableRow label="Số CMND/CCCD" value={l.representative.idNumber} editing={editing} onChange={v => updateRep('idNumber', v)} />
          <EditableRow label="Ngày cấp" value={l.representative.idIssuedDate} editing={editing} onChange={v => updateRep('idIssuedDate', v)} />
          <EditableRow label="Nơi cấp" value={l.representative.idIssuedPlace} editing={editing} onChange={v => updateRep('idIssuedPlace', v)} />
          <FileListAdmin files={l.representativeDocuments} title="Giấy tờ đại diện" editing={editing} />
          <FileListAdmin files={l.authorizationDocuments} title="Giấy ủy quyền" editing={editing} />
        </CardContent>
      </Card>
    </div>
  );
}

function ContactSection({ data, editing, setData, editButton }: SectionProps) {
  const c = data.contact;
  const update = (field: string, value: string) => setData(d => ({ ...d, contact: { ...d.contact, [field]: value } }));

  return (
    <div className="space-y-4">
      <div className="flex justify-end">{editButton}</div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Địa chỉ liên hệ</CardTitle></CardHeader>
        <CardContent>
          <EditableRow label="Địa chỉ" value={c.address} editing={editing} onChange={v => update('address', v)} />
          <EditableRow label="Điện thoại" value={c.phone} editing={editing} onChange={v => update('phone', v)} />
          <EditableRow label="Email" value={c.email} editing={editing} onChange={v => update('email', v)} />
          <EditableRow label="Người liên hệ" value={c.contactPerson} editing={editing} onChange={v => update('contactPerson', v)} />
        </CardContent>
      </Card>
    </div>
  );
}

function TermsSection({ data, editing, setData, editButton }: SectionProps) {
  const t = data.serviceTerms;
  const update = (field: string, value: string) => setData(d => ({ ...d, serviceTerms: { ...d.serviceTerms, [field]: value } }));

  return (
    <div className="space-y-4">
      <div className="flex justify-end">{editButton}</div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Điều khoản dịch vụ & Xử lý DLCN</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <EditableRow label="Phạm vi dịch vụ" value={t.serviceScope} editing={editing} onChange={v => update('serviceScope', v)} />
          <EditableRow label="ĐK bảo mật" value={t.securityTermsUrl} editing={editing} onChange={v => update('securityTermsUrl', v)} />
          <EditableRow label="ĐK xử lý DLCN" value={t.dataProcessingTermsUrl} editing={editing} onChange={v => update('dataProcessingTermsUrl', v)} />
        </CardContent>
      </Card>
    </div>
  );
}

function PaymentSection({ data, editing, setData, editButton }: SectionProps) {
  const p = data.payment;
  const update = (field: string, value: string) => setData(d => ({ ...d, payment: { ...d.payment, [field]: value } }));

  return (
    <div className="space-y-4">
      <div className="flex justify-end">{editButton}</div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Thông tin thanh toán</CardTitle></CardHeader>
        <CardContent>
          <EditableRow label="Tên công ty" value={p.companyName} editing={editing} onChange={v => update('companyName', v)} />
          <EditableRow label="Mã số thuế" value={p.taxCode} editing={editing} onChange={v => update('taxCode', v)} />
          <EditableRow label="Địa chỉ hóa đơn" value={p.invoiceAddress} editing={editing} onChange={v => update('invoiceAddress', v)} />
          <EditableRow label="Email hóa đơn" value={p.invoiceEmail} editing={editing} onChange={v => update('invoiceEmail', v)} />
          <EditableRow label="Chu kỳ TT" value={p.billingCycle} editing={editing} onChange={v => update('billingCycle', v)} />
          <EditableRow label="Phương thức" value={p.paymentMethod} editing={editing} onChange={v => update('paymentMethod', v)} />
        </CardContent>
      </Card>
    </div>
  );
}

function FileListAdmin({ files, title, editing }: { files: AttachedFile[]; title: string; editing: boolean }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">{title}</h4>
      {files.map(file => (
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
      {editing && (
        <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.info('Upload file (demo)')}>
          <Upload className="h-4 w-4" />Tải lên
        </Button>
      )}
    </div>
  );
}

function FileSection({ title, files, editButton, editing }: { title: string; files: AttachedFile[]; editButton: React.ReactNode; editing: boolean }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">{editButton}</div>
      <Card>
        <CardHeader><CardTitle className="text-lg">{title}</CardTitle></CardHeader>
        <CardContent>
          {files.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có hợp đồng nào.</p>
          ) : (
            <div className="space-y-2">
              {files.map(file => (
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
          )}
          {editing && (
            <Button variant="outline" size="sm" className="gap-1 mt-3" onClick={() => toast.info('Upload file (demo)')}>
              <Upload className="h-4 w-4" />Tải lên hợp đồng mới
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
