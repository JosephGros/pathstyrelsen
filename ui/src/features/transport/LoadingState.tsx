export function LoadingState({ label }: { label: string }) {
  return (
    <div className="bg-gov-surface border border-gov-border rounded-2xl p-3">
      <div className="flex items-center gap-2 text-gov-text text-sm">
        <div className="h-4 w-4 rounded-full border-2 border-gov-border border-t-gov-accent animate-spin" />
        {label}
      </div>
    </div>
  );
}
export default LoadingState;
