const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	comentario: /^[A-Za-z\s.,;:!?¿"']{1,40}$/, 
	contrasenia: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	etiqueta:  /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/,
    entero: /^\d+$/,
    calificacion: /^\d+(\.\d{1})?$/,
	decimal: /^\d+(\.\d+)?$/,
	dinero: /^\$?\d{1,3}(,\d{3})*(\.\d{0,2})?$/,
    array: /^[A-Za-z\s]+$/
}

function ConvertirFloat(param) {
    return parseFloat(param.replace(/^\$|\./g, '').replace(/,/g, ''));
}

function ConvertirDinero(numero, moneda = 'MXN', region = 'es-MX') {
    return new Intl.NumberFormat(region, {
        style: 'currency',
        currency: moneda
    }).format(numero);
}

const campos = Array.from(inputs).reduce((acc, input) => {
    acc[input.name] = false;
    return acc;
}, {});

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "comentario":
			validarCampo(expresiones.comentario, e.target, 'comentario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "contrasenia":
			validarCampo(expresiones.contrasenia, e.target, 'contrasenia');
			validarcontrasenia2();
		break;
		case "contrasenia2":
			validarcontrasenia2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
        case "terminos":
            validarCheckbox(e.target, 'terminos');
        break;
        case "dinero":
            validarCampo(expresiones.dinero, e.target, 'dinero');
        break;
        case "entero":
            validarCampo(expresiones.entero, e.target, 'entero');
        break;
        case "calif1":
            validarCampo(expresiones.calificacion, e.target, "calif1")
            break;
        case "calif2":
            validarCampo(expresiones.calificacion, e.target, "calif2")
            break;
        case "calif3":
            validarCampo(expresiones.calificacion, e.target, "calif3")
            break;
        case "examen":
            validarCampo(expresiones.calificacion, e.target, "examen")
            break;
        case "trabajo":
            validarCampo(expresiones.calificacion, e.target, "trabajo")
        break;
        case "dia":
            validarFecha(expresiones.entero, e.target, "dia")
        break;
        case "mes":
            validarFecha(expresiones.entero, e.target, "mes")
        break;
        case "anio":
            validarFecha(expresiones.entero, e.target, "anio")
        break;
        case "combobox":
            validarSelect(e.target, "combobox")
        break;
        case "array":
            validarCampo(expresiones.array, e.target, "array")
        break;
        case "radio":
            validarRadio(e.target, "radio")
        break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`form-grupo-${campo}`).classList.remove('form-grupo-incorrecto');
		document.getElementById(`form-grupo-${campo}`).classList.add('form-grupo-correcto');
		document.querySelector(`#form-grupo-${campo} .form-input-error`).classList.remove('form-input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`form-grupo-${campo}`).classList.add('form-grupo-incorrecto');
		document.getElementById(`form-grupo-${campo}`).classList.remove('form-grupo-correcto');
		document.querySelector(`#form-grupo-${campo} .form-input-error`).classList.add('form-input-error-activo');
		campos[campo] = false;
	}
}
const validarFecha = (expresion, input, campo) => {
    let valido;
    if (expresion.test(input.value)) {
        switch (campo) {
            case "dia":
                //validar dia
                let dia = parseInt(input.value)
                if (dia <= 31 && dia != 0) {
                    valido = true
                }
                break;
            case "mes":
                let mes = parseInt(input.value)
                if (mes <= 12 && mes != 0) {
                    valido = true
                }
            break;
            case "anio":
                let anio = parseInt(input.value)
                if (anio <= 2024 && anio >= 1904) {
                    valido = true
                }
            break;
            default:
            break;
        }
    } else {
        valido = false;
    }
	if(valido){
		document.getElementById(`form-grupo-${campo}`).classList.remove('form-grupo-incorrecto');
		document.getElementById(`form-grupo-${campo}`).classList.add('form-grupo-correcto');
		document.querySelector(`#form-grupo-${campo} .form-input-error`).classList.remove('form-input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`form-grupo-${campo}`).classList.add('form-grupo-incorrecto');
		document.getElementById(`form-grupo-${campo}`).classList.remove('form-grupo-correcto');
		document.querySelector(`#form-grupo-${campo} .form-input-error`).classList.add('form-input-error-activo');
		campos[campo] = false;
	}
}
const validarCheckbox = (input, campo) => {
    if (input.checked) {
        campos[campo] = true;
    }
}
const validarRadio = (input, campo) => {
    if (input.value != "") {
        campos[campo] = true;
    }    
}

const validarDia = () => {
    
}
const validarcontrasenia2 = () => {
	const inputcontrasenia1 = document.getElementById('contrasenia');
	const inputcontrasenia2 = document.getElementById('contrasenia2');

	if(inputcontrasenia1.value !== inputcontrasenia2.value){
		document.getElementById(`form-grupo-contrasenia2`).classList.add('form-grupo-incorrecto');
		document.getElementById(`form-grupo-contrasenia2`).classList.remove('form-grupo-correcto');
		document.querySelector(`#form-grupo-contrasenia2 .form-input-error`).classList.add('form-input-error-activo');
		campos['contrasenia'] = false;
        campos['contrasenia2'] = false;
	} else {
		document.getElementById(`form-grupo-contrasenia2`).classList.remove('form-grupo-incorrecto');
		document.getElementById(`form-grupo-contrasenia2`).classList.add('form-grupo-correcto');
		document.querySelector(`#form-grupo-contrasenia2 .form-input-error`).classList.remove('form-input-error-activo');
		campos['contrasenia2'] = true;
        campos['contrasenia'] = true;
	}
}

const procesarDatos = (datosFormulario) => {
    let ejercicio = document.getElementById('ejercicio').innerText;
    switch (ejercicio) {
        case "Ejercicio 1":
            return ejercicio1(datosFormulario)
        case "Ejercicio 2":
            return ejercicio2(datosFormulario)
            
        case "Ejercicio 3":
            return ejercicio3(datosFormulario)
            
        case "Ejercicio 4":
            return ejercicio4(datosFormulario)
            
        case "Ejercicio 5":
            return ejercicio5(datosFormulario)
            
        case "Ejercicio 6":
            return ejercicio6(datosFormulario)
            
        case "Ejercicio 7":
            return ejercicio7(datosFormulario)
            
        case "Ejercicio 8":
            return ejercicio8(datosFormulario)
            
        case "Ejercicio 9":
            return ejercicio9(datosFormulario)
    
        default:
            break;
    }
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	
    const allTrue = Object.values(campos).every(value => value === true);

	if(allTrue){

        const datosFormulario = Array.from(inputs).reduce((acc, input) => {
            acc[input.name] = input.value;
            return acc;
        }, {});

        let resultado = procesarDatos(datosFormulario);
        
		const mensaje = document.getElementById('form-mensaje-exito');
        mensaje.innerText = resultado;

		formulario.reset();

		document.getElementById('form-mensaje-exito').classList.add('form-mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('form-mensaje-exito').classList.remove('form-mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.form-grupo-correcto').forEach((icono) => {
			icono.classList.remove('form-grupo-correcto');
		});
		
		document.getElementById('form-mensaje').classList.remove('form-mensaje-activo');
	} else {
		document.getElementById('form-mensaje').classList.add('form-mensaje-activo');
	}
});

function ejercicio1(datosFormulario) {
    let cantidad = ConvertirFloat(datosFormulario.dinero)
    return "La cantidad que recibirá es " + ConvertirDinero(cantidad + cantidad*0.02) + "."
}
function ejercicio2(datosFormulario) {
    let cantidad = ConvertirFloat(datosFormulario.dinero)
    let numComisiones = parseInt(datosFormulario.entero)
    let extra = cantidad * 0.1
    for (let i = 0; i < numComisiones; i++) {
        cantidad = cantidad + extra
    }
    return "La cantidad que recibirá es " + ConvertirDinero(cantidad) + "."
}
function ejercicio3(datosFormulario) {
    let total = ConvertirFloat(datosFormulario.dinero)
    return "El precio final de su compra es de " + ConvertirDinero(total - (total * 0.15)) + "."
}

function ejercicio4(datosFormulario) {
    let calif1 = ConvertirFloat(datosFormulario.calif1)
    let calif2 = ConvertirFloat(datosFormulario.calif2)
    let calif3 = ConvertirFloat(datosFormulario.calif3)
    let examen = ConvertirFloat(datosFormulario.examen)
    let trabajo = ConvertirFloat(datosFormulario.trabajo)

    let promedio = (calif1 + calif2 + calif3) / 3;
    let final = promedio * 0.55 + examen * 0.3 + trabajo * 0.15;
    return "Su calificación final es " + final + ".";
}

function ejercicio5(datosFormulario) {
 
    let dia = parseInt(datosFormulario.dia)
    let mes = parseInt(datosFormulario.mes)
    let anio = parseInt(datosFormulario.anio)
    let fechaActual = new Date();
    let dia2 = fechaActual.getDate();
    let mes2 = fechaActual.getMonth() + 1;
    let anio2 = fechaActual.getFullYear();

    let difAnio = anio2 - anio
    let difMes = mes2 - mes
    let difDia = dia2 - dia
    let posterior = false;
    let edad;
    if (difMes > 0 || difDia > 0 && difMes == 0 || difDia == 0 && difMes == 0) {
        posterior = true;
    }

    if (posterior) {
        edad = difAnio
    } else {
        edad = difAnio - 1
    }
    
    return "Su edad es " + edad + "."
}

function calcularMes(mes) {
    switch (mes) {
        case "Enero":
        return 1
        case "Febrero":
        return 2
        case "Marzo":
        return 3
        case "Abril":
        return 4
        case "Mayo":
        return 5
        case "Junio":
        return 6
        case "Julio":
        return 7
        case "Agosto":
        return 8
        case "Septiembre":
        return 9
        case "Octubre":
        return 10
        case "Noviembre":
        return 11
        case "Diciembre":
        return 12
        default:
            break;
    }
}

function ejercicio6(datosFormulario) {
    let datos = "" + datosFormulario.array
    datos = datos.toLowerCase()
    let array = datos.split(" ");
    let array2 = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"]
    
    const arrayRespuesta = array.map(item => {
        const index = array2.indexOf(item);
    return index !== -1 ? index : -1;
    });
    return "Su array resultante es " + arrayRespuesta.join(" ")
}

function ejercicio7(datosFormulario) {

    let pagoHora = ConvertirFloat(datosFormulario.dinero)
    let horas = parseInt(datosFormulario.entero)
    let normales = 0
    let extras = 0
    let dobles = 0
    let triples = 0
    if (horas > 40) {
        normales = 40
        extras = horas - 40
        if (extras <= 8) {
            dobles = extras
        } else {
            dobles = 8
            extras = extras - 8
            triples = extras
        }
    } else {
        normales = horas;
    }
    let resultado = (pagoHora * normales) + (pagoHora * 2 * dobles) + (pagoHora * 3 * triples)
    return "La cantidad que se le pagará es de " + ConvertirDinero(resultado) + ".";
}

function ejercicio8(datosFormulario) {
    let salario = ConvertirFloat(datosFormulario.dinero)
    let utilidad;
    switch (datosFormulario.radio.value) {
        case "1 año a menos de 2 años":
            utilidad =  0.05 * salario
            return "Sus utilidades son de " + ConvertirDinero(utilidad) + "."
        case "2 años a menos de 5 años":
            utilidad =  0.07 * salario
            return "Sus utilidades son de " + ConvertirDinero(utilidad) + "."
        case "5 años a menos de 10 años":
            utilidad =  0.10 * salario
            return "Sus utilidades son de " + ConvertirDinero(utilidad) + "."
        case "10 años o más":
            utilidad =  0.15 * salario
            return "Sus utilidades son de " + ConvertirDinero(utilidad) + "."
        default:
            break;
    }
}

function ejercicio9(datosFormulario) {
    return "Los datos se enviaron correctamente."
}