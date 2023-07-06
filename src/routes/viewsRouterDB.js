import Router from "express";
import productsModel from "../dao/models/productsModel.js";
const router = Router();

router.get("/", async (req, res) => {
  const products = await productsModel.find().lean();
  console.log(`Views Router ${products}`);
  res.render("home", {
    title: "E-Commerce Random",
    style: "/styles/products.css",
    products: products,
  });
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {
    title: "E-Commerce Random",
    style: "/styles/products.css",
  });
});

router.get("/chat", async (req, res) => {
  res.render("chat", {
    title: "Chat",
    style: "/styles/chat.css",
  });
});

export default router;
