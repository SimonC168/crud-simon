const d = document;
let nombre = d.querySelector("#nombre");
let profesion = d.querySelector("#profesion");
let salario = d.querySelector("#salario");
let btnGuardar = d.querySelector("#btnGuardar");
let tabla = d.querySelector("#tabla");
let busqueda = d.querySelector("#busqueda");
let btnBuscar = d.querySelector("#btnBuscar");
let indice = d.querySelector("#indice");

btnGuardar.addEventListener("click", () => {
    if (validarDatos()) {
        guardarDatos();
        mostrarDatos();
    }
});

d.addEventListener("DOMContentLoaded", mostrarDatos);
btnBuscar.addEventListener("click", buscarDatos);

function validarDatos() {
    if (nombre.value.trim() === "" || profesion.value.trim() === "" || salario.value.trim() === "") {
        alert("Todos los campos son obligatorios.");
        return false;
    }
    if (isNaN(salario.value) || salario.value <= 0) {
        alert("El salario debe ser un número válido y mayor que 0.");
        return false;
    }
    return true;
}

function guardarDatos() {
    let profesiones = JSON.parse(localStorage.getItem("profesiones")) || [];
    let nuevaProfesion = {
        nombre: nombre.value.trim(),
        profesion: profesion.value.trim(),
        salario: salario.value.trim()
    };

    if (indice.value) {
        profesiones[indice.value] = nuevaProfesion;
        indice.value = "";
    } else {
        profesiones.push(nuevaProfesion);
    }

    localStorage.setItem("profesiones", JSON.stringify(profesiones));
    nombre.value = "";
    profesion.value = "";
    salario.value = "";
}

function mostrarDatos() {
    let profesiones = JSON.parse(localStorage.getItem("profesiones")) || [];
    tabla.innerHTML = "";
    profesiones.forEach((prof, i) => {
        let fila = d.createElement("tr");
        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${prof.nombre}</td>
            <td>${prof.profesion}</td>
            <td>${prof.salario}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarDatos(${i})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarDatos(${i})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

function editarDatos(i) {
    let profesiones = JSON.parse(localStorage.getItem("profesiones")) || [];
    nombre.value = profesiones[i].nombre;
    profesion.value = profesiones[i].profesion;
    salario.value = profesiones[i].salario;
    indice.value = i;
}

function eliminarDatos(i) {
    let profesiones = JSON.parse(localStorage.getItem("profesiones")) || [];
    profesiones.splice(i, 1);
    localStorage.setItem("profesiones", JSON.stringify(profesiones));
    mostrarDatos();
}

function buscarDatos() {
    let profesiones = JSON.parse(localStorage.getItem("profesiones")) || [];
    let filtro = busqueda.value.toLowerCase();
    let resultados = profesiones.filter(prof => prof.nombre.toLowerCase().includes(filtro));

    tabla.innerHTML = "";
    resultados.forEach((prof, i) => {
        let fila = d.createElement("tr");
        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${prof.nombre}</td>
            <td>${prof.profesion}</td>
            <td>${prof.salario}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarDatos(${i})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarDatos(${i})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}
