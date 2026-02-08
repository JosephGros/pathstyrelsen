export default function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="bg-gov-card border border-gov-border rounded-2xl p-3 text-center">
      <div className="text-gov-text">{title}</div>
      <div className="mt-1 text-sm text-gov-muted">{body}</div>
    </div>
  );
}
