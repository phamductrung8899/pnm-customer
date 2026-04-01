import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ProfileSidebar, type ProfileSection } from '@/components/ProfileSidebar';
import { GeneralInfo } from '@/components/profile/GeneralInfo';
import { LegalInfo } from '@/components/profile/LegalInfo';
import { ContactAddress } from '@/components/profile/ContactAddress';
import { ServiceTerms } from '@/components/profile/ServiceTerms';
import { PaymentInfo } from '@/components/profile/PaymentInfo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Phone, Key, Settings } from 'lucide-react';
import { mockCustomer } from '@/data/mockCustomer';

function ContractsView() {
  const { serviceContracts, numberContracts } = mockCustomer;

  const renderFiles = (files: typeof serviceContracts) => (
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
            <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    )
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Hợp đồng sử dụng dịch vụ</CardTitle></CardHeader>
        <CardContent>{renderFiles(serviceContracts)}</CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-lg">Hợp đồng đăng ký sử dụng đầu số</CardTitle></CardHeader>
        <CardContent>{renderFiles(numberContracts)}</CardContent>
      </Card>
    </div>
  );
}

function ServiceManagementView() {
  const profiles = mockCustomer.serviceProfiles || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Quản lý dịch vụ</h2>
      {profiles.length === 0 ? (
        <p className="text-sm text-muted-foreground">Chưa có hồ sơ dịch vụ nào.</p>
      ) : (
        profiles.map((profile) => (
          <Card key={profile.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{profile.name}</CardTitle>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{profile.serviceModel}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-[180px_1fr] gap-2 py-2 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Mô hình dịch vụ</span>
                <span className="text-sm font-medium">{profile.serviceModel}</span>
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-2 py-2 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Giới hạn cuộc gọi/ngày</span>
                <span className="text-sm font-medium">{profile.dailyCallLimit} cuộc/đầu số</span>
              </div>
              <div className="grid grid-cols-[180px_1fr] gap-2 py-2 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Lưu trữ log</span>
                <span className="text-sm font-medium">{profile.logRetentionDays} ngày</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2"><Phone className="h-4 w-4" />Danh sách đầu số</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.phoneNumbers.map((num) => (
                    <Badge key={num} variant="secondary">{num}</Badge>
                  ))}
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
                    <Badge variant={ak.status === 'active' ? 'default' : 'destructive'}>
                      {ak.status === 'active' ? 'Đang hoạt động' : 'Đã thu hồi'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

const sectionComponents: Record<ProfileSection, React.ComponentType | null> = {
  'customer-list': null, // not used in customer view
  general: GeneralInfo,
  legal: LegalInfo,
  contact: ContactAddress,
  terms: ServiceTerms,
  contracts: ContractsView,
  'service-management': ServiceManagementView,
  payment: PaymentInfo,
};

export default function ProfileManagement() {
  const [activeSection, setActiveSection] = useState<ProfileSection>('general');
  const ActiveComponent = sectionComponents[activeSection];

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-5rem)] w-full">
        <ProfileSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6">
          <SidebarTrigger className="mb-4" />
          {ActiveComponent && <ActiveComponent />}
        </main>
      </div>
    </SidebarProvider>
  );
}
