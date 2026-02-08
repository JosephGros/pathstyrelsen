import { useState, useEffect } from 'react';
import type { Vehicle } from '../../types/vehicle';

type MileageCardProps = {
  vehicle: Vehicle;
  onReportMileage: (
    vehicleId: string,
    newMileage: number,
  ) => Promise<any> | void;
};

export default function MileageCard({
  vehicle,
  onReportMileage,
}: MileageCardProps) {
  const [mileageInput, setMileageInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setMileageInput('');
  }, [vehicle.id, vehicle.mileage]);

  const handleSubmit = async () => {
    setErrorMessage('');
    const mileageValue = Number(mileageInput);

    if (!Number.isFinite(mileageValue)) {
      setErrorMessage('Please enter a valid number.');
      return;
    }
    if (mileageValue < vehicle.mileage) {
      setErrorMessage('New mileage cannot be less than previous value.');
      return;
    }

    await onReportMileage(vehicle.id, mileageValue);
    setMileageInput('');
  };

  return (
    <div className="bg-gov-card border border-gov-border rounded-2xl p-3">
      <div className="text-sm text-gov-text2">Miltal & rapportering</div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="p-2 rounded-xl border border-gov-border bg-gov-surface">
          <div className="text-sm text-gov-text2">Aktuellt miltal</div>
          <div className="text-sm font-mono text-gov-text">
            {vehicle.mileage}
          </div>
        </div>
        <div className="p-2 rounded-xl border border-gov-border bg-gov-surface">
          <div className="text-sm text-gov-text2">Senast uppdaterad</div>
          <div className="text-sm font-mono text-gov-text">
            {vehicle.mileageUpdatedAt}
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2 w-full min-w-0">
        <input
          value={mileageInput}
          onChange={(e) => setMileageInput(e.target.value)}
          placeholder="Rapportera nytt miltal"
          className="flex-1 min-w-0 h-10 px-3 rounded-xl bg-gov-bg text-sm text-gov-text border border-gov-border outline-none focus:ring-2 focus:ring-gov-accent placeholder:text-gov-muted"
        />
        <button
          onClick={handleSubmit}
          disabled={!mileageInput.trim()}
          className="h-10 px-4 rounded-xl bg-gov-accent text-white text-sm hover:bg-gov-accentHover transition disabled:opacity-50"
        >
          Rapportera
        </button>
      </div>

      {errorMessage && (
        <div className="mt-2 text-sm text-gov-danger">{errorMessage}</div>
      )}
    </div>
  );
}
