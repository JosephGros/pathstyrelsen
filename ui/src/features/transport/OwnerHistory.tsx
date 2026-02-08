import type { OwnerEntry } from '../../types/vehicle';

type OwnerHistoryProps = {
  owners: OwnerEntry[];
};

export default function OwnerHistory({ owners }: OwnerHistoryProps) {
  return (
    <div className="bg-gov-card border border-gov-border rounded-2xl p-3">
      <div className="text-xs font-extrabold text-gov-text2">Ägarhistorik</div>

      <div className="mt-2 max-h-44 overflow-y-auto space-y-2 pr-1">
        {owners.map((owner, index) => {
          const isCurrentOwner = owner.to === null;
          return (
            <div
              key={`${owner.ownerId}-${index}`}
              className={`rounded-2xl border p-3 transition ${isCurrentOwner ? 'border-gov-border bg-gov-surface' : 'border-gov-border bg-gov-bg'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="font-mono text-[12px] font-extrabold text-gov-text">
                  {owner.ownerId} - {owner.firstname} {owner.lastname}
                </div>
                {isCurrentOwner && (
                  <span className="badge badge-success">Nuvarande</span>
                )}
              </div>
              <div className="mt-1 text-[11px] text-gov-muted">
                {owner.from} → {owner.to ?? 'pågående'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
