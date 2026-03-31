import {
  Building2,
  Scale,
  MapPin,
  ShieldCheck,
  FileText,
  Phone,
  CreditCard,
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
  | 'general'
  | 'legal'
  | 'contact'
  | 'terms'
  | 'service-contract'
  | 'number-contract'
  | 'payment';

interface ProfileSidebarProps {
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
}

const sidebarItems: { id: ProfileSection; label: string; icon: React.ElementType }[] = [
  { id: 'general', label: 'Thông tin chung', icon: Building2 },
  { id: 'legal', label: 'Thông tin pháp lý', icon: Scale },
  { id: 'contact', label: 'Địa chỉ liên hệ', icon: MapPin },
  { id: 'terms', label: 'Điều khoản & DLCN', icon: ShieldCheck },
  { id: 'service-contract', label: 'HĐ sử dụng dịch vụ', icon: FileText },
  { id: 'number-contract', label: 'HĐ đăng ký đầu số', icon: Phone },
  { id: 'payment', label: 'Thông tin thanh toán', icon: CreditCard },
];

export function ProfileSidebar({ activeSection, onSectionChange }: ProfileSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Hồ sơ khách hàng</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
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
