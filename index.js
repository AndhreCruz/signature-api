const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(cors());
app.use(express.json());

// Obtiene todos los cursos
app.get('/courses', (req, res) => {
  fs.readFile(path.join(__dirname, 'signatureData.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cargar los ramos' });
    }
    res.json(JSON.parse(data));
  });
});

// Obtiene un curso por ID
app.get('/courses/:id', (req, res) => {
  const courseId = req.params.id;

  fs.readFile(path.join(__dirname, 'signatureData.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cargar los ramos' });
    }

    let courses = JSON.parse(data);
    let course = courses.find(c => c.id === courseId);

    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Ramo no encontrado' });
    }
  });
});

// Actualiza las asistencias de un curso por ID
app.put('/courses/:id/asistencias', (req, res) => {
  const courseId = req.params.id;
  const { asistencias } = req.body;

  if (typeof asistencias !== 'number') {
    return res.status(400).json({ message: 'Asistencias debe ser un número' });
  }

  fs.readFile(path.join(__dirname, 'signatureData.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cargar los ramos' });
    }

    let courses = JSON.parse(data);
    let course = courses.find(c => c.id === courseId);

    if (course) {
      course.asistencias = asistencias;

      fs.writeFile(path.join(__dirname, 'signatureData.json'), JSON.stringify(courses, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error al guardar las asistencias' });
        }
        res.json({ message: 'Asistencias actualizadas correctamente', course });
      });
    } else {
      res.status(404).json({ message: 'Ramo no encontrado' });
    }
  });
});

// Actualiza el porcentaje de asistencia de un curso por ID
app.put('/courses/:id/attendanceRate', (req, res) => {
  const courseId = req.params.id;
  const { attendanceRate } = req.body;

  if (typeof attendanceRate !== 'number') {
    return res.status(400).json({ message: 'AttendanceRate debe ser un número' });
  }

  fs.readFile(path.join(__dirname, 'signatureData.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cargar los ramos' });
    }

    let courses = JSON.parse(data);
    let course = courses.find(c => c.id === courseId);

    if (course) {
      course.attendanceRate = attendanceRate;

      fs.writeFile(path.join(__dirname, 'signatureData.json'), JSON.stringify(courses, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error al guardar el porcentaje de asistencia' });
        }
        res.json({ message: 'Porcentaje de asistencia actualizado correctamente', course });
      });
    } else {
      res.status(404).json({ message: 'Ramo no encontrado' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
