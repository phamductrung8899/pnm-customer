import {
  Building2,
  Scale,
  MapPin,
  ShieldCheck,
  FileText,
  CreditCard,
  Users,
  Settings,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export type ProfileSection =
  | 'customer-list'
  | 'general'
  | 'legal'
  | 'contact'
  | 'terms'
  | 'contracts'
  | 'service-management'
  | 'payment';

interface ProfileSidebarProps {
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
  variant?: 'customer' | 'admin';
}

const customerItems: { id: ProfileSection; label: string; icon: React.ElementType }[] = [
  { id: 'general', label: 'Thông tin chung', icon: Building2 },
  { id: 'legal', label: 'Thông tin pháp lý', icon: Scale },
  { id: 'contact', label: 'Địa chỉ liên hệ', icon: MapPin },
  { id: 'terms', label: 'Điều khoản & DLCN', icon: ShieldCheck },
  { id: 'contracts', label: 'Hợp đồng', icon: FileText },
  { id: 'service-management', label: 'Quản lý dịch vụ', icon: Settings },
  { id: 'payment', label: 'Thông tin thanh toán', icon: CreditCard },
];

const adminItems: { id: ProfileSection; label: string; icon: React.ElementType }[] = [
  { id: 'customer-list', label: 'Danh sách khách hàng', icon: Users },
  { id: 'general', label: 'Thông tin chung', icon: Building2 },
  { id: 'legal', label: 'Thông tin pháp lý', icon: Scale },
  { id: 'contact', label: 'Địa chỉ liên hệ', icon: MapPin },
  { id: 'terms', label: 'Điều khoản & DLCN', icon: ShieldCheck },
  { id: 'contracts', label: 'Hợp đồng', icon: FileText },
  { id: 'service-management', label: 'Quản lý dịch vụ', icon: Settings },
  { id: 'payment', label: 'Thông tin thanh toán', icon: CreditCard },
];

export function ProfileSidebar({ activeSection, onSectionChange, variant = 'customer' }: ProfileSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const items = variant === 'admin' ? adminItems : customerItems;

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent className="pt-16">
        <SidebarGroup>
          <SidebarGroupLabel>Hồ sơ khách hàng</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSectionChange(item.id)}
                      tooltip={item.label}
                      className={cn(
                        'cursor-pointer transition-colors',
                        isActive && 'bg-accent text-accent-foreground font-semibold'
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.label}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
