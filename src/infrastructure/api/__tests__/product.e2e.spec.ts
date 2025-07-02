import ProductModel from "../../product/repository/sequelize/product.model";
import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for products", () => {
  beforeEach(async () => {
    sequelize.addModels([ProductModel]);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const product1 = {
      id: "123",
      name: "Product A",
      price: 50,
    };
    const product2 = {
      id: "124",
      name: "Product B",
      price: 60,
    };

    await ProductModel.create(product1);
    await ProductModel.create(product2);
    const response = await request(app).get("/products").send();

    expect(response.status).toBe(200);
    expect(response.body.products).toBeDefined();

    const resultProduct01 = response.body.products[0];
    expect(resultProduct01.id).toBe(product1.id);
        expect(resultProduct01.name).toBe(product1.name);
    expect(resultProduct01.price).toBe(product1.price);
    
  });
});
