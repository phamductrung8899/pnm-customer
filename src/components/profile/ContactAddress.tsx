import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCustomer } from '@/data/mockCustomer';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-2 py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

export function ContactAddress() {
  const { contact } = mockCustomer;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Địa chỉ liên hệ</CardTitle>
      </CardHeader>
      <CardContent>
        <InfoRow label="Địa chỉ" value={contact.address} />
        <InfoRow label="Điện thoại" value={contact.phone} />
        <InfoRow label="Email" value={contact.email} />
        <InfoRow label="Người liên hệ" value={contact.contactPerson} />
      </CardContent>
    </Card>
  );
}
