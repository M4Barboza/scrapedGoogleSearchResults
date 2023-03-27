const divResultados = document.querySelector('#resultados');
const btnBusca = document.querySelector('.btnBusca');
//import { getOrganicData } from "../app.js"; //Não consegui resolver o problema com a importação para utiliza a função

//btnSearch.addEventListener("click", getOrganicData(Pedra));

async function getResultados() {
    let retornoPromise = await (await fetch('http://localhost:3000/')).json();
    const resultados = retornoPromise;
    preencheTela(resultados)


}

function preencheTela(resultados) {

    resultados.forEach(resultado => {
        let linkCorreto = resultado.links.substring(7);
        console.log(linkCorreto);


        const resultadoHTML =
            `
        <div class="result">
            <h3 class="title">${resultado.title}</h3>
            <a class="link" href="">${linkCorreto}</a>
        </div>
        `
        divResultados.innerHTML = divResultados.innerHTML + resultadoHTML
    });
}



getResultados();