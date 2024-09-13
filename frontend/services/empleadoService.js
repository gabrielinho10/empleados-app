// frontend/services/empleadoService.js
angular.module('empleadosApp')
    .factory('empleadoService', function($http) {
        const apiUrl = '/api/empleados';

        return {
            obtenerEmpleados: function() {
                return $http.get(apiUrl);
            },
            crearEmpleado: function(empleado) {
                return $http.post(apiUrl, empleado);
            },
            eliminarEmpleado: function(id) {
                return $http.delete(`${apiUrl}/${id}`);
            },
            actualizarEmpleado: function(id, empleado) {
                return $http.put(`${apiUrl}/${id}`, empleado);
            }
        };
    });
