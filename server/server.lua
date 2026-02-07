local vehicles = {
  ABC123 = {
    id = "veh_1001",
    type = "Personbil",
    model = "Rhinehart",
    reg = "ABC123",
    status = "aktiv",
    mileage = 12450,
    mileageUpdatedAt = "2026-02-01",
    owners = {
      { ownerId = "19990101-1234", firstname = "John", lastname = "Doe", from = "2024-01-10", to = "2025-06-30" },
      { ownerId = "19950505-5678", firstname = "Alice", lastname = "Johnson", from = "2025-07-01", to = "2026-01-15" },
      { ownerId = "19721212-1111", firstname = "Bob", lastname = "Brown", from = "2026-01-16", to = nil }
    }
  },
  ABC456 = {
    id = "veh_2002",
    type = "Personbil",
    model = "Dominator",
    reg = "ABC456",
    status = "aktiv",
    mileage = 12450,
    mileageUpdatedAt = "2026-02-01",
    owners = {
      { ownerId = "19990101-1234", firstname = "John", lastname = "Doe", from = "2023-01-10", to = "2024-05-20" },
      { ownerId = "19800101-1234", firstname = "Jane", lastname = "Smith", from = "2024-05-21", to = "2025-11-30" },
      { ownerId = "19950505-5678", firstname = "Alice", lastname = "Johnson", from = "2025-12-01", to = "2026-02-01" },
      { ownerId = "19721212-1111", firstname = "Bob", lastname = "Brown", from = "2026-02-02", to = nil }
    }
  },
  ABC789 = {
    id = "veh_3003",
    type = "Personbil",
    model = "Sandking",
    reg = "ABC789",
    status = "aktiv",
    mileage = 12450,
    mileageUpdatedAt = "2026-02-01",
    owners = {
      { ownerId = "19990101-1234", firstname = "John", lastname = "Doe", from = "2024-01-10", to = "2025-06-30" },
      { ownerId = "19950505-5678", firstname = "Alice", lastname = "Johnson", from = "2025-07-01", to = "2025-12-31" },
      { ownerId = "19990101-1234", firstname = "John", lastname = "Doe", from = "2026-01-01", to = nil }
    }
  },
  ABC111 = {
    id = "veh_4004",
    type = "Personbil",
    model = "Rhinehart",
    reg = "ABC111",
    status = "aktiv",
    mileage = 12450,
    mileageUpdatedAt = "2026-02-01",
    owners = {
      { ownerId = "19990101-1234", firstname = "John", lastname = "Doe", from = "2024-01-10", to = "2025-06-30" },
      { ownerId = "19950505-5678", firstname = "Alice", lastname = "Johnson", from = "2025-07-01", to = "2026-01-01" },
      { ownerId = "19721212-1111", firstname = "Bob", lastname = "Brown", from = "2026-01-02", to = nil }
    }
  },
  XYZ999 = {
    id = "veh_5005",
    type = "Motorcykel",
    model = "Sanctus",
    reg = "XYZ999",
    status = "avstalld",
    mileage = 8300,
    mileageUpdatedAt = "2026-01-12",
    owners = {
      { ownerId = "19721212-1111", firstname = "Bob", lastname = "Brown", from = "2023-03-01", to = "2024-08-15" },
      { ownerId = "19990101-1234", firstname = "John", lastname = "Doe", from = "2024-08-16", to = nil }
    }
  }
}

local function today()
  return os.date("%Y-%m-%d")
end

local function findVehicleById(id)
  local q = tostring(id or "")
  for _, v in pairs(vehicles) do
    if v.id == q then return v end
  end
  return nil
end


RegisterNetEvent("ts:search", function(data)
  local src = source
  local query = data and data.query or ""
  local requestId = data and data.requestId

  local vehicleList = {}
  for _, v in pairs(vehicles) do table.insert(vehicleList, v) end

  local searchRes = VehicleService.searchVehicle(vehicleList, query)
  local out = { vehicles = searchRes or {}, requestId = requestId }
  if not searchRes then out.vehicles = {} end
  TriggerClientEvent("ts:searchResult", src, out)
end)

RegisterNetEvent("ts:transferOwner", function(data)
  local src = source
  local vehicleId = data and data.vehicleId
  local newOwnerId = data and data.newOwnerId
  local firstname = data and data.firstname
  local lastname = data and data.lastname

  if not vehicleId then
    TriggerClientEvent("ts:error", src, { error = "Fordon saknar ID.", requestId = data and data.requestId })
    return
  end

  local v = findVehicleById(vehicleId)
  if not v then
    TriggerClientEvent("ts:error", src, { error = "Fordonet kunde inte hittas.", requestId = data and data.requestId })
    return
  end

  local out = VehicleService.transferOwner(v, newOwnerId, today(), firstname, lastname)

  if not out.ok then
    TriggerClientEvent("ts:error", src, { error = out.error, requestId = data and data.requestId })
    return
  end

  TriggerClientEvent("ts:searchResult", src, { vehicles = { out.vehicle }, requestId = data and data.requestId })
end)

RegisterNetEvent("ts:reportMileage", function(data)
  local src = source
  local vehicleId = data and data.vehicleId
  local newMileage = data and data.newMileage


  if not vehicleId then
    TriggerClientEvent("ts:error", src, { error = "Fordon saknar ID.", requestId = data and data.requestId })
    return
  end

  local v = findVehicleById(vehicleId)
  if not v then
    TriggerClientEvent("ts:error", src, { error = "Fordonet kunde inte hittas.", requestId = data and data.requestId })
    return
  end

  local out = VehicleService.reportMileage(v, newMileage, today())

  if not out.ok then
    TriggerClientEvent("ts:error", src, { error = out.error, requestId = data and data.requestId })
    return
  end

  TriggerClientEvent("ts:searchResult", src, { vehicles = { out.vehicle }, requestId = data and data.requestId })
end)
