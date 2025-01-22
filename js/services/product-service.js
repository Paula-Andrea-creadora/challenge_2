 const BASE_URL = "https://678f8c1049875e5a1a925936.mockapi.io/products";


const productList =async () => {
    try{
        const response = await fetch(BASE_URL);
        const data =await response.json();
        return data;
    }
    catch (error){
        console.log("Error al listar productos" , error)
    }
}

/*crear producto*/

const createProduct = async (name, price, image) => {
    try {
        const response = await fetch(BASE_URL,{
            method:"POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body:JSON.stringify({name,price,image})
        });
        const data =await response.json();
        return data;

        console.log(createProduct());


    }catch (error){
        console.log("Error al crear productos", error)

    }
    
   
   
   
    return data;
    
} 



export const servicesProducts = {
    productList,
    createProduct,
}
