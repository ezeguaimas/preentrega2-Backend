import Router from "express";
import productsModel from "../dao/models/productsModel.js";
import cartsModel from "../dao/models/cartModel.js";
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

router.get("/product/:id", async (req, res) => {
  const product = await productsModel.findById(req.params.id).lean();
  console.log(`Views Router ${product}`);
  res.render("product", {
    title: "E-Commerce Random",
    style: "/styles/product.css",
    product: product,
  });
})

router.get("/cart/:id", async (req, res) => {
  const cartId = req.params.id;
  const cart = await cartsModel.findById(cartId).lean();
  res.render("cart", {
    title: "E-Commerce Random",
    style: "/styles/cart.css",
    cart: cart,
  });
})

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
