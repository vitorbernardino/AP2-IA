const submitBtn = document.getElementById('submit')


document.getElementById('return').addEventListener('click', function () {
    window.location.href = "/";
})

submitBtn.addEventListener('click', async function (){
    const q1 = document.querySelector('input[name="q1"]:checked')
    const q2 = document.querySelector('input[name="q2"]:checked')
    const q3 = document.querySelector('input[name="q3"]:checked')

    q1Class = q1.className

    if(document.querySelector('input[name="q4"]:checked')){
        const q4 = document.querySelector('input[name="q4"]:checked')
    }
    
    const answers = {
        q1Class: q1.value,
        q2: document.querySelector('input[name="q2"]:checked').value,
        q3: document.querySelector('input[name="q3"]:checked').value,
        q4: document.querySelector('input[name="q4"]:checked')?.value
    }

    compararRespostas(answers)
})

async function compararRespostas(obj){
    const regras = await acessarRegras();
    let arr = []
    const pEl = document.getElementById('resultado-element')
    for(let x in obj){
        if(obj[x] != undefined){
            arr.push(obj[x])
        }
    }

    for(let key in regras){
        const isEqual = JSON.stringify(regras[key].values) == JSON.stringify(arr);
        if(isEqual){
            pEl.textContent = regras[key].retorno
            console.log(regras[key].retorno)
        }
    }
}

async function acessarRegras(){
    const response = await fetch('/regrasFile')
    const json = await response.json()
    return json
}
