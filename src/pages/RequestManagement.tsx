import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Plus, Upload, MessageSquare, HelpCircle, Send, Paperclip } from 'lucide-react';
import { toast } from 'sonner';
import type { Ticket, TicketCategory, TicketStatus } from '@/types/customer';
import {
  mockTickets,
  mockFAQs,
  ticketCategoryLabels,
  ticketStatusLabels,
  ticketStatusColors,
} from '@/data/mockCustomer';

const RequestManagement = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Filters
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Create form
  const [newCategory, setNewCategory] = useState<TicketCategory | ''>('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newFiles, setNewFiles] = useState<string[]>([]);

  const handleCreateTicket = () => {
    if (!newCategory || !newTitle || !newDescription) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    const ticket: Ticket = {
      id: `TK-2025-${String(tickets.length + 1).padStart(3, '0')}`,
      category: newCategory as TicketCategory,
      title: newTitle,
      description: newDescription,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attachments: newFiles,
      replies: [],
    };
    setTickets([ticket, ...tickets]);
    setNewCategory('');
    setNewTitle('');
    setNewDescription('');
    setNewFiles([]);
    toast.success('Đã tạo ticket thành công!');
  };

  const handleFileSelect = () => {
    const fileName = `document_${Date.now()}.pdf`;
    setNewFiles([...newFiles, fileName]);
    toast.info(`Đã đính kèm: ${fileName}`);
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;
    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        const updated = {
          ...t,
          replies: [...t.replies, { id: `r-${Date.now()}`, sender: 'customer' as const, content: replyText, timestamp: new Date().toISOString() }],
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
  };

  const filteredTickets = tickets.filter(t => {
    if (filterCategory !== 'all' && t.category !== filterCategory) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    return true;
  });

  const faqCategories = [...new Set(mockFAQs.map(f => f.category))];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tiếp nhận yêu cầu</h1>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
          <TabsTrigger value="create" className="gap-1"><Plus className="h-4 w-4" />Tạo ticket</TabsTrigger>
          <TabsTrigger value="list" className="gap-1"><MessageSquare className="h-4 w-4" />Danh sách ticket</TabsTrigger>
          <TabsTrigger value="faq" className="gap-1"><HelpCircle className="h-4 w-4" />FAQ & Hướng dẫn</TabsTrigger>
        </TabsList>

        {/* Create ticket */}
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tạo ticket hỗ trợ mới</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Loại yêu cầu *</Label>
                <Select value={newCategory} onValueChange={(v) => setNewCategory(v as TicketCategory)}>
                  <SelectTrigger><SelectValue placeholder="Chọn loại yêu cầu" /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(ticketCategoryLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tiêu đề *</Label>
                <Input placeholder="Nhập tiêu đề ticket" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Mô tả chi tiết *</Label>
                <Textarea placeholder="Mô tả chi tiết yêu cầu của bạn..." rows={5} value={newDescription} onChange={e => setNewDescription(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Tài liệu đính kèm</Label>
                <div className="flex flex-wrap gap-2">
                  {newFiles.map((f, i) => (
                    <Badge key={i} variant="secondary" className="gap-1">
                      <Paperclip className="h-3 w-3" />{f}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" onClick={handleFileSelect} className="gap-1">
                    <Upload className="h-4 w-4" />Đính kèm file
                  </Button>
                </div>
              </div>
              <Button onClick={handleCreateTicket} className="gap-1">
                <Send className="h-4 w-4" />Gửi ticket
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ticket list */}
        <TabsContent value="list" className="space-y-4">
          <div className="flex gap-3">
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

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map(t => (
                    <TableRow key={t.id} className="cursor-pointer" onClick={() => { setSelectedTicket(t); setDetailOpen(true); }}>
                      <TableCell className="font-mono text-xs">{t.id}</TableCell>
                      <TableCell className="text-xs">{ticketCategoryLabels[t.category]}</TableCell>
                      <TableCell className="max-w-[250px] truncate font-medium">{t.title}</TableCell>
                      <TableCell>
                        <Badge className={ticketStatusColors[t.status]}>{ticketStatusLabels[t.status]}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{new Date(t.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Xem</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredTickets.length === 0 && (
                    <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Không có ticket nào</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq" className="space-y-4">
          {faqCategories.map(cat => (
            <Card key={cat}>
              <CardHeader>
                <CardTitle className="text-base">{cat}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple">
                  {mockFAQs.filter(f => f.category === cat).map(faq => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-sm text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Ticket detail dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="font-mono text-sm text-muted-foreground">{selectedTicket.id}</span>
                  <Badge className={ticketStatusColors[selectedTicket.status]}>{ticketStatusLabels[selectedTicket.status]}</Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Loại: {ticketCategoryLabels[selectedTicket.category]}</p>
                  <h3 className="text-lg font-semibold mt-1">{selectedTicket.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{selectedTicket.description}</p>
                </div>
                {selectedTicket.attachments.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {selectedTicket.attachments.map((a, i) => (
                      <Badge key={i} variant="secondary" className="gap-1"><Paperclip className="h-3 w-3" />{a}</Badge>
                    ))}
                  </div>
                )}
                <Separator />
                <div className="space-y-3">
                  <p className="text-sm font-medium">Lịch sử trao đổi ({selectedTicket.replies.length})</p>
                  {selectedTicket.replies.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">Chưa có phản hồi</p>
                  )}
                  {selectedTicket.replies.map(r => (
                    <div key={r.id} className={`rounded-lg p-3 text-sm ${r.sender === 'customer' ? 'bg-primary/5 ml-8' : 'bg-muted mr-8'}`}>
                      <p className="text-xs font-medium mb-1">{r.sender === 'customer' ? 'Bạn' : 'Hỗ trợ'} · {new Date(r.timestamp).toLocaleString('vi-VN')}</p>
                      <p>{r.content}</p>
                    </div>
                  ))}
                </div>
                {selectedTicket.status !== 'closed' && (
                  <div className="flex gap-2">
                    <Input placeholder="Nhập phản hồi..." value={replyText} onChange={e => setReplyText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendReply()} />
                    <Button onClick={handleSendReply} size="icon"><Send className="h-4 w-4" /></Button>
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

export default RequestManagement;
