// frontend/app.js
angular.module('empleadosApp', [])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    });
