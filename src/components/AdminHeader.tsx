import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Phone, ShieldCheck } from 'lucide-react';

const navItems = [
  { label: 'Quản lý hồ sơ', path: '/admin' },
  { label: 'Báo cáo', path: '/admin/bao-cao' },
  { label: 'Quản lý ticket', path: '/admin/quan-ly-ticket' },
];

export function AdminHeader() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Phone className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">PNM Admin</span>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />Admin
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map(({ label, path }) => {
            const isActive = path === '/admin'
              ? location.pathname === '/admin'
              : location.pathname.startsWith(path);
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
