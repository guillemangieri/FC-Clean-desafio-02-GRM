import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("228", "Produto atualizado", 20);
    await productRepository.create(product);

    const useCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "228",
      name: "Produto Atualizado",
      price: 20,
    };

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: "228",
      name: "Produto Atualizado",
      price: 20,
    });

    const productModel = await ProductModel.findOne({ where: { id: "228" } });
    expect(productModel.name).toBe("Produto Atualizado");
    expect(productModel.price).toBe(20);
  });


});
