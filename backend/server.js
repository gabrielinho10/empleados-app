// backend/server.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Definición del esquema de Empleados
const empleadoSchema = new mongoose.Schema({
    nombre: String,
    puesto: String,
    salario: Number
});

const Empleado = mongoose.model('Empleado', empleadoSchema);

// Rutas de la API
app.get('/api/empleados', async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.json(empleados);
    } catch (err) {
        res.status(500).send('Error al obtener los empleados');
    }
});

app.post('/api/empleados', async (req, res) => {
    try {
        const nuevoEmpleado = new Empleado(req.body);
        await nuevoEmpleado.save();
        res.status(201).json(nuevoEmpleado);
    } catch (err) {
        res.status(400).send('Error al crear el empleado');
    }
});

app.delete('/api/empleados/:id', async (req, res) => {
    try {
        const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
        if (!empleadoEliminado) return res.status(404).send('Empleado no encontrado');
        res.json({ mensaje: 'Empleado eliminado' });
    } catch (err) {
        res.status(500).send('Error al eliminar el empleado');
    }
});

app.put('/api/empleados/:id', async (req, res) => {
    try {
        const empleadoActualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!empleadoActualizado) return res.status(404).send('Empleado no encontrado');
        res.json(empleadoActualizado);
    } catch (err) {
        res.status(400).send('Error al actualizar el empleado');
    }
});

// Configura Express para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Conexión a MongoDB
mongoose.connect('mongodb://localhost/empleados')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Configuración del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
