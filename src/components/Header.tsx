import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Phone } from 'lucide-react';

const navItems = [
  { label: 'Quản lý hồ sơ', path: '/' },
  { label: 'Báo cáo', path: '/bao-cao' },
  { label: 'Tiếp nhận yêu cầu', path: '/tiep-nhan-yeu-cau' },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Phone className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">Phone Number Masking</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map(({ label, path }) => {
            const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
