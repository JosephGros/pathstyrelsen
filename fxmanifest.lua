fx_version 'cerulean'
game 'gta5'

author 'Pathstyrelsen'
description 'Pathstyrelsen Base'
version '1.0.0'

ui_page 'ui/dist/index.html'

files {
    'ui/dist/index.html',
    'ui/dist/assets/*',
    'ui/dist/pathstyrelsen_logo_phone.png',
    'ui/dist/rhinehart.webp',
    'ui/dist/sandking.webp',
    'ui/dist/sanctus.webp',
    'ui/dist/dominator.webp',
}

server_scripts {
    'server/server.lua',
    'server/services/vehicleService.lua'
}

client_scripts {
    'client/client.lua'
}