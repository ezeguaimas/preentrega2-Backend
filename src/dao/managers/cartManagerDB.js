import cartsModel from "../models/cartModel.js";

export async function getCart(req, res) {
  try {
    const carts = await cartsModel.find();
    res.status(200).send(carts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error al obtener los carritos" });
  }
}

export async function createCart(req, res) {
  try {
    const cart = await cartsModel.create({ products: [] });
    res.status(201).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error al crear el carrito" });
  }
}

export async function getCartById(req, res) {
  try {
    const cartId = req.params.cid;
    const cart = await cartsModel.findOne({ _id: cartId });

    if (cart) {
      res.status(200).send(cart);
    } else {
      res.status(404).send({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error al obtener el carrito" });
  }
}

export async function addProductToCart(req, res) {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cart = await cartsModel.findById(cartId);

    if (!cart) {
      res.status(404).send({ error: "Carrito no encontrado" });
      return; 
    }

    const existingProduct = cart.products.find(
      (product) => product.product.toString() === productId
    );

    if (!existingProduct) {
      const updatedCart = await cartsModel.updateOne(
        { _id: cartId },
        { $push: { products: { product: productId }, quantity: 1 } },
        { new: true }
      );
      res.status(200).send(updatedCart);
    } else {
      const updatedCart = await cartsModel.updateOne(
        { _id: cartId, "products.product": productId },
        { $inc: { "products.$.quantity": 1 } },
        { new: true }
      );
      res.status(200).send(updatedCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error al agregar el producto al carrito" });
  }
}

export async function deleteProductFromCart(req, res) {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cart = await cartsModel.findOne({ _id: cartId });
    if (!cart) {
      res.status(404).send({ error: "Carrito no encontrado" });
    }
    const existingProduct = cart.products.find(
      (product) => product.product.toString() === productId
    );
    if (!existingProduct) {
      res.status(404).send({ error: "Producto no encontrado" });
      return;
    }
    if (existingProduct.quantity === 1) {
      const updatedCart = await cartsModel.updateOne(
        { _id: cartId },
        { $pull: { products: { product: productId }, quantity: 1 } },
        { new: true }
      );
      res.status(200).send(updatedCart);
    } else {
      const updatedCart = await cartsModel.updateOne(
        { _id: cartId, "products.product": productId },
        { $inc: { "products.$.quantity": -1 } },
        { new: true }
      );
      res.status(200).send(updatedCart);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: "Error al eliminar el producto del carrito" });
  }
}

export async function deleteCart(req, res) {
  try {
    const cartId = req.params.cid;
    const cart = await cartsModel.findOne({ _id: cartId });
    if (!cart) {
      res.status(404).send({ error: "Carrito no encontrado" });
      return;
    }
    const updatedCart = await cartsModel.deleteOne({ _id: cartId });
    res.status(200).send({ message: "Carrito eliminado" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Error al eliminar el carrito" });
  }
}

export default {
  getCart,
  createCart,
  getCartById,
  addProductToCart,
  deleteProductFromCart,
  deleteCart,
};
