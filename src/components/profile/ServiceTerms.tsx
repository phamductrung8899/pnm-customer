import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCustomer } from '@/data/mockCustomer';
import { ExternalLink } from 'lucide-react';

export function ServiceTerms() {
  const { serviceTerms } = mockCustomer;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Điều khoản dịch vụ & Xử lý DLCN</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Phạm vi sử dụng dịch vụ</p>
          <p className="text-sm font-medium mt-1">{serviceTerms.serviceScope}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Điều khoản bảo mật</p>
          <a href={serviceTerms.securityTermsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-1">
            Xem điều khoản bảo mật <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Điều khoản xử lý DLCN</p>
          <a href={serviceTerms.dataProcessingTermsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-1">
            Xem điều khoản xử lý dữ liệu cá nhân <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
