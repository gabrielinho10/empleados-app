const express = require('express');
const Empleado = require('../models/empleado'); // Importa el modelo de empleado
const router = express.Router();

// Obtener todos los empleados
router.get('/', async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.json(empleados);
    } catch (err) {
        res.status(500).send('Error al obtener los empleados');
    }
});

// Obtener un empleado por ID
router.get('/:id', async (req, res) => {
    try {
        const empleado = await Empleado.findById(req.params.id);
        if (!empleado) return res.status(404).send('Empleado no encontrado');
        res.json(empleado);
    } catch (err) {
        res.status(500).send('Error al obtener el empleado');
    }
});

// Crear un nuevo empleado
router.post('/', async (req, res) => {
    try {
        const nuevoEmpleado = new Empleado(req.body);
        await nuevoEmpleado.save();
        res.status(201).json(nuevoEmpleado);
    } catch (err) {
        res.status(400).send('Error al crear el empleado');
    }
});

// Actualizar un empleado existente
router.put('/:id', async (req, res) => {
    try {
        const empleadoActualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!empleadoActualizado) return res.status(404).send('Empleado no encontrado');
        res.json(empleadoActualizado);
    } catch (err) {
        res.status(400).send('Error al actualizar el empleado');
    }
});

// Eliminar un empleado
router.delete('/:id', async (req, res) => {
    try {
        const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
        if (!empleadoEliminado) return res.status(404).send('Empleado no encontrado');
        res.json({ mensaje: 'Empleado eliminado' });
    } catch (err) {
        res.status(500).send('Error al eliminar el empleado');
    }
});

module.exports = router;  // Exporta el router
