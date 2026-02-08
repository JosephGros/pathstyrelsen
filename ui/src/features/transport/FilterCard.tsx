import { useState, useRef, useEffect } from 'react';

type FilterCardProps = {
  vehicleType: string;
  setVehicleType: (value: string) => void;
  vehicleModel: string;
  setVehicleModel: (value: string) => void;
};

const VEHICLE_TYPES = [
  { value: '', label: 'Alla' },
  { value: 'personbil', label: 'Personbil' },
  { value: 'motorcykel', label: 'Motorcykel' },
  { value: 'skåpbil', label: 'Skåpbil' },
  { value: 'lastbil', label: 'Lastbil' },
];

export default function FilterCard({
  vehicleType,
  setVehicleType,
  vehicleModel,
  setVehicleModel,
}: FilterCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedType = VEHICLE_TYPES.find((t) => t.value === vehicleType);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="bg-gov-card border border-gov-border rounded-2xl p-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-sm text-gov-text2 hover:text-gov-text transition"
      >
        <span>Filtrera resultat</span>
        <i
          className={`fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} text-xs transition-transform`}
        ></i>
      </button>
      {isExpanded && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="relative" ref={dropdownRef}>
            <div className="text-sm text-gov-text2 mb-1">Fordonstyp</div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full h-10 px-3 pr-10 bg-gov-bg text-sm text-gov-text border border-gov-border outline-none focus:ring-2 focus:ring-gov-accent transition relative flex items-center ${
                isDropdownOpen ? 'rounded-t-xl' : 'rounded-xl'
              }`}
            >
              <span className="text-left">{selectedType?.label || 'Alla'}</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className={`w-5 h-5 text-gov-text2 absolute right-3 top-1/2 -translate-y-1/2 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              >
                <path
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 rounded-b-xl bg-gov-bg border-t border-l border-r border-b border-gov-border shadow-lg overflow-hidden z-10 animate-in fade-in duration-100">
                {VEHICLE_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => {
                      setVehicleType(type.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm transition cursor-pointer ${
                      type.value === vehicleType
                        ? 'bg-gov-accent text-white'
                        : 'text-gov-text hover:bg-[#1e2938]'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="text-sm text-gov-text2 mb-1">Modell</div>
            <input
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              placeholder="T.ex. Rhinehart"
              className="w-full h-10 px-3 rounded-xl bg-gov-bg text-sm text-gov-text border border-gov-border outline-none focus:ring-2 focus:ring-gov-accent placeholder:text-gov-muted"
            />
          </div>
        </div>
      )}
    </div>
  );
}
