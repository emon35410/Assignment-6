


const loadButton = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then((json) => displayButton(json.categories))

        loadAllButton()
}

const manageSpinner = (status)=>{
    if(status === true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("card-container").classList.add("hidden")
    }
    else {
         document.getElementById("spinner").classList.add("hidden")
        document.getElementById("card-container").classList.remove("hidden")
    }
}

const loadTreeDetails = (id)=>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(details=>displayLoadTreeDetails(details.plants))
}
const displayLoadTreeDetails =(detail=>{
    const detailsContainer = document.getElementById("details-container")
    detailsContainer.innerHTML=`
       <div class="space-x-4">
            <h1 class="font-bold">${detail.name}</h1>
            <img class="max-w-[400px] max-h-[300px] w-full h-auto rounded-lg" src="${detail.image}" alt="">
            <h2><span class="font-bold ">Category:</span> ${detail.category}</h2>
            <h3><span class="font-bold">Price:</span> ৳${detail.price}</h3>
            <p><span class="font-bold">Description:</span> ${detail.description}</p>
        </div>
    `
    document.getElementById("my_modal_5").showModal();
})
const loadAllButton =()=>{
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res=>res.json())
    .then(button=>displayAllButton(button.plants))
}
const displayAllButton =(plant)=>{
    const allButtonContainer = document.getElementById("card-container")
    allButtonContainer.innerHTML=""
    plant.forEach(card=>{
        const plantDiv = document.createElement("div")
        plantDiv.innerHTML =`
            <div class="tree-card bg-white shadow-sm rounded-lg p-4 space-y-3">
                            <img class="bg-[#EDEDED] rounded-lg w-full h-40 object-cover" src="${card.image}"
                                alt="">
                            <h2 onclick="loadTreeDetails(${card.id})" class="text-2xl font-bold hover:cursor-pointer">${card.name}</h2>
                            <p class="text-[#1f293763] text-sm">${card.description}</p>
                            <div class="flex justify-between items-center">
                                <button class="bg-[#DCFCE7] px-3 py-1 text-sm text-green-800 rounded-full">${card.category}</button>
                                <h3 class="font-semibold">৳${card.price}</h3>
                            </div>
                            <button onclick = "addTocart('${card.name}',${card.price})"
                                class="w-full bg-green-700 text-white py-2 rounded-full text-center font-medium hover:bg-green-400 hover:cursor-pointer transition">Add
                                to Cart</button>
                        </div>
        `
        allButtonContainer.append(plantDiv)
    })
}


const removeActive = ()=>{
    const activeBtn = document.querySelectorAll(".tree-class")
    activeBtn.forEach((btn)=>btn.classList.remove("active"))
}
const loadLevelCard = (id) => {
    manageSpinner(true);
    const url = (`https://openapi.programming-hero.com/api/category/${id}`)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`btn-${id}`)
            clickBtn.classList.add("active")
            displayCard(data.plants)
        })
}
const displayCard = (plants) => {
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = ""
    plants.forEach(plant => {
        const cardDiv = document.createElement("div")
        cardDiv.innerHTML = `
    <div class="tree-card bg-white shadow-sm rounded-lg p-4 space-y-3">
                            <img class="bg-[#EDEDED] rounded-lg w-full h-40 object-cover" src="${plant.image}"
                                alt="">
                            <h2 onclick="loadTreeDetails(${plant.id})" class="text-2xl font-bold hover:cursor-pointer">${plant.name}</h2>
                            <p class="text-[#1f293763] text-sm">${plant.description}</p>
                            <div class="flex justify-between items-center">
                                <button class="bg-[#DCFCE7] px-3 py-1 text-sm text-green-800 rounded-full">${plant.category}</button>
                                <h3 class="font-semibold">৳${plant.price}</h3>
                            </div>
                            <button onclick = "addTocart('${plant.name}',${plant.price})"
                                class="w-full bg-green-700 text-white py-2 rounded-full text-center font-medium hover:bg-green-400 hover:cursor-pointer transition">Add
                                to Cart</button>
                        </div>
    `
        cardContainer.append(cardDiv)
    })
    manageSpinner(false)
}




const displayButton = (categories) => {
    const buttonContainer = document.getElementById("button-container")
    buttonContainer.innerHTML = ""
    categories.forEach(categorie => {
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
        <button id="btn-${categorie.id}" onclick="loadLevelCard(${categorie.id})" class="bg-green-700 text-white px-4 my-3 py-1 w-50 text-start rounded-lg hover:cursor-pointer hover:bg-blue-600 tree-class ">
                                ${categorie.category_name}
                            </button>
        `
        buttonContainer.append(btnDiv)
    })
}
loadButton()

// for total price calculation
let cart = []
const addTocart = (name, price) => {
    cart.push({ name, price })
    displayCart()
}
const displayCart = () => {
    const cartContainer = document.getElementById("cart-container")
    const totalPrice = document.getElementById("total-price")
    cartContainer.innerHTML = ""

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price

        const totalDiv = document.createElement("div")
        totalDiv.innerHTML = `
            <span>${item.name}</span> <br>
            <span>Price:৳${item.price}</span>
            <button onclick="removeFromCart(${index})" 
                class=" text-red-500  rounded hover:bg-green-700">X</button>
        `
        cartContainer.appendChild(totalDiv)

    })
    totalPrice.innerText = `Total: ৳${total}`;
}

const removeFromCart = (index) => {
    cart.splice(index, 1)
    displayCart()
}