// frontend/controllers/empleadoController.js
angular.module('empleadosApp')
    .controller('empleadoController', function($scope, empleadoService) {
        $scope.empleados = [];
        $scope.nuevoEmpleado = {};
        $scope.mostrarFormulario = false;

        // Obtener todos los empleados al cargar el controlador
        empleadoService.obtenerEmpleados().then(function(response) {
            $scope.empleados = response.data;
        });

        // Crear un nuevo empleado
        $scope.crearEmpleado = function() {
            empleadoService.crearEmpleado($scope.nuevoEmpleado).then(function(response) {
                $scope.empleados.push(response.data);
                $scope.nuevoEmpleado = {}; // Limpiar formulario
                $scope.mostrarFormulario = false; // Ocultar formulario
            });
        };

        // Eliminar un empleado
        $scope.eliminarEmpleado = function(id) {
            empleadoService.eliminarEmpleado(id).then(function() {
                $scope.empleados = $scope.empleados.filter(e => e._id !== id);
            });
        };

        // Editar un empleado
        $scope.editarEmpleado = function(empleado) {
            $scope.nuevoEmpleado = angular.copy(empleado);
            $scope.mostrarFormulario = true;
            // Reemplaza la función de crear con una de actualizar
            $scope.crearEmpleado = function() {
                empleadoService.actualizarEmpleado(empleado._id, $scope.nuevoEmpleado).then(function(response) {
                    const index = $scope.empleados.findIndex(e => e._id === empleado._id);
                    $scope.empleados[index] = response.data;
                    $scope.nuevoEmpleado = {}; // Limpiar formulario
                    $scope.mostrarFormulario = false; // Ocultar formulario
                });
            };
        };
    });
