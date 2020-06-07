function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (var state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}`
            }
        })
}
populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a Cidade </option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (var city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}`
            }

            citySelect.disabled = false
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")
for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectItem)
}
//atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectItem(event){
    const itemLi = event.target

    //toggle adiciona ou remove uma classe com o js
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // console.log('Item id:', itemId)
    //verificar se existem items selecionados, se sim
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId //true or false
        return itemFound
    })

    //se já estiver selecionado, 
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
        //se não estiver selecionado 
    }else{
        //adicionar a seleção com
        selectedItems.push(itemId)
    }

    // console.log('selectedItems: ', selectedItems)

    collectedItems.value = selectedItems

}