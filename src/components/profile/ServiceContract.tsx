import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCustomer } from '@/data/mockCustomer';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ServiceContract() {
  const { serviceContracts } = mockCustomer;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Hợp đồng sử dụng dịch vụ</CardTitle>
      </CardHeader>
      <CardContent>
        {serviceContracts.length === 0 ? (
          <p className="text-sm text-muted-foreground">Chưa có hợp đồng nào.</p>
        ) : (
          <div className="space-y-2">
            {serviceContracts.map((file) => (
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
      </CardContent>
    </Card>
  );
}
