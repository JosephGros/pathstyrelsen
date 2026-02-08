VehicleService = {}

local function trim(s)
    return (tostring(s or ""):gsub("^%s+", ""):gsub("%s+$", ""))
end

local function normalizeQuery(query)
    query = trim(query):upper()
    query = string.upper(query)
    query = query:gsub("%s+", "")
    return query
end

local function getVihicleById(id)
    for _, vehicle in pairs(VehicleService.vehicles) do
        if vehicle.id == id then
            return vehicle
        end
    end
    return nil
end

local function currentOwner(vehicle)
    for _, owner in ipairs(vehicle.owners or {}) do
        if owner["to"] == nil then return owner end
    end
    return nil
end

function VehicleService.searchVehicle(vehiclesQuery, query)
    local q = normalizeQuery(query)
    if q == "" then return {} end
    local results = {}
    for _, vehicle in pairs(vehiclesQuery) do
        local reg = normalizeQuery(vehicle.reg or "")
        local id = tostring(vehicle.id or ""):upper()
        if reg:find(q, 1, true) or id:find(q, 1, true) then
            table.insert(results, vehicle)
        end
    end
    return results
end

function VehicleService.transferOwner(vehicle, newOwnerId, today, firstname, lastname, isCompany)
    if not vehicle then return { ok = false, error = "Fordon hittades inte." } end

    local owners = vehicle.owners or {}
    local current = nil
    for _, owner in ipairs(owners) do
        if owner["to"] == nil then current = owner break end
    end
    if not current then return { ok = false, error = "Nuvarande ägare hittades inte." } end
    if current.ownerId == newOwnerId then return { ok = false, error = "Du äger redan detta fordon." } end

    -- Set lastMileage for previous owner
    current["to"] = today
    current["lastMileage"] = vehicle.mileage

    table.insert(owners, {
        ownerId = newOwnerId,
        firstname = firstname,
        lastname = lastname,
        ["from"] = today,
        ["to"] = nil,
        isCompany = isCompany or false
    })
    vehicle.owners = owners
    return { ok = true, vehicle = vehicle }
end

function VehicleService.reportMileage(vehicle, newMileage, today)
    if not vehicle then return { ok = false, error = "Fordon hittades inte." } end

    local mileage = tonumber(newMileage)
    if not mileage or mileage < 0 then return { ok = false, error = "Ogiltigt miltal." } end
    if mileage < (vehicle.mileage or 0) then return { ok = false, error = "Nytt miltal får inte vara lägre än tidigare." } end

    vehicle.mileage = math.floor(mileage)
    vehicle.mileageUpdatedAt = today
    return { ok = true, vehicle = vehicle }
end