
import { useTransportStore } from "../../state/useTransportStore";
import SearchCard from "./SearchCard";
import VehicleResult from "./VehicleResult";
import LoadingState from "./LoadingState";
import ErrorBanner from "./ErrorBanner";
import EmptyState from "./EmptyState";
import PhoneFrame from "./PhoneFrame";
import SearchResultList from "./SearchResultList";

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
    selectVehicle,
    transferVehicleOwner,
    reportVehicleMileage,
  } = useTransportStore();

  if (!isVisible) return null;

  return (
    <PhoneFrame>
      <div className="h-16 px-4 flex items-center justify-between border-b border-gov-border bg-gov-surface">
        <div className="flex gap-2">
          <img src="./pathstyrelsen_logo_phone.png" alt="Pathstyrelsen ./" className="h-14 w-22" />
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
          isLoading={uiState.status === "loading"} 
        />

        {uiState.status === "error" && <ErrorBanner message={uiState.message} />}
        {uiState.status === "loading" && <LoadingState label="Söker fordon..." />}
        {uiState.status === "empty" && (
          <EmptyState title="Inget fordon hittades" body="Kontrollera registreringsnummer eller fordons-ID." />
        )}

        {uiState.status === "list" && (
          <SearchResultList vehicles={vehicleList} onSelect={selectVehicle} />
        )}

        {selectedVehicle && uiState.status === "success" && (
          <VehicleResult
            key={selectedVehicle.id + '-' + selectedVehicle.mileage + '-' + (selectedVehicle.owners?.length || 0)}
            vehicle={selectedVehicle}
            onTransferOwner={transferVehicleOwner}
            onReportMileage={reportVehicleMileage}
          />
        )}
      </div>
    </PhoneFrame>
  );
}
