const formRegras = document.getElementById('form-regras')
const {categoria} = formRegras;
const containerRegras = document.getElementById('container-regras')
const containerAcao = document.getElementById('container-acao')
const variaveisAcaoElement = document.getElementById('variaveis-acao')
const valorAcaoElement = document.getElementById('valores-acao');

let valorCategoria = categoria.value;

categoria.addEventListener('change', async () => {
    valorCategoria = categoria.value
    popularRegras(valorCategoria)
})

const popularRegras = async (valorCategoria) => {
    containerRegras.innerHTML = ''
    const response = await fetch(`/vars/${valorCategoria}`)
    const valoresAcao = await response.json()
    let vars = []
    if(valorCategoria == 'cpu'){
        vars = ['processador', 'socket', 'performace_gpu']
        //valorAcao(valorCategoria)
    }
    else if(valorCategoria == 'gpu'){
        vars = ['marca_gpu', 'finalidade', 'desempenho_cpu', 'potencia_fonte']
        //valorAcao(valorCategoria)
    }
    else if(valorCategoria == 'armazenamento'){
        vars = ['tipo_armazenamento', 'suporte_NVMe', 'espaco']
        //valorAcao(valorCategoria)
    }
    else if(valorCategoria == 'ram'){
        vars = ['tipo_ram', 'mhz_ram', 'capacidade_ram', 'slots_ram']
        //valorAcao(valorCategoria)
    }
    
    for(let key of vars){
            let response = await fetch(`/vars/${key}`)
            let valoresVariaveis = await response.json()
            
            criarElementos(valoresVariaveis.varName, valoresVariaveis.values)
        }
}

const criarElementos = (nome, valores) => {
    const select = document.createElement('select');
    select.name = nome;
    select.id = nome;
    
    const pElement = document.createElement('p')
    pElement.textContent = nome;
    for(let valor of valores){
        let opt = document.createElement('option')
        opt.value = valor
        opt.id = valor
        opt.textContent = valor
        select.appendChild(opt)
    }

    containerRegras.appendChild(pElement)
    containerRegras.appendChild(select)
}

const valorAcao = async (varName) => {
    console.log('alouuu')
    valorAcaoElement.innerHTML = ''
    const response = await fetch(`/vars/${varName}`)
    const json = await response.json()
    const valores = json.values
    
    console.log(valores)
    for(let valor of valores){
        let opt = document.createElement('option')
        opt.value = valor
        opt.id = valor
        opt.textContent = valor
        valorAcaoElement.appendChild(opt)
    }
}

async function variaveisAcao(){
    const response = await fetch(`/variaveis`)
    const json = await response.json()

    for(let x in json){
        let opt = document.createElement('option')
        opt.value = json[x].varName
        opt.id = json[x].varName
        opt.textContent = json[x].varName
        variaveisAcaoElement.appendChild(opt)
    }
}

variaveisAcaoElement.addEventListener('change', async () => {
    valorAcao(variaveisAcaoElement.value)
})

window.addEventListener('load', async () => {
    popularRegras(categoria.value)
    variaveisAcao()
})
