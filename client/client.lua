local isOpen = false

local function openUi()
    if isOpen then return end
    isOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        type = "TS_OPEN"
    })
end

local function closeUi()
    if not isOpen then return end
    isOpen = false
    SetNuiFocus(false, false)
    SendNUIMessage({
        type = "TS_CLOSE"
    })
end

RegisterCommand("pathstyrelsen", function()
    openUi()
end, false)


RegisterNUICallback("ts_close", function(_, cb)
    closeUi()
    if cb then cb({ ok = true }) end
end)


local pendingSearchCbs = {}
local searchRequestId = 0

RegisterNUICallback("ts_search", function(data, cb)
    searchRequestId = searchRequestId + 1
    local reqId = searchRequestId
    pendingSearchCbs[reqId] = cb
    TriggerServerEvent("ts:search", { query = data.query, requestId = reqId })
end)

RegisterNetEvent("ts:searchResult", function(result)
    if result and result.requestId and pendingSearchCbs[result.requestId] then
        pendingSearchCbs[result.requestId](result)
        pendingSearchCbs[result.requestId] = nil
    else
        SendNUIMessage({
            type = "TS_SEARCH_RESULT",
            data = result
        })
    end
end)

RegisterNUICallback("ts_transferOwner", function(data, cb)
    TriggerServerEvent("ts:transferOwner", data)
    cb({ ok = true })
end)

RegisterNUICallback("ts_reportMileage", function(data, cb)
    TriggerServerEvent("ts:reportMileage", data)
    cb({ ok = true })
end)

RegisterNetEvent("ts:searchResult", function(result)
    SendNUIMessage({
        type = "TS_SEARCH_RESULT",
        data = result
    })
end)

RegisterNetEvent("ts:vehicleUpdated", function(message)
    SendNUIMessage({
        type = "TS_VEHICLE_UPDATED",
        data = message
    })
end)



RegisterNetEvent("ts:error", function(message)
    if type(message) == "table" and message.requestId and pendingSearchCbs[message.requestId] then
        pendingSearchCbs[message.requestId]({ vehicles = {}, error = message.error or message })
        pendingSearchCbs[message.requestId] = nil
    else
        SendNUIMessage({
            type = "TS_ERROR",
            data = message
        })
    end
end)

CreateThread(function()
    while true do
        Wait(0)
        if isOpen and IsControlJustReleased(0, 322) then
            closeUi()
        end
    end
end)