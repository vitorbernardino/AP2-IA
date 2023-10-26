const cadastrarRegra = async () => {
    const nomeRegra = document.getElementById('nome-regra').value
    if(nomeRegra != ''){
        let arrChildrenContainerRegras = Array.prototype.slice.call(containerRegras.children)
        let arr = arrChildrenContainerRegras.filter((el) => el.id != '')
        let retorno = document.getElementById('valores-acao').value
        let arrValues = arr.map((val) => val.value.toLowerCase().replace(/\s/g, ""))

        const data = {
            var: nomeRegra,
            values: arrValues,
            retorno: retorno
        }

        enviarBanco(data, 'regras/')
    }  
}


const enviarBanco = async (obj, route) => {
    const OPTIONS = {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json' 
        }
    }

    fetch(route, OPTIONS)
}