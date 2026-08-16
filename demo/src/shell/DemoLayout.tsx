import { Outlet, useLocation, Link } from 'react-router';
import { MockProviders } from '../mock/providers';

function DemoTopBar() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);
  const demoName = segments[segments.length - 1] || '';
  const displayName = demoName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="h-10 bg-[#1e293b] flex items-center justify-between py-0 px-4 shrink-0"
    >
      <Link className="text-surface no-underline text-[13px] font-medium"
        to="/pages"
      >
        &larr; Back to docs
      </Link>
      <span className="text-text-disabled text-[13px] font-medium">
        {displayName}
      </span>
    </div>
  );
}

export function DemoLayout() {
  return (
    <MockProviders>
      <div className="h-screen flex flex-col">
        <DemoTopBar />
        <div className="flex-[1] overflow-hidden">
          <Outlet />
        </div>
      </div>
    </MockProviders>
  );
}
