/** Footer with operational ownership information. */
export function Footer() {
  return (
    <footer className="footer">
      <span>Real-Time Top-K Leaderboard Service</span>
      <span>Kafka → PostgreSQL → Redis Sorted Set → WebFlux API</span>
    </footer>
  );
}
