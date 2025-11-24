import { Outlet, Link, useLocation } from 'react-router-dom';
import { routesConfig } from '../../../config/app.config';
import { Header } from '../Header';
import { cn } from '../../utils/cn';

const sidebarItems = [
  { label: 'Orders', path: routesConfig.orders.list, icon: '📦' },
  { label: 'Wishlist', path: routesConfig.wishlist, icon: '❤️' },
  { label: 'Comparisons', path: routesConfig.comparisons, icon: '⚖️' },
  { label: 'Price Alerts', path: routesConfig.alerts, icon: '🔔' },
  { label: 'Settings', path: routesConfig.profile, icon: '⚙️' },
];

export function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  )}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
          <main className="flex-1"><Outlet /></main>
        </div>
      </div>
    </div>
  );
}

