import { Router } from 'express';
import { v4 as uuid } from "uuid";
import { ensureAuth } from './middleware';


const router = Router();

interface ProductsDTO {
    name: string;
    description: string;
    price: number;
    id: string;
}

const products: ProductsDTO[] = [];

router.get("/products/findByName", (request, response) => {
    const { name } = request.query;
    const product = products.filter((p) => p.name.includes(String(name)));
    
    const productNotExist = products.find(
        (product) => product.name != name
    );

    if (productNotExist){
        return response.status(404).json({ message: "Produto não existe!"});
    }

    return response.json(product);
});

router.get("/products:id"), (request: any, response: any) => {
    const { id } = request.params;
    const product = products.find((product) => product.id === id);
    return response.json(product);
}

router.post("/products", ensureAuth, (request, response) =>{
    const { name, description, price } = request.body;

    const productAlreadyExist = products.find(
        (product) => product.name === name
    );

    if (productAlreadyExist) {
        return response.status(400).json({ message: "Produto já existe!" });
    }

    const product: ProductsDTO = {
        description,
        name,
        price,
        id: uuid()
    }

    products.push(product);

    return response.json(product);
});


router.put("/products/:id", ensureAuth, (request: any, response: any) =>{
    const { id } = request.params;
    const { name, description, price } = request.body;

    const productNotExist = products.findIndex(
        (product) => product.id === id);

    if (productNotExist === -1){
        return response.status(404).json({ message: "Produto não existe!"});
    }

    const product: ProductsDTO = Object.assign({
        name,
        description,
        price
    });

    products.push(product);

    return response.json(product);
})

export { router };