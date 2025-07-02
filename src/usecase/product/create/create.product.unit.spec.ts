import CreateProductUseCase from "./create.product.usecase";

const input = {
  type: "a",
  name: "Artefato",
  price: 10,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
  };
}

describe("Unit Test create product use case", () => {

  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
        id: expect.any(String),
        name: input.name,
        price: input.price,
    });

  });

  it("should throw an error where name is empty", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = "";

    await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error where price is negative", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.price = -1;
    input.name = "Product 1";
    input.type = "a";

    await expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
  });
  
});