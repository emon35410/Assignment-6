const loadButton = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then((json) => displayButton(json.categories))
}



const loadLevelCard = (id) => {
    const url = (`https://openapi.programming-hero.com/api/category/${id}`)
    fetch(url)
        .then(res => res.json())
        .then(data => displayCard(data.plants))
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
                            <h2 class="text-lg font-semibold">${plant.name}</h2>
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
}

const displayButton = (categories) => {
    const buttonContainer = document.getElementById("button-container")
    buttonContainer.innerHTML = ""
    categories.forEach(categorie => {
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
        <button onclick="loadLevelCard(${categorie.id})" class="bg-green-700 text-white px-4 my-3 py-1 w-50 text-start rounded-lg hover:cursor-pointer hover:bg-red-300">
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
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">X</button>
        `
        cartContainer.appendChild(totalDiv)

    })
    totalPrice.innerText = `Total: ৳${total}`;
}

const removeFromCart = (index) => {
    cart.splice(index, 1)
    displayCart()
}