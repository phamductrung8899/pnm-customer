import { mockCustomer } from '@/data/mockCustomer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, FileText, Phone, Mail, MapPin } from 'lucide-react';

const ProfileSidebar = () => {
  const c = mockCustomer;
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Building2 className="h-4 w-4 text-primary" />
          Thông tin khách hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="font-semibold">{c.companyName}</p>
        <div className="flex items-center gap-2 text-muted-foreground">
          <FileText className="h-3.5 w-3.5" /> MST: {c.taxCode}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-3.5 w-3.5" /> {c.phone}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-3.5 w-3.5" /> {c.email}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {c.address}
        </div>
        <div className="border-t pt-3">
          <p className="text-muted-foreground">Hợp đồng: <span className="font-medium text-foreground">{c.contractNumber}</span></p>
          <p className="text-muted-foreground">Gói cước: <Badge variant="secondary">{c.packageName}</Badge></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSidebar;
