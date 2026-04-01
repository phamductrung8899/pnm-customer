import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PhoneCall, Clock, TrendingUp } from 'lucide-react';
import {
  mockDailyCallData,
  mockMonthlyCallData,
  mockNumberTraffic,
  mockRevenueComponents,
  mockMonthlyRevenue,
  mockNumberCosts,
  formatCurrency,
} from '@/data/mockCustomer';

const Reports = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
      <ReportsContent />
    </div>
  );
};

const ReportsContent = () => {
  const [trafficView, setTrafficView] = useState<'daily' | 'monthly'>('daily');

  const totalCalls = mockNumberTraffic.reduce((s, n) => s + n.inboundCalls + n.outboundCalls, 0);
  const totalMinutes = mockNumberTraffic.reduce((s, n) => s + n.totalMinutes, 0);
  const avgSuccess = mockNumberTraffic.filter(n => n.successRate > 0);
  const avgRate = avgSuccess.length ? (avgSuccess.reduce((s, n) => s + n.successRate, 0) / avgSuccess.length).toFixed(1) : '0';
  const currentRevenue = mockMonthlyRevenue[mockMonthlyRevenue.length - 1];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Báo cáo doanh thu</h1>

      {/* Overview cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-primary/10 p-2"><PhoneCall className="h-5 w-5 text-primary" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Tổng cuộc gọi tháng</p>
              <p className="text-xl font-bold">{totalCalls.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-primary/10 p-2"><Clock className="h-5 w-5 text-primary" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Tổng phút gọi</p>
              <p className="text-xl font-bold">{totalMinutes.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-primary/10 p-2"><TrendingUp className="h-5 w-5 text-primary" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Tỷ lệ thành công</p>
              <p className="text-xl font-bold">{avgRate}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traffic">Lưu lượng cuộc gọi</TabsTrigger>
          <TabsTrigger value="revenue">Cước & Doanh thu</TabsTrigger>
        </TabsList>

        {/* Traffic tab */}
        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Biểu đồ lưu lượng cuộc gọi</CardTitle>
              <Select value={trafficView} onValueChange={(v) => setTrafficView(v as 'daily' | 'monthly')}>
                <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Theo ngày</SelectItem>
                  <SelectItem value="monthly">Theo tháng</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={trafficView === 'daily' ? mockDailyCallData : mockMonthlyCallData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={trafficView === 'daily' ? 'date' : 'month'} fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inbound" name="Gọi vào" fill="hsl(0, 72%, 51%)" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Chi tiết lưu lượng theo đầu số</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Số masking</TableHead>
                    <TableHead>Số gốc</TableHead>
                    <TableHead className="text-right">Gọi vào</TableHead>
                    <TableHead className="text-right">Gọi ra</TableHead>
                    <TableHead className="text-right">Tổng phút</TableHead>
                    <TableHead className="text-right">Tỷ lệ TĐ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockNumberTraffic.map(n => (
                    <TableRow key={n.phoneNumber}>
                      <TableCell className="font-mono font-medium">{n.phoneNumber}</TableCell>
                      <TableCell className="font-mono">{n.originalNumber}</TableCell>
                      <TableCell className="text-right">{n.inboundCalls.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{n.outboundCalls.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{n.totalMinutes.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{n.successRate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue tab */}
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tổng doanh thu tháng hiện tại</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">{formatCurrency(currentRevenue.total)}</p>
                <div className="mt-4 space-y-2 text-sm">
                  {mockRevenueComponents.map(rc => (
                    <div key={rc.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: rc.color }} />
                        <span className="text-muted-foreground">{rc.name}</span>
                      </div>
                      <span className="font-medium">{formatCurrency(rc.amount)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Phân bổ doanh thu</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={mockRevenueComponents}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      dataKey="amount"
                      nameKey="name"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {mockRevenueComponents.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Doanh thu theo tháng</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockMonthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  <Legend />
                  <Bar dataKey="rental" name="Thuê số" stackId="a" fill="hsl(0, 72%, 51%)" />
                  <Bar dataKey="calls" name="Cuộc gọi" stackId="a" fill="hsl(0, 72%, 65%)" />
                  <Bar dataKey="sms" name="SMS" stackId="a" fill="hsl(0, 40%, 45%)" />
                  <Bar dataKey="maintenance" name="Duy trì" stackId="a" fill="hsl(0, 20%, 70%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Chi tiết cước theo đầu số</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Số masking</TableHead>
                    <TableHead className="text-right">Thuê số</TableHead>
                    <TableHead className="text-right">Cuộc gọi</TableHead>
                    <TableHead className="text-right">SMS</TableHead>
                    <TableHead className="text-right">Duy trì</TableHead>
                    <TableHead className="text-right">Tổng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockNumberCosts.map(n => (
                    <TableRow key={n.phoneNumber}>
                      <TableCell className="font-mono font-medium">{n.phoneNumber}</TableCell>
                      <TableCell className="text-right">{formatCurrency(n.rental)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(n.calls)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(n.sms)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(n.maintenance)}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(n.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
