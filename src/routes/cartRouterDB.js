import express from "express";
import cartManager from "../dao/managers/cartManagerDB.js";

const router = express.Router();

router.get("/", cartManager.getCart);

router.post("/", cartManager.createCart);

router.get("/:cid", cartManager.getCartById);

router.post("/:cid/product/:pid", cartManager.addProductToCart);

router.delete("/:cid/product/:pid", cartManager.deleteProductFromCart);

router.delete("/:cid", cartManager.deleteCart);

export default router;
