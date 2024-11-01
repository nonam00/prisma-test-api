import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/products", async (_, res) => {
  const products = await prisma.product.findMany({
    include: { brand: true }
  });
  res.json(products);
});


app.post("/products", async (req, res) => {
  const result = await prisma.product.create({
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

app.get("/brands", async (_, res) => {
  const brands = await prisma.brand.findMany();
  res.json(brands);
});

app.post("/brands", async (req, res) => {
  const result = await prisma.brand.create({
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

app.listen(5000, () => console.log("started..."));
