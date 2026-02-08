import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Vehicle } from '../types/vehicle';
import { fetchNui } from '../nui/fetchNui';
import { isNuiMessage } from '../nui/events';

type TransportUiState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'empty' }
  | { status: 'error'; message: string }
  | { status: 'list'; vehicles: Vehicle[] }
  | { status: 'success'; vehicle: Vehicle };

export function useTransportStore() {
  const [isVisible, setIsVisible] = useState(false);
  const [uiState, setUiState] = useState<TransportUiState>({ status: 'idle' });
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicleListState, setVehicleListState] = useState<Vehicle[]>([]);

  useEffect(() => {
    function handleNuiMessage(event: MessageEvent) {
      if (!isNuiMessage(event.data)) return;
      const message = event.data;

      if (message.type === 'TS_OPEN') setIsVisible(true);
      if (message.type === 'TS_CLOSE') setIsVisible(false);

      if (message.type === 'TS_SEARCH_RESULT') {
        const vehicles =
          message.payload && Array.isArray(message.payload.vehicles)
            ? message.payload.vehicles
            : typeof (message as any).data !== 'undefined' &&
                Array.isArray((message as any).data.vehicles)
              ? (message as any).data.vehicles
              : [];
        setVehicleListState(vehicles);
        if (vehicles.length === 0) setUiState({ status: 'empty' });
        else if (vehicles.length === 1)
          setUiState({ status: 'success', vehicle: vehicles[0] });
        else setUiState({ status: 'list', vehicles });
      }
    }

    window.addEventListener('message', handleNuiMessage);
    return () => window.removeEventListener('message', handleNuiMessage);
  }, []);

  const hasSelectedVehicle = uiState.status === 'success';
  const selectedVehicle = useMemo(
    () => (hasSelectedVehicle ? uiState.vehicle : null),
    [hasSelectedVehicle, uiState],
  );
  const vehicleList = useMemo(
    () => (uiState.status === 'list' ? uiState.vehicles : vehicleListState),
    [uiState, vehicleListState],
  );

  const selectVehicle = useCallback((vehicle: Vehicle) => {
    setUiState({ status: 'success', vehicle });
  }, []);

  const closeTransportUi = useCallback(async () => {
    await fetchNui('ts_close', {});
    setIsVisible(false);
  }, []);

  const searchVehicles = useCallback(async () => {
    setUiState({ status: 'loading' });
    const result = await fetchNui('ts_search', { query: searchQuery });
    const vehicles = result?.vehicles || [];
    setVehicleListState(vehicles);
    if (vehicles.length === 0) setUiState({ status: 'empty' });
    else if (vehicles.length === 1)
      setUiState({ status: 'success', vehicle: vehicles[0] });
    else setUiState({ status: 'list', vehicles });
  }, [searchQuery]);

  const transferVehicleOwner = useCallback(
    async (
      vehicleId: string,
      newOwnerId: string,
      firstname?: string,
      lastname?: string,
    ) => {
      const response = await fetchNui('ts_transferOwner', {
        vehicleId,
        newOwnerId,
        firstname,
        lastname,
      });
      if (response && response.vehicles && response.vehicles[0]) {
        setVehicleListState((prevList) =>
          prevList.map((vehicle) =>
            vehicle.id === response.vehicles[0].id
              ? response.vehicles[0]
              : vehicle,
          ),
        );
        setUiState({ status: 'success', vehicle: response.vehicles[0] });
      }
    },
    [],
  );

  const reportVehicleMileage = useCallback(
    async (vehicleId: string, newMileage: number) => {
      const response = await fetchNui('ts_reportMileage', {
        vehicleId,
        newMileage,
      });
      if (
        response &&
        Array.isArray(response.vehicles) &&
        response.vehicles[0]
      ) {
        setVehicleListState((prevList) =>
          prevList.map((vehicle) =>
            vehicle.id === response.vehicles[0].id
              ? response.vehicles[0]
              : vehicle,
          ),
        );
        setUiState({ status: 'success', vehicle: response.vehicles[0] });
      } else if (response && response.vehicle) {
        setVehicleListState((prevList) =>
          prevList.map((vehicle) =>
            vehicle.id === response.vehicle.id ? response.vehicle : vehicle,
          ),
        );
        setUiState({ status: 'success', vehicle: response.vehicle });
      } else if (
        response &&
        Array.isArray(response.vehicles) &&
        response.vehicles.length === 0
      ) {
        setUiState({ status: 'empty' });
      }
    },
    [],
  );

  return {
    isVisible,
    uiState,
    searchQuery,
    setSearchQuery,
    selectedVehicle,
    vehicleList,
    selectVehicle,
    closeTransportUi,
    searchVehicles,
    transferVehicleOwner,
    reportVehicleMileage,
    setUiState,
  };
}
