document.addEventListener('DOMContentLoaded', () => {
    cargarAlumnos();

    // Manejar el envío del formulario
    document.getElementById('alumnoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const alumnoData = {
            nombre: document.getElementById('nombre').value,
            apellidos: document.getElementById('apellidos').value,
            fechaNacimiento: document.getElementById('fechaNacimiento').value,
            curso: document.getElementById('curso').value,
            padres: {
                nombre: document.getElementById('nombrePadre').value,
                telefono: document.getElementById('telefono').value,
                email: document.getElementById('email').value
            },
            socioAmpa: document.getElementById('socioAmpa').checked
        };

        try {
            const response = await fetch('/api/alumnos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(alumnoData)
            });

            if (response.ok) {
                alert('Alumno registrado correctamente');
                document.getElementById('alumnoForm').reset();
                cargarAlumnos();
            } else {
                alert('Error al registrar alumno');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al registrar alumno');
        }
    });
});

async function cargarAlumnos() {
    try {
        const response = await fetch('/api/alumnos');
        const alumnos = await response.json();
        
        const tbody = document.getElementById('alumnosLista');
        tbody.innerHTML = '';
        
        alumnos.forEach(alumno => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${alumno.nombre}</td>
                <td>${alumno.apellidos}</td>
                <td>${alumno.curso}</td>
                <td>${alumno.socioAmpa ? 'Sí' : 'No'}</td>
                <td>
                    <button class="btn btn-sm btn-warning btn-action" onclick="editarAlumno('${alumno._id}')">
                        Editar
                    </button>
                    <button class="btn btn-sm btn-danger btn-action" onclick="eliminarAlumno('${alumno._id}')">
                        Eliminar
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar alumnos');
    }
}

async function eliminarAlumno(id) {
    if (confirm('¿Está seguro de que desea eliminar este alumno?')) {
        try {
            const response = await fetch(`/api/alumnos/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Alumno eliminado correctamente');
                cargarAlumnos();
            } else {
                alert('Error al eliminar alumno');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar alumno');
        }
    }
}

async function editarAlumno(id) {
    // Esta función se implementará en una futura actualización
    alert('Funcionalidad de edición en desarrollo');
}
