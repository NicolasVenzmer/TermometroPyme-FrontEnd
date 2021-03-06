import urlWebServices from '../controller/webServices.js';

// Login de usuarios
export const login = async function (login) {

    let url = urlWebServices.login;

    const formData = new URLSearchParams();
    formData.append('email', login.email);
    formData.append('password', login.password);

    try {
        let response = await fetch(url, {
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,

        });

        let rdo = response.status;
        let data = await response.json();
        switch (rdo) {
            case 201:
                {
                    localStorage.setItem("x", data.loginUser.token);
                    let user = data.loginUser.user;
                    localStorage.setItem("nombre", user.name);
                    localStorage.setItem("email", user.email);

                    if (user.root === "S") {
                        return ({ rdo: 2, mensaje: "Ok" });//Es root
                    }
                    else {
                        return ({ rdo: 0, mensaje: "Ok" });//correcto
                    }

                }
            case 202:
                {
                    return ({ rdo: 1, mensaje: "El mail ingresado no existe en nuestra base." });
                }
            case 203:
                {
                    return ({ rdo: 1, mensaje: "La contraseña no es correcta." });
                }
            default:
                {
                    return ({ rdo: 1, mensaje: "Ha ocurrido un error" });
                }
        }
    }
    catch (error) {
        console.log("error", error);
    };
}

//Contacto
export const guardarContacto = async function (razonsocial, email, region, tamaño) {
    let url = urlWebServices.contacto;

    const formData = new URLSearchParams();
    formData.append('razonsocial', razonsocial);
    formData.append('email', email);
    formData.append('region', region);
    formData.append('tamaño', tamaño);

    try {
        let response = await fetch(url, {
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });
        if (response.status === 201) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("error", error);
        return false;
    };
}

// Guardar usuario
export const guardarUsuario = async function (name, lastname, email, dni, password) {
    let url = urlWebServices.guardarUsuario;
    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('dni', dni);
    formData.append('password', password);

    try {
        let response = await fetch(url, {
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (response.status === 201) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("error", error);
        return false;
    };
}

// Recupero usuarios
export const getUsuario = async function () {
    let url = urlWebServices.getUsuario;

    try {
        let response = await fetch(url, {
            method: 'GET', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });

        if (response.status === 200) {
            let data = await response.json();

            let listaUsuarios = data.data.docs;
            return listaUsuarios;
        }
        else {
            let vacio = [];
            console.log("No hay usuarios")
            return (vacio);

        }
    }
    catch (error) {
        console.log("error", error);
    };
}

// Borro usuarios
export const deleteUsuario = async function (id_user) {
    let url = urlWebServices.deleteUsuario;
    const formData = new URLSearchParams();
    formData.append('id', id_user);

    try {
        let response = await fetch(url, {
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (response.status === 201) {

            return true;

        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("error", error);
        return false;
    };
}

// Acutualizo usuarios
export const updateUsuario = async function (id, dni, name, lastname, email, password) {
    let url = urlWebServices.updateUsuario;
    const formData = new URLSearchParams();

    formData.append('id', id);
    formData.append('dni', dni);
    formData.append('name', name);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);

    try {
        let response = await fetch(url, {
            method: 'PUT', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (response.status === 200) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("error", error);
        return false;
    };
}

//Crear encuestas
export const guardarEncuesta = async function (titulo, sector, tamaño, questions, valorReferencia) {

    let url = urlWebServices.guardarEncuesta;
    const formData = new URLSearchParams();
    formData.append('titulo', titulo);
    formData.append('sector', sector);
    formData.append('tamaño', tamaño);

    var i = 0;
    var j = 0;
    var numeroRespuesta = 1;
    var numeroPregunta = 1;
    var cantidadRes = 1;
    var cantidadPreguntasRef = 1;

    for (i = 0; i < questions.length; i++) {
        const newQuestion = { questionText: questions[i].questionText }
        formData.append("pregunta" + numeroPregunta, newQuestion.questionText)
        numeroPregunta = numeroPregunta + 1;
        formData.append("P" + cantidadPreguntasRef + "valorref1", valorReferencia[i])

        for (j = 0; j < questions[i].options.length; j++) {
            const newAnswer = { options: questions[i].options[j].optionText }
            formData.append("P" + cantidadRes + "respuesta" + numeroRespuesta, newAnswer.options)
            numeroRespuesta = numeroRespuesta + 1;

        }
        cantidadPreguntasRef = cantidadPreguntasRef + 1;
        numeroRespuesta = 1;
        cantidadRes = cantidadRes + 1;
    };

    try {
        let response = await fetch(url, {
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (response.status === 201) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("error", error);
        return false;
    };
}

//Crear encuestas respuesta
export const guardarEncuestaResp = async function (encuesta,resp1,resp2,resp3,resp4,resp5, idbusqueda ) {

    let url = urlWebServices.guardarEncuestaResp;
    const formData = new URLSearchParams();
    formData.append('titulo', encuesta.titulo);
    formData.append('sector', encuesta.sector);
    formData.append('tamaño', encuesta.tamaño);
    formData.append('idbusqueda', idbusqueda);
    if (resp1) {
        formData.append('pregunta1', encuesta.pregunta1);
        formData.append('P1respuesta', resp1);
        formData.append('P1valorref', encuesta.P1valorref1);
    }
    if (resp2) {
        formData.append('pregunta2', encuesta.pregunta2);
        formData.append('P2respuesta', resp2);
        formData.append('P2valorref', encuesta.P2valorref1);
    }
    if (resp3) {
        formData.append('pregunta3', encuesta.pregunta3);
        formData.append('P3respuesta', resp3);
        formData.append('P3valorref', encuesta.P3valorref1);
    }
    if (resp4) {
        formData.append('pregunta4', encuesta.pregunta4);
        formData.append('P4respuesta', resp4);
        formData.append('P4valorref', encuesta.P4valorref1);
    }
    if (resp5) {
        formData.append('pregunta5', encuesta.pregunta5);
        formData.append('P5respuesta', resp5);
        formData.append('P5valorref', encuesta.P5valorref1);
    }

    try {
        let response = await fetch(url, {
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (response.status === 201) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("error", error);
        return false;
    };
}

// Traer encuestas
export const getEncuesta = async function () {
    let url = urlWebServices.getEncuesta;

    try {
        let response = await fetch(url, {
            method: 'GET', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });
        if (response.status === 200) {
            let data = await response.json();

            let listaUsuarios = data.data.docs;
            return listaUsuarios;
        }
        else {
            let vacio = [];
            console.log("No hay encuestas")
            return (vacio);

        }
    }
    catch (error) {
        console.log("error", error);
    };
}

// Traer encuestas por ID
export const getEncuestaID = async function (_id) {
    let url = urlWebServices.getEncuestaID;
    const formData = new URLSearchParams();

    formData.append('_id', _id);

    try {
        let response = await fetch(url, {
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });
        if (response.status === 200) {
            let data = await response.json();

            let listaEncuestaID = data.data.docs;
            return listaEncuestaID;
        }
        else {
            let vacio = [];
            console.log("No hay encuestas por ese ID")
            return (vacio);

        }
    }
    catch (error) {
        console.log("error", error);
    };
}

// Traer encuestas por ID
export const getEncuestaRespID = async function (idbusqueda) {
    let url = urlWebServices.getEncuestaRespID;
    const formData = new URLSearchParams();
    formData.append('idbusqueda', idbusqueda);

    try {
        let response = await fetch(url, {
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });
        if (response.status === 200) {
            let data = await response.json();

            let listaEncuestaID = data.data.docs;
            return listaEncuestaID;
        }
        else {
            let vacio = [];
            console.log("No hay encuestas por ese ID")
            return (vacio);

        }
    }
    catch (error) {
        console.log("error", error);
    };
}

//Editar encuestas
export const updateEncuesta = async function (id, titulo, sector, tamaño) {
    let url = urlWebServices.updateEncuesta;
    const formData = new URLSearchParams();

    formData.append('id', id);
    formData.append('titulo', titulo);
    formData.append('sector', sector);
    formData.append('tamaño', tamaño);

    try {
        let response = await fetch(url, {
            method: 'PUT', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (response.status === 201) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("error", error);
        return false;
    };
}

//Borrar encuestas
export const deleteEncuesta = async function (id_encuesta) {
    let url = urlWebServices.deleteEncuesta;
    const formData = new URLSearchParams();
    formData.append('id', id_encuesta);

    try {
        let response = await fetch(url, {
            method: 'POST', // or 'PUT'
            mode: "cors",
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'x-access-token': localStorage.getItem('x'),
                'Origin': 'http://localhost:3000',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (response.status === 201) {
            return true;

        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("error", error);
        return false;
    };
}