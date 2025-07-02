import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.get("/", async (req: Request, res: Response) => {
  const useCase = new ListProductUseCase(new ProductRepository());

  try {
    const outPut = await useCase.execute({});
    console.log("Produtos listados", outPut);
    res.status(200).send(outPut);
  } catch (error) {
    res.status(500).send(error);
  }
});