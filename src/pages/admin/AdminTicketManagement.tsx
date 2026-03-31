import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Send, Paperclip, Bell, Clock, AlertTriangle, CheckCircle2, User, Image } from 'lucide-react';
import { toast } from 'sonner';
import type { Ticket, TicketStatus } from '@/types/customer';
import { ticketCategoryLabels, ticketStatusLabels, ticketStatusColors } from '@/data/mockCustomer';
import { mockAdminTickets } from '@/data/mockAdminData';

function getKpiStatus(ticket: Ticket): { label: string; className: string } {
  if (!ticket.kpiDeadline) return { label: 'N/A', className: 'text-muted-foreground' };
  const deadline = new Date(ticket.kpiDeadline);
  const now = new Date();
  if (ticket.status === 'resolved' || ticket.status === 'closed') {
    const resolved = new Date(ticket.updatedAt);
    return resolved <= deadline
      ? { label: 'Đúng hạn', className: 'bg-green-100 text-green-800' }
      : { label: 'Trễ hạn', className: 'bg-red-100 text-red-800' };
  }
  if (now > deadline) return { label: 'Quá hạn', className: 'bg-red-100 text-red-800' };
  const hoursLeft = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (hoursLeft < 4) return { label: `Còn ${Math.ceil(hoursLeft)}h`, className: 'bg-yellow-100 text-yellow-800' };
  return { label: 'Trong hạn', className: 'bg-green-100 text-green-800' };
}

const AdminTicketManagement = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockAdminTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCustomer, setFilterCustomer] = useState<string>('all');

  const handleStatusChange = (ticketId: string, newStatus: TicketStatus) => {
    const updatedTickets = tickets.map(t => {
      if (t.id === ticketId) {
        const updated = { ...t, status: newStatus, updatedAt: new Date().toISOString() };
        if (selectedTicket?.id === ticketId) setSelectedTicket(updated);
        return updated;
      }
      return t;
    });
    setTickets(updatedTickets);
    toast.success(`Đã cập nhật trạng thái: ${ticketStatusLabels[newStatus]}`);
    // Simulate SMS alert
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket?.customerPhone) {
      toast.info(`📱 Đã gửi SMS thông báo đến ${ticket.customerPhone}: Ticket ${ticketId} chuyển sang "${ticketStatusLabels[newStatus]}"`);
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        const updated = {
          ...t,
          replies: [...t.replies, { id: `r-${Date.now()}`, sender: 'support' as const, content: replyText, timestamp: new Date().toISOString() }],
          updatedAt: new Date().toISOString(),
        };
        setSelectedTicket(updated);
        return updated;
      }
      return t;
    });
    setTickets(updatedTickets);
    setReplyText('');
    toast.success('Đã gửi phản hồi');
    if (selectedTicket.customerPhone) {
      toast.info(`📱 Đã gửi SMS thông báo đến ${selectedTicket.customerPhone}: Có phản hồi mới cho ticket ${selectedTicket.id}`);
    }
  };

  const filteredTickets = tickets.filter(t => {
    if (filterCategory !== 'all' && t.category !== filterCategory) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    if (filterCustomer !== 'all' && t.customerId !== filterCustomer) return false;
    return true;
  });

  const uniqueCustomers = [...new Map(tickets.map(t => [t.customerId, { id: t.customerId!, name: t.customerName! }])).values()];

  const statusOrder: TicketStatus[] = ['pending', 'received', 'resolved', 'closed'];

  // Stats
  const pendingCount = tickets.filter(t => t.status === 'pending').length;
  const overdueCount = tickets.filter(t => {
    if (!t.kpiDeadline || t.status === 'resolved' || t.status === 'closed') return false;
    return new Date() > new Date(t.kpiDeadline);
  }).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Quản lý ticket</h1>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-muted p-2"><Clock className="h-5 w-5 text-muted-foreground" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Chưa tiếp nhận</p>
              <p className="text-xl font-bold">{pendingCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-yellow-100 p-2"><Bell className="h-5 w-5 text-yellow-700" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Đã tiếp nhận</p>
              <p className="text-xl font-bold">{tickets.filter(t => t.status === 'received').length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-red-100 p-2"><AlertTriangle className="h-5 w-5 text-red-700" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Quá hạn KPI</p>
              <p className="text-xl font-bold text-destructive">{overdueCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-green-100 p-2"><CheckCircle2 className="h-5 w-5 text-green-700" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Đã xử lý / Đóng</p>
              <p className="text-xl font-bold">{tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={filterCustomer} onValueChange={setFilterCustomer}>
          <SelectTrigger className="w-[250px]"><SelectValue placeholder="Khách hàng" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả khách hàng</SelectItem>
            {uniqueCustomers.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[200px]"><SelectValue placeholder="Loại ticket" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả loại</SelectItem>
            {Object.entries(ticketCategoryLabels).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Trạng thái" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            {Object.entries(ticketStatusLabels).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Ticket table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>KPI</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map(t => {
                const kpi = getKpiStatus(t);
                return (
                  <TableRow key={t.id} className="cursor-pointer" onClick={() => { setSelectedTicket(t); setDetailOpen(true); }}>
                    <TableCell className="font-mono text-xs">{t.id}</TableCell>
                    <TableCell className="text-xs max-w-[150px] truncate">{t.customerName}</TableCell>
                    <TableCell className="text-xs">{ticketCategoryLabels[t.category]}</TableCell>
                    <TableCell className="max-w-[200px] truncate font-medium">{t.title}</TableCell>
                    <TableCell><Badge className={ticketStatusColors[t.status]}>{ticketStatusLabels[t.status]}</Badge></TableCell>
                    <TableCell><Badge className={kpi.className}>{kpi.label}</Badge></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(t.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                    <TableCell><Button variant="ghost" size="sm">Xem</Button></TableCell>
                  </TableRow>
                );
              })}
              {filteredTickets.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">Không có ticket nào</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="font-mono text-sm text-muted-foreground">{selectedTicket.id}</span>
                  <Badge className={ticketStatusColors[selectedTicket.status]}>{ticketStatusLabels[selectedTicket.status]}</Badge>
                  <Badge className={getKpiStatus(selectedTicket).className}>{getKpiStatus(selectedTicket).label}</Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Customer info */}
                <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{selectedTicket.customerName}</span>
                  <span className="text-xs text-muted-foreground">({selectedTicket.customerId})</span>
                  <span className="ml-auto text-sm text-muted-foreground">📱 {selectedTicket.customerPhone}</span>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Loại: {ticketCategoryLabels[selectedTicket.category]}</p>
                  <h3 className="text-lg font-semibold mt-1">{selectedTicket.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{selectedTicket.description}</p>
                  {selectedTicket.kpiDeadline && (
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      KPI xử lý: {new Date(selectedTicket.kpiDeadline).toLocaleString('vi-VN')}
                    </p>
                  )}
                </div>

                {selectedTicket.attachments.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Tệp đính kèm:</p>
                    <div className="flex gap-2 flex-wrap">
                      {selectedTicket.attachments.map((a, i) => (
                        <Badge key={i} variant="secondary" className="gap-1">
                          {a.match(/\.(png|jpg|jpeg|gif)$/i) ? <Image className="h-3 w-3" /> : <Paperclip className="h-3 w-3" />}
                          {a}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status change */}
                <div className="flex items-center gap-3">
                  <Label className="text-sm whitespace-nowrap">Chuyển trạng thái:</Label>
                  {statusOrder.map(s => (
                    <Button
                      key={s}
                      size="sm"
                      variant={selectedTicket.status === s ? 'default' : 'outline'}
                      className="text-xs"
                      disabled={selectedTicket.status === s}
                      onClick={() => handleStatusChange(selectedTicket.id, s)}
                    >
                      {ticketStatusLabels[s]}
                    </Button>
                  ))}
                </div>

                <Separator />

                {/* Replies */}
                <div className="space-y-3">
                  <p className="text-sm font-medium">Lịch sử trao đổi ({selectedTicket.replies.length})</p>
                  {selectedTicket.replies.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">Chưa có phản hồi</p>
                  )}
                  {selectedTicket.replies.map(r => (
                    <div key={r.id} className={`rounded-lg p-3 text-sm ${r.sender === 'customer' ? 'bg-muted ml-8' : 'bg-primary/5 mr-8'}`}>
                      <p className="text-xs font-medium mb-1">{r.sender === 'customer' ? 'Khách hàng' : 'Hỗ trợ viên'} · {new Date(r.timestamp).toLocaleString('vi-VN')}</p>
                      <p>{r.content}</p>
                    </div>
                  ))}
                </div>

                {/* Reply form */}
                {selectedTicket.status !== 'closed' && (
                  <div className="space-y-2">
                    <Label className="text-sm">Phản hồi cho khách hàng:</Label>
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Nhập nội dung phản hồi..."
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        rows={2}
                      />
                    </div>
                    <Button onClick={handleSendReply} className="gap-1">
                      <Send className="h-4 w-4" />Gửi phản hồi & Thông báo SMS
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTicketManagement;
