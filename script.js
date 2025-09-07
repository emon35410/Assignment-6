const loadButton = ()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res=>res.json())
    .then((json)=> displayButton(json.categories))
}

const displayButton = (categories)=>{
    const  buttonContainer = document.getElementById("button-container")
    buttonContainer.innerHTML=""
    categories.forEach(categorie=>{
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML =`
        <button class="bg-green-700 text-white px-4 my-3 py-1 w-50 text-start rounded-lg hover:cursor-pointer hover:bg-red-300">
                                ${categorie.category_name}
                            </button>
        `
        buttonContainer.append(btnDiv)
    })
}
loadButton()