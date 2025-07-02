import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListCustomerDto } from "../../customer/list/list.customer.dto";
import { OutputListProductDto } from "./list.product.dto";


export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputListCustomerDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return OutputProductMapper.toOutputList(products);
  }
}

class OutputProductMapper {

  static toOutputList(products: Product[]): OutputListProductDto {
    return {
      products: products.map((product)=> ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),

    };
  }
}   