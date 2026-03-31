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

export function PaymentInfo() {
  const { payment } = mockCustomer;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Thông tin thanh toán</CardTitle>
      </CardHeader>
      <CardContent>
        <InfoRow label="Tên công ty" value={payment.companyName} />
        <InfoRow label="Mã số thuế" value={payment.taxCode} />
        <InfoRow label="Địa chỉ hóa đơn" value={payment.invoiceAddress} />
        <InfoRow label="Email hóa đơn" value={payment.invoiceEmail} />
        <InfoRow label="Chu kỳ thanh toán" value={payment.billingCycle} />
        <InfoRow label="Phương thức" value={payment.paymentMethod} />
      </CardContent>
    </Card>
  );
}
