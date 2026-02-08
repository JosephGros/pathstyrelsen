import { useMemo, useState } from 'react';
import type { Vehicle } from '../../types/vehicle';
import OwnerHistory from './OwnerHistory';
import TransferOwnerModal from './TransferOwnerModal';
import MileageCard from './MileageCard';

type VehicleResultProps = {
  vehicle: Vehicle;
  onTransferOwner: (
    vehicleId: string,
    newOwnerId: string,
    firstname: string,
    lastname: string,
    isCompany?: boolean,
  ) => Promise<any> | void;
  onReportMileage: (
    vehicleId: string,
    newMileage: number,
  ) => Promise<any> | void;
};

export default function VehicleResult({
  vehicle,
  onTransferOwner,
  onReportMileage,
}: VehicleResultProps) {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const currentOwnerInfo = useMemo(() => {
    const current = vehicle.owners.find((owner) => owner.to == null);
    if (!current) return { name: 'N/A', isCompany: false };
    const name = current.isCompany
      ? current.firstname
      : `${current.firstname || ''} ${current.lastname || ''}`.trim();
    return { name: name || 'N/A', isCompany: current.isCompany };
  }, [vehicle.owners]);

  const statusBadgeClass =
    vehicle.status === 'aktiv' ? 'badge badge-success' : 'badge badge-danger';

  return (
    <>
      <div className="bg-gov-card border border-gov-border rounded-2xl p-3">
        <div className="flex flex-col items-center mb-2">
          <img
            src={`${vehicle.model.toLowerCase()}.webp`}
            alt={vehicle.model}
            className="h-24 w-auto object-contain mb-2 rounded shadow"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-lg tracking-tight text-gov-text">
              {vehicle.reg}
            </div>
            <div className="text-sm text-gov-text2">
              {vehicle.type} • {vehicle.model}
            </div>
          </div>
          <div className={statusBadgeClass}>{vehicle.status}</div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="p-2 rounded-xl border border-gov-border bg-gov-surface">
            <div className="text-sm text-gov-text2">Fordons-ID</div>
            <div className="text-sm font-mono text-gov-text">{vehicle.id}</div>
          </div>
          <div className="p-2 rounded-xl border border-gov-border bg-gov-surface">
            <div className="text-sm text-gov-text2">Nuvarande ägare</div>
            <div className="text-sm font-mono text-gov-text flex items-center gap-1">
              <span>{currentOwnerInfo.name}</span>
              <i
                className={`fa-solid ${currentOwnerInfo.isCompany ? 'fa-building' : 'fa-user'} text-xs text-gov-text2`}
                title={currentOwnerInfo.isCompany ? 'Företag' : 'Privatperson'}
              ></i>
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={() => setIsTransferModalOpen(true)}
            className="h-10 px-4 rounded-xl bg-gov-card text-gov-text text-sm border border-gov-border hover:bg-[#263244] transition"
          >
            Initiera ägarbyte
          </button>
        </div>
        <TransferOwnerModal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          registrationNumber={vehicle.reg}
          onConfirm={async (newOwnerId, firstname, lastname, isCompany) => {
            await onTransferOwner(
              vehicle.id,
              newOwnerId,
              firstname,
              lastname,
              isCompany,
            );
            setIsTransferModalOpen(false);
          }}
        />
      </div>

      <MileageCard
        key={vehicle.mileage}
        vehicle={vehicle}
        onReportMileage={onReportMileage}
      />
      <OwnerHistory
        key={vehicle.owners
          .map((owner) => owner.ownerId + (owner.to || ''))
          .join('-')}
        owners={vehicle.owners}
      />
    </>
  );
}
