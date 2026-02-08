import type { Vehicle } from '../../types/vehicle';

type SearchResultListProps = {
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
};

export default function SearchResultList({
  vehicles,
  onSelect,
}: SearchResultListProps) {
  if (!vehicles.length) return null;
  return (
    <div className="space-y-2">
      {vehicles.map((vehicle) => (
        <button
          key={vehicle.id}
          className="w-full text-left bg-gov-surface border border-gov-border rounded-xl p-3 hover:bg-gov-bg transition flex items-center justify-between"
          onClick={() => onSelect(vehicle)}
        >
          <span>
            <span className="font-bold text-gov-text">{vehicle.reg}</span>
            <span className="ml-2 text-xs text-gov-text2">
              {vehicle.type} • {vehicle.model}
            </span>
          </span>
          <span className="text-xs font-mono text-gov-muted">{vehicle.id}</span>
        </button>
      ))}
    </div>
  );
}
