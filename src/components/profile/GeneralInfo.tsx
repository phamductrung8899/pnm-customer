import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCustomer } from '@/data/mockCustomer';
import type { OnboardingStatus, SubscriptionStatus } from '@/types/customer';

function StatusBadge({ status, type }: { status: string; type: 'onboarding' | 'subscription' }) {
  const labels: Record<string, string> = {
    completed: 'Hoàn tất',
    in_progress: 'Đang xử lý',
    pending: 'Chờ duyệt',
    active: 'Đang hoạt động',
    suspended: 'Tạm ngừng',
    inactive: 'Ngừng hoạt động',
  };

  const colors: Record<string, string> = {
    completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    in_progress: 'bg-amber-100 text-amber-700 border-amber-200',
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    suspended: 'bg-amber-100 text-amber-700 border-amber-200',
    inactive: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <Badge variant="outline" className={colors[status]}>
      {type === 'onboarding' ? 'Onboarding: ' : 'Thuê bao: '}
      {labels[status]}
    </Badge>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-2 py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

export function GeneralInfo() {
  const { general, onboardingStatus, subscriptionStatus } = mockCustomer;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{general.companyName}</h2>
        <p className="text-sm text-muted-foreground mt-1">Mã khách hàng: {general.customerId}</p>
        <div className="flex gap-2 mt-3">
          <StatusBadge status={onboardingStatus} type="onboarding" />
          <StatusBadge status={subscriptionStatus} type="subscription" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thông tin chung</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="Tên doanh nghiệp" value={general.companyName} />
          <InfoRow label="Loại hình doanh nghiệp" value={general.businessType} />
          <InfoRow label="Ngày thành lập" value={general.establishedDate} />
          <InfoRow label="Quốc tịch" value={general.nationality} />
          <InfoRow label="Địa chỉ trụ sở" value={general.address} />
        </CardContent>
      </Card>
    </div>
  );
}
