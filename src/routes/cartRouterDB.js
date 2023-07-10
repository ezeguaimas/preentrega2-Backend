import express from "express";
import CartManager from "../dao/managers/cartManagerDB.js";
const router = express.Router();

const cartManager = new CartManager();

router.get("/", cartManager.getCart);

router.post("/", cartManager.createCart);

router.get("/:cid", cartManager.getCartById);

router.post("/:cid/product/:pid", cartManager.addProductToCart);

router.put("/:cid/product/:pid", cartManager.updateQuantity);

router.put("/:cid", cartManager.addProductAndQuantity);

router.delete("/:cid/product/:pid", cartManager.deleteProductFromCart);

router.delete("/:cid", cartManager.deleteAllProductsFromCart);

export default router;
