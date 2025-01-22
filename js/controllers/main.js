/* import { servicesProducts } from "../services/product-service.js";

const productContainers = document.querySelector("[data-product]");

const form = document.querySelector("[data-form]");

function createCard({name,price,image,id}){
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div data-product class="productos">
            <figure class="imagen_producto">
                <img data-image class="imagen_preview" src="${image}" alt="imagen producto">
                <div class="caracteristicas_producto">
                    <p data-name class="nombre_producto">${name}</p>
                    <p data-price class="precio_producto">${price}</p>
                    <button class="eliminar_producto" data-id="${id}">
                        <img class="eliminar_icon" src="./assets/icono_eliminar.png" alt="Eliminar producto">
                    </button>
                </div>
            </figure>
        </div>
    
    `;

    return card;

}

const renderProducts = async() => {
    try{
        const listProducts = await servicesProducts.productList();
        listProducts.forEach(product => {
            const productCard =createCard(product);
            productContainers.appendChild(productCard);
            
        });

    } catch (error){
        console.log(error);
    }
}

form.addEventListener("submit" , async (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image= document.querySelector("[data-image]").value;

    /* console.log(name);
    console.log(price);
    console.log(image); 
    try{
        const newProduct = await servicesProducts.createProduct(name, price, image);
        const newCard =createCard(newProduct);
        productContainers.appendChild(newCard);

    }catch (error){
        console.log(error)
    }

    form.reset();

})

renderProducts(); */

import { servicesProducts } from "../services/product-service.js";

const productContainers = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

// Función para crear la tarjeta de un producto
function createCard({ name, price, image, id }) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div data-product class="productos">
            <figure class="imagen_producto">
                <img data-image class="imagen_preview" src="${image}" alt="imagen producto">
                <div class="caracteristicas_producto">
                    <p data-name class="nombre_producto">${name}</p>
                    <p data-price class="precio_producto">${price}</p>
                    <button class="eliminar_producto" data-id="${id}">
                        <img class="eliminar_icon" src="./assets/icono_eliminar.png" alt="Eliminar producto">
                    </button>
                </div>
            </figure>
        </div>
    `;

    // Añadir el evento de eliminación
    const deleteButton = card.querySelector(".eliminar_producto");
    deleteButton.addEventListener("click", async (e) => {
        const productId = e.target.closest(".eliminar_producto").getAttribute("data-id");
        try {
            await servicesProducts.deleteProduct(productId);
            card.remove();  // Elimina la tarjeta del DOM
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    });

    return card;
}

// Función para renderizar productos en el contenedor
const renderProducts = async () => {
    productContainers.innerHTML = ''; // Limpiar el contenedor antes de renderizar los nuevos productos
    try {
        const listProducts = await servicesProducts.productList();
        listProducts.forEach(product => {
            const productCard = createCard(product);
            productContainers.appendChild(productCard);
        });
    } catch (error) {
        console.log("Error al cargar los productos:", error);
    }
}

// Evento de submit del formulario para agregar un producto
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    // Validación de formulario: verificar que todos los campos estén completos
    if (!name || !price || !image) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        // Crear el nuevo producto
        const newProduct = await servicesProducts.createProduct(name, price, image);

        // Crear la tarjeta del nuevo producto y agregarla al contenedor
        const newCard = createCard(newProduct);
        productContainers.appendChild(newCard);

        console.log();

        // Limpiar el formulario después de enviar
        form.reset();

        // Recargar la lista de productos (esto asegura que los productos estén actualizados)
        renderProducts();

        console.log();

    } catch (error) {
        console.log("Error al agregar el producto:", error);
    }

    console.log();
    return;
    console.log();


});

// Inicializa la carga de productos al cargar la página
renderProducts();





 

