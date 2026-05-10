import { Link } from 'react-router';
import { PageHeader } from '@/shared/components/PageHeader';

export function NotFoundPage() {
  return (
    <div className="page-stack">
      <PageHeader title="Page not found" description="The requested console page does not exist." />
      <Link className="button" to="/dashboard">Back to dashboard</Link>
    </div>
  );
}
