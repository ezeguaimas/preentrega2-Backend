import express from "express";
import ProductManager from "../dao/managers/productManagerDB.js";
const router = express.Router();

const productManager = new ProductManager();

router.get("/", productManager.getProducts);

router.get("/:pid", productManager.getProductById);

router.post("/", productManager.addProduct);

router.put("/:pid", productManager.updateProduct);

router.delete("/:pid", productManager.deleteProduct);

router.post("/upload", productManager.uploadProducts);

export default router;
