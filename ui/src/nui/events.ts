import type { ErrorPayload, SearchResultPayload, VehicleUpdatedPayload } from "../types/vehicle";

export type NuiMessage =
  | { type: "TS_OPEN" }
  | { type: "TS_CLOSE" }
  | { type: "TS_SEARCH_RESULT"; payload: SearchResultPayload }
  | { type: "TS_VEHICLE_UPDATED"; payload: VehicleUpdatedPayload }
  | { type: "TS_ERROR"; payload: ErrorPayload };

export function isNuiMessage(x: any): x is NuiMessage {
  return x && typeof x.type === "string" && x.type.startsWith("TS_");
}
