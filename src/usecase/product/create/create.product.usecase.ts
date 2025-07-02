
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase{
    private productRepository: ProductRepositoryInterface ;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        input.type = input.type || "a"; // Default value for type
        const product = ProductFactory.create(input.type, input.name, input.price);
        const newProduct = product as Product;
        await this.productRepository.create(newProduct);
        return {
            id: newProduct.id,
            name: newProduct.name,
            price: newProduct.price,
        };
    }
}