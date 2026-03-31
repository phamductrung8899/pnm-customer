import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Shield, FileText, HeadphonesIcon, User } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Quản lý hồ sơ', icon: User },
  { to: '/reports', label: 'Báo cáo', icon: FileText },
  { to: '/requests', label: 'Tiếp nhận yêu cầu', icon: HeadphonesIcon },
];

const Header = () => {
  return (
    <header className="border-b bg-card shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold text-foreground">Anon Shield Hub</span>
        </div>
        <nav className="flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
