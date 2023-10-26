const container = document.getElementById('values-container');

function addInputField() {
    let input = document.createElement('input');
    input.type = 'text';
    input.name = 'variableValues[]';
    input.required = true;
    container.appendChild(input);
}

function limparCampos(){ 
    container.innerHTML = '';
    let input = document.createElement('input');
    input.type = 'text'
    input.required = true;
    input.name = "variableValues[]";
    container.appendChild(input);
}

function enviarVariavel(){
    const form = document.getElementById('variable-form')
    const varName = form.elements['variableName'].value
    let variableValues = []
    const valueInputs = form.elements['variableValues[]']


    if(!valueInputs.length){
        variableValues = [valueInputs.value]
    }else{
        for (let i = 0; i < valueInputs.length; i++){
            variableValues.push(valueInputs[i].value)
        }
    }
    
    const data = {
        "varName": varName,
        "values": variableValues
    }

    const OPTIONS = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json' 
        }
    }
    fetch('/vars', OPTIONS)
    
    limparCampos()
}