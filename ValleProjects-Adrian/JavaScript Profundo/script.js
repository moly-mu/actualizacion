// Funciones de conversión

function convertirMetrosAKilometros(metros) {
    return new Promise((resolve, reject) => {
        if (typeof metros !== 'number') {
            reject('El valor debe ser un número');
        } else {
            const kilometros = metros / 1000;
            resolve(kilometros);
        }
    });
}

function convertirKilometrosAMetros(kilometros) {
    return new Promise((resolve, reject) => {
        if (typeof kilometros !== 'number') {
            reject('El valor debe ser un número');
        } else {
            const metros = kilometros * 1000;
            resolve(metros);
        }
    });
}

// Manejo de eventos

document.getElementById('convertirMetros').addEventListener('click', () => {
    const metros = parseFloat(document.getElementById('metros').value);
    convertirMetrosAKilometros(metros)
        .then(kilometros => {
            document.getElementById('resultadoMetros').innerText = `${metros} metros son ${kilometros} kilómetros.`;
        })
        .catch(error => {
            document.getElementById('resultadoMetros').innerText = error;
        });
});

document.getElementById('convertirKilometros').addEventListener('click', () => {
    const kilometros = parseFloat(document.getElementById('kilometros').value);
    convertirKilometrosAMetros(kilometros)
        .then(metros => {
            document.getElementById('resultadoKilometros').innerText = `${kilometros} kilómetros son ${metros} metros.`;
        })
        .catch(error => {
            document.getElementById('resultadoKilometros').innerText = error;
        });
});
