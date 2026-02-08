import type { OwnerEntry } from '../../types/vehicle';

type OwnerHistoryProps = {
  owners: OwnerEntry[];
};

export default function OwnerHistory({ owners }: OwnerHistoryProps) {
  return (
    <div className="bg-gov-card border border-gov-border rounded-2xl p-3">
      <div className="text-sm text-gov-text2">Ägarhistorik</div>

      <div className="mt-2 max-h-44 overflow-y-auto space-y-2 pr-1">
        {owners.map((owner, index) => {
          const isCurrentOwner = owner.to === null;
          const ownerType = owner.isCompany ? 'Företag' : 'Privatperson';
          const displayName = owner.isCompany
            ? owner.firstname
            : `${owner.firstname} ${owner.lastname}`.trim();
          return (
            <div
              key={`${owner.ownerId}-${index}`}
              className={`rounded-2xl border p-3 transition ${isCurrentOwner ? 'border-gov-border bg-gov-surface' : 'border-gov-border bg-gov-bg'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="font-mono text-sm text-gov-text flex items-center gap-1.5">
                  <span>
                    {owner.ownerId} - {displayName}
                  </span>
                  <span className="text-gov-text2">•</span>
                  <i
                    className={`fa-solid ${owner.isCompany ? 'fa-building' : 'fa-user'} text-xs text-gov-text2`}
                    title={ownerType}
                  ></i>
                </div>
                {isCurrentOwner && (
                  <span className="badge badge-success">Nuvarande</span>
                )}
              </div>
              <div className="mt-1 text-sm text-gov-muted">
                {owner.from} → {owner.to ?? 'pågående'}
                {owner.lastMileage && <> • Miltal: {owner.lastMileage}</>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
