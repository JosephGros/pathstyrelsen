import { useTransportStore } from '../../state/useTransportStore';
import SearchCard from './SearchCard';
import VehicleResult from './VehicleResult';
import LoadingState from './LoadingState';
import ErrorBanner from './ErrorBanner';
import EmptyState from './EmptyState';
import PhoneFrame from './PhoneFrame';
import SearchResultList from './SearchResultList';
import FilterCard from './FilterCard';

export default function TransportScreen() {
  const {
    isVisible,
    uiState,
    searchQuery,
    setSearchQuery,
    closeTransportUi,
    searchVehicles,
    selectedVehicle,
    vehicleList,
    vehicleListState,
    selectVehicle,
    transferVehicleOwner,
    reportVehicleMileage,
    vehicleTypeFilter,
    setVehicleTypeFilter,
    vehicleModelFilter,
    setVehicleModelFilter,
    backToList,
    showBackButton,
  } = useTransportStore();

  if (!isVisible) return null;

  return (
    <PhoneFrame>
      <div className="h-16 px-4 flex items-center justify-between border-b border-gov-border bg-gov-surface">
        <div className="flex gap-2">
          <img
            src="./pathstyrelsen_logo_phone.png"
            alt="Pathstyrelsen ./"
            className="h-14 w-22"
          />
        </div>
        <button
          onClick={closeTransportUi}
          className="h-9 w-9 rounded-xl border border-gov-border bg-gov-card text-gov-text2 hover:bg-[#263244] transition flex items-center justify-center font-bold"
          aria-label="Stäng"
        >
          <i className="fa-solid fa-xmark text-lg" aria-hidden="true"></i>
        </button>
      </div>

      <div className="p-3 flex-1 overflow-y-auto space-y-3 scrollbar scrollbar-thumb-myndighet-accent scrollbar-track-myndighet-surface">
        <SearchCard
          searchValue={searchQuery}
          setSearchValue={setSearchQuery}
          onSearch={searchVehicles}
          isLoading={uiState.status === 'loading'}
        />

        {uiState.status === 'error' && (
          <ErrorBanner message={uiState.message} />
        )}
        {uiState.status === 'loading' && (
          <LoadingState label="Söker fordon..." />
        )}
        {uiState.status === 'empty' && (
          <EmptyState
            title="Inget fordon hittades"
            body="Kontrollera registreringsnummer eller fordons-ID."
          />
        )}

        {uiState.status === 'list' && (
          <>
            <FilterCard
              vehicleType={vehicleTypeFilter}
              setVehicleType={setVehicleTypeFilter}
              vehicleModel={vehicleModelFilter}
              setVehicleModel={setVehicleModelFilter}
            />
            <SearchResultList vehicles={vehicleList} onSelect={selectVehicle} />
          </>
        )}

        {uiState.status === 'success' && selectedVehicle && (
          <>
            {showBackButton && (
              <button
                onClick={backToList}
                className="w-full h-10 px-4 rounded-xl bg-gov-card text-gov-text text-sm border border-gov-border hover:bg-[#263244] transition flex items-center gap-2"
              >
                <i className="fa-solid fa-chevron-left text-xs"></i>
                <span>Tillbaka</span>
              </button>
            )}
            <VehicleResult
              key={
                selectedVehicle.id +
                '-' +
                selectedVehicle.mileage +
                '-' +
                (selectedVehicle.owners?.length || 0)
              }
              vehicle={selectedVehicle}
              onTransferOwner={transferVehicleOwner}
              onReportMileage={reportVehicleMileage}
            />
          </>
        )}
      </div>
    </PhoneFrame>
  );
}
