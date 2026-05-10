import { ScoreEventForm } from '@/features/leaderboard/components/ScoreEventForm';
import { PageHeader } from '@/shared/components/PageHeader';

export function PublishEventPage() {
  return (
    <div className="page-stack">
      <PageHeader
        title="Publish score event"
        description="Create a smoke-test score event that the backend publishes to Kafka and applies to the leaderboard."
      />
      <ScoreEventForm />
    </div>
  );
}
