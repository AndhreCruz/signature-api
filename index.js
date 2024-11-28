const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

const defaultData = [
  {
    "id": "1",
    "title": "Arquitectura de Software",
    "section": "ASY4131-008V",
    "imageURL": "https://cdn-icons-png.flaticon.com/512/5271/5271007.png",
    "profileImg": "https://avatars.githubusercontent.com/u/34869177?v=4",
    "state": "Cursando",
    "teacher": "ERNESTO LEONIDAS VELASQUEZ VELASQUEZ ",
    "totalClasses": 15,
    "asistencias": 0,
    "attendanceRate": 0
  },
  {
    "id": "2",
    "title": "Calidad de Software",
    "section": "CSY4111-008V",
    "imageURL": "https://cdn-icons-png.flaticon.com/512/4677/4677559.png",
    "profileImg": "https://learn.content.blackboardcdn.com/3900.100.0-rel.32+b7093a7/images/ci/ng/default_profile_avatar.svg",
    "state": "Cursando",
    "teacher": "DANIEL ENRIQUE RIQUELME RIGOT",
    "totalClasses": 29,
    "asistencias": 0,
    "attendanceRate": 0
  },
  {
    "id": "3",
    "title": "Estadistica Descriptiva ",
    "section": "MAT4140-010V",
    "imageURL": "https://cdn-icons-png.flaticon.com/512/432/432796.png",
    "profileImg": "https://learn.content.blackboardcdn.com/3900.100.0-rel.32+b7093a7/images/ci/ng/default_profile_avatar.svg",
    "state": "Cursando",
    "teacher": "MONICA NATHALIA PANES MARTINEZ",
    "totalClasses": 30,
    "asistencias": 0,
    "attendanceRate": 0
  },
  {
    "id": "4",
    "title": "Etica Laboral",
    "section": "EAY4450-006V",
    "imageURL": "https://cdn-icons-png.flaticon.com/512/5776/5776927.png",
    "profileImg": "https://learn.content.blackboardcdn.com/3900.100.0-rel.32+b7093a7/images/ci/ng/default_profile_avatar.svg",
    "state": "Cursando",
    "teacher": "LEONARDO OSVALDO MUÑOZ VILLALÓN",
    "totalClasses": 17,
    "asistencias": 0,
    "attendanceRate": 0
  },
  {
    "id": "5",
    "title": "Ingles Intermedio",
    "section": "INI5111-018V",
    "imageURL": "https://images.vexels.com/content/201997/preview/english-book-flat-17d09a.png",
    "profileImg": "https://learn.content.blackboardcdn.com/3900.100.0-rel.32+b7093a7/images/ci/ng/default_profile_avatar.svg",
    "state": "Cursando",
    "teacher": "JOSE SANTOS JARA FUENTES",
    "totalClasses": 62,
    "asistencias": 0,
    "attendanceRate": 0
  },
  {
    "id": "6",
    "title": "Programación App Movil",
    "section": "PGY4121-008V",
    "imageURL": "https://www.svgrepo.com/show/530452/mobile-app.svg",
    "profileImg": "https://avatars.githubusercontent.com/u/8823837?v=4",
    "state": "Cursando",
    "teacher": "CARLOS FERNANDO MARTINEZ SANCHEZ",
    "totalClasses": 30,
    "asistencias": 0,
    "attendanceRate": 0
  }
];

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

// Restablece los cursos a sus valores por defecto
app.post('/reset-courses', (req, res) => {
  fs.writeFile(path.join(__dirname, 'signatureData.json'), JSON.stringify(defaultData, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al restablecer los cursos' });
    }
    res.json({ message: 'Cursos restablecidos a sus valores por defecto' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
