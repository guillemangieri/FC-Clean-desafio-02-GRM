import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";



const product = ProductFactory.create("a","Artefato", 10);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product])),
  };
};

describe("Unit test for list product use case", () => {
  it("should list all products", async () => {
    const productRepository = MockRepository();
    const productListUseCase = new ListProductUseCase(productRepository);
    const output = await productListUseCase.execute({});

    expect(output.products.length).toBe(1);
    expect(output.products[0].id).toBe(product.id);
    expect(output.products[0].name).toBe(product.name);
    expect(output.products[0].price).toBe(product.price);
    expect(productRepository.findAll).toHaveBeenCalled();
  });
});
