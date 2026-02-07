export type VehicleStatus = "aktiv" | "avstalld";

export type OwnerEntry = {
  ownerId: string;
  firstname: string;
  lastname: string;
  from: string;     // YYYY-MM-DD
  to: string | null;
};

export type Vehicle = {
  id: string;
  type: string;
  model: string;
  reg: string;
  status: VehicleStatus;
  mileage: number;
  mileageUpdatedAt: string;
  owners: OwnerEntry[];
};

export type SearchResultPayload = {
  vehicles: Vehicle[];
  requestId?: number;
  error?: string;
};

export type VehicleUpdatedPayload = { vehicle: Vehicle };
export type ErrorPayload = { message: string };
