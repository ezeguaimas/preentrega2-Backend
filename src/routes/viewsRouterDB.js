import Router from "express";
import productsModel from "../dao/models/productsModel.js";
import cartsModel from "../dao/models/cartModel.js";
import ProductManagerDB from "../dao/managers/productManagerDB.js";
const router = Router();

router.get("/products", async (req, res) => {
  const products = await productsModel.find().lean();
  res.render("home", {
    title: "E-Commerce Random",
    style: "/styles/products.css",
    products: products,
  });
});

router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, category, available } = req.query;
    const baseUrl = `${req.protocol}://${req.get("host")}${
      req.originalUrl.split("?")[0]
    }`;
    const productManager = new ProductManagerDB();
    const products = await productManager.getProducts(
      limit,
      page,
      sort,
      category,
      available,
      baseUrl
    );
    res.render("productList", {
      title: "E-Commerce Random",
      style: "/styles/productList.css",
      products: products,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.id).lean();
    res.render("product", {
      title: "E-Commerce Random",
      style: "/styles/productDetail.css",
      product: product,
    });
  } catch (error) {
    res.status(404).send({ error: "Producto inexistente" });
  }
});

router.get("/cart/:id", async (req, res) => {
  try {
    const cartId = req.params.id;
    const cart = await cartsModel
      .findById(cartId)
      .populate("products.product")
      .lean();

    if (!cart || !cart.products || cart.products.length === 0) {
      const message = "No hay productos en el carrito.";
      return res.render("cart", {
        title: "E-Commerce Random",
        style: "/styles/cart.css",
        cart: null,
        message: message,
      });
    }

    res.render("cart", {
      title: "E-Commerce Random",
      style: "/styles/cart.css",
      cart: cart,
    });
  } catch (error) {
    res.status(404).send({ error: "Carrito inexistente" });
  }
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
