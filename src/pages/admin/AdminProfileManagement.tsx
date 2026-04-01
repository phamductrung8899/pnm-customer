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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Download, Upload, Save, Pencil, X, Plus, Search, Eye, Trash2, Phone, Key } from 'lucide-react';
import { toast } from 'sonner';
import { mockAdminCustomers, type AdminCustomer } from '@/data/mockAdminData';
import type { CustomerData, AttachedFile, ServiceProfile } from '@/types/customer';

const subscriptionStatusLabels: Record<string, string> = {
  active: 'Đang hoạt động',
  suspended: 'Tạm ngưng',
  inactive: 'Ngừng hoạt động',
};

const onboardingStatusLabels: Record<string, string> = {
  completed: 'Hoàn tất',
  in_progress: 'Đang xử lý',
  pending: 'Chờ xử lý',
};

export default function AdminProfileManagement() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const selectedCustomer = mockAdminCustomers.find(c => c.id === selectedCustomerId);
  const [activeSection, setActiveSection] = useState<ProfileSection>('customer-list');

  const handleSectionChange = (section: ProfileSection) => {
    if (section !== 'customer-list' && !selectedCustomerId) {
      toast.info('Vui lòng chọn khách hàng trước');
      return;
    }
    setActiveSection(section);
  };

  const handleViewCustomer = (id: string) => {
    setSelectedCustomerId(id);
    setActiveSection('general');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-5rem)] w-full">
        <ProfileSidebar activeSection={activeSection} onSectionChange={handleSectionChange} variant="admin" />
        <main className="flex-1 p-6">
          <SidebarTrigger className="mb-4" />
          {activeSection !== 'customer-list' && selectedCustomer && (
            <div className="mb-6 flex items-center gap-4">
              <Label className="text-sm font-medium whitespace-nowrap">Khách hàng:</Label>
              <Select value={selectedCustomerId || ''} onValueChange={(v) => { setSelectedCustomerId(v); }}>
                <SelectTrigger className="w-[350px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {mockAdminCustomers.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name} ({c.id})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {activeSection === 'customer-list' ? (
            <CustomerListSection onView={handleViewCustomer} />
          ) : selectedCustomer ? (
            <EditableSection section={activeSection} customer={selectedCustomer} />
          ) : (
            <p className="text-muted-foreground">Vui lòng chọn khách hàng từ danh sách.</p>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}

/* ============ CUSTOMER LIST ============ */
function CustomerListSection({ onView }: { onView: (id: string) => void }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = mockAdminCustomers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.data.subscriptionStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Danh sách khách hàng</h2>
        <Button className="gap-1" onClick={() => toast.info('Thêm hồ sơ công ty mới (demo)')}>
          <Plus className="h-4 w-4" />Thêm mới
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Tìm kiếm theo tên hoặc mã đối tác..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]"><SelectValue placeholder="Trạng thái thuê bao" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="active">Đang hoạt động</SelectItem>
            <SelectItem value="suspended">Tạm ngưng</SelectItem>
            <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">STT</TableHead>
                <TableHead>Tên đối tác</TableHead>
                <TableHead>Mã đối tác</TableHead>
                <TableHead>Mô hình sử dụng</TableHead>
                <TableHead>Trạng thái thuê bao</TableHead>
                <TableHead>Trạng thái sử dụng</TableHead>
                <TableHead className="w-[120px] text-center">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c, idx) => (
                <TableRow key={c.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.data.general.businessType}</TableCell>
                  <TableCell>
                    <Badge variant={c.data.subscriptionStatus === 'active' ? 'default' : 'destructive'}>
                      {subscriptionStatusLabels[c.data.subscriptionStatus]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {onboardingStatusLabels[c.data.onboardingStatus]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-1">
                      <Button variant="ghost" size="icon" title="Xem chi tiết" onClick={() => onView(c.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Chỉnh sửa" onClick={() => onView(c.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Xóa" onClick={() => toast.info(`Xóa ${c.name} (demo)`)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">Không tìm thấy khách hàng.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

/* ============ EDITABLE SECTION ============ */
function EditableSection({ section, customer }: { section: ProfileSection; customer: AdminCustomer }) {
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState<CustomerData>(customer.data);

  const [prevId, setPrevId] = useState(customer.id);
  if (customer.id !== prevId) {
    setData(customer.data);
    setPrevId(customer.id);
    setEditing(false);
  }

  const handleSave = () => { setEditing(false); toast.success('Đã lưu thông tin thành công!'); };
  const handleCancel = () => { setData(customer.data); setEditing(false); };

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
    case 'general': return <GeneralSection data={data} editing={editing} setData={setData} editButton={editButton} />;
    case 'legal': return <LegalSection data={data} editing={editing} setData={setData} editButton={editButton} />;
    case 'contact': return <ContactSection data={data} editing={editing} setData={setData} editButton={editButton} />;
    case 'terms': return <TermsSection data={data} editing={editing} setData={setData} editButton={editButton} />;
    case 'contracts': return <ContractsSection data={data} editing={editing} setData={setData} editButton={editButton} />;
    case 'service-management': return <ServiceManagementSection data={data} editing={editing} setData={setData} editButton={editButton} />;
    case 'payment': return <PaymentSection data={data} editing={editing} setData={setData} editButton={editButton} />;
    default: return null;
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
            <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">Onboarding: {onboardingStatusLabels[data.onboardingStatus]}</Badge>
            <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">Thuê bao: {subscriptionStatusLabels[data.subscriptionStatus]}</Badge>
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

function ContractsSection({ data, editing, setData, editButton }: SectionProps) {
  const handleDelete = (type: 'serviceContracts' | 'numberContracts', fileId: string) => {
    setData(d => ({ ...d, [type]: d[type].filter(f => f.id !== fileId) }));
    toast.success('Đã xóa tài liệu');
  };

  const renderFiles = (files: AttachedFile[], type: 'serviceContracts' | 'numberContracts') => (
    files.length === 0 ? (
      <p className="text-sm text-muted-foreground">Chưa có hợp đồng nào.</p>
    ) : (
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
            <div className="flex gap-1">
              <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
              {editing && (
                <Button variant="ghost" size="icon" onClick={() => handleDelete(type, file.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end">{editButton}</div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Hợp đồng sử dụng dịch vụ</CardTitle></CardHeader>
        <CardContent>
          {renderFiles(data.serviceContracts, 'serviceContracts')}
          {editing && (
            <Button variant="outline" size="sm" className="gap-1 mt-3" onClick={() => toast.info('Upload file (demo)')}>
              <Upload className="h-4 w-4" />Tải lên
            </Button>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-lg">Hợp đồng đăng ký sử dụng đầu số</CardTitle></CardHeader>
        <CardContent>
          {renderFiles(data.numberContracts, 'numberContracts')}
          {editing && (
            <Button variant="outline" size="sm" className="gap-1 mt-3" onClick={() => toast.info('Upload file (demo)')}>
              <Upload className="h-4 w-4" />Tải lên
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ServiceManagementSection({ data, editing, setData, editButton }: SectionProps) {
  const profiles = data.serviceProfiles || [];

  const handleAddProfile = () => {
    const newProfile: ServiceProfile = {
      id: `sp-${Date.now()}`,
      name: 'Hồ sơ mới',
      serviceModel: 'AX',
      phoneNumbers: [],
      dailyCallLimit: 200,
      apiKeys: [],
      logRetentionDays: 90,
    };
    setData(d => ({ ...d, serviceProfiles: [...(d.serviceProfiles || []), newProfile] }));
    toast.success('Đã thêm hồ sơ dịch vụ mới');
  };

  const handleDeleteProfile = (profileId: string) => {
    setData(d => ({ ...d, serviceProfiles: (d.serviceProfiles || []).filter(p => p.id !== profileId) }));
    toast.success('Đã xóa hồ sơ dịch vụ');
  };

  const updateProfile = (profileId: string, field: keyof ServiceProfile, value: any) => {
    setData(d => ({
      ...d,
      serviceProfiles: (d.serviceProfiles || []).map(p =>
        p.id === profileId ? { ...p, [field]: value } : p
      ),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý dịch vụ</h2>
        <div className="flex gap-2">
          {editButton}
          {editing && (
            <Button size="sm" onClick={handleAddProfile} className="gap-1"><Plus className="h-4 w-4" />Thêm hồ sơ</Button>
          )}
        </div>
      </div>

      {profiles.length === 0 ? (
        <p className="text-sm text-muted-foreground">Chưa có hồ sơ dịch vụ nào.</p>
      ) : (
        profiles.map((profile) => (
          <Card key={profile.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {editing ? (
                    <Input value={profile.name} onChange={e => updateProfile(profile.id, 'name', e.target.value)} className="h-8 text-lg font-semibold w-[300px]" />
                  ) : (
                    <CardTitle className="text-lg">{profile.name}</CardTitle>
                  )}
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{profile.serviceModel}</Badge>
                </div>
                {editing && (
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteProfile(profile.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-[180px_1fr] gap-2 py-2 border-b border-border/50 items-center">
                <span className="text-sm text-muted-foreground">Mô hình dịch vụ</span>
                {editing ? (
                  <Select value={profile.serviceModel} onValueChange={v => updateProfile(profile.id, 'serviceModel', v)}>
                    <SelectTrigger className="h-8 w-[120px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AX">AX</SelectItem>
                      <SelectItem value="AXB">AXB</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-sm font-medium">{profile.serviceModel}</span>
                )}
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-2 py-2 border-b border-border/50 items-center">
                <span className="text-sm text-muted-foreground">Giới hạn cuộc gọi/ngày</span>
                {editing ? (
                  <Input type="number" value={profile.dailyCallLimit} onChange={e => updateProfile(profile.id, 'dailyCallLimit', parseInt(e.target.value) || 0)} className="h-8 text-sm w-[120px]" />
                ) : (
                  <span className="text-sm font-medium">{profile.dailyCallLimit} cuộc/đầu số</span>
                )}
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-2 py-2 border-b border-border/50 items-center">
                <span className="text-sm text-muted-foreground">Lưu trữ log</span>
                {editing ? (
                  <Input type="number" value={profile.logRetentionDays} onChange={e => updateProfile(profile.id, 'logRetentionDays', parseInt(e.target.value) || 0)} className="h-8 text-sm w-[120px]" />
                ) : (
                  <span className="text-sm font-medium">{profile.logRetentionDays} ngày</span>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2"><Phone className="h-4 w-4" />Danh sách đầu số</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.phoneNumbers.map((num, i) => (
                    <div key={i} className="flex items-center gap-1">
                      {editing ? (
                        <div className="flex items-center gap-1">
                          <Input value={num} onChange={e => {
                            const nums = [...profile.phoneNumbers];
                            nums[i] = e.target.value;
                            updateProfile(profile.id, 'phoneNumbers', nums);
                          }} className="h-7 text-sm w-[140px]" />
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => {
                            updateProfile(profile.id, 'phoneNumbers', profile.phoneNumbers.filter((_, idx) => idx !== i));
                          }}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Badge variant="secondary">{num}</Badge>
                      )}
                    </div>
                  ))}
                  {editing && (
                    <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => updateProfile(profile.id, 'phoneNumbers', [...profile.phoneNumbers, ''])}>
                      <Plus className="h-3 w-3 mr-1" />Thêm số
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2"><Key className="h-4 w-4" />API Keys</h4>
                {profile.apiKeys.map((ak) => (
                  <div key={ak.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-mono">{ak.key.substring(0, 12)}••••••••</p>
                      <p className="text-xs text-muted-foreground">Tạo: {ak.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={ak.status === 'active' ? 'default' : 'destructive'}>
                        {ak.status === 'active' ? 'Đang hoạt động' : 'Đã thu hồi'}
                      </Badge>
                      {editing && ak.status === 'active' && (
                        <Button variant="outline" size="sm" className="text-xs" onClick={() => toast.info('Thu hồi API key (demo)')}>Thu hồi</Button>
                      )}
                    </div>
                  </div>
                ))}
                {editing && (
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => toast.info('Tạo API key mới (demo)')}>
                    <Plus className="h-4 w-4" />Tạo API Key
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
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
          <div className="flex gap-1">
            <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
            {editing && (
              <Button variant="ghost" size="icon" onClick={() => toast.success('Đã xóa tài liệu')}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
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
