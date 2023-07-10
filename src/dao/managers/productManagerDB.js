import productsModel from "../models/productsModel.js";

class ProductManagerDB {
  constructor() {
    this.productsModel = productsModel;
  }

 async getProducts(req, res) {
   try {
     const limit = req.query.limit;
     const products = await productsModel.find();
     if (limit) {
       const limitedProducts = products.slice(0, limit);
       res.status(200).send(limitedProducts);
     } else {
       res.status(200).send(products);
     }
   } catch (error) {
     res.status(500).send({ error: "Error al obtener los productos" });
   }
 }

  async getProductById(req, res) {
    try {
      const productId = req.params.pid;
      const product = await productsModel.findOne({ _id: productId });

      if (product) {
        res.status(200).send({ product });
      } else {
        res.status(404).send({ error: "Producto no encontrado" });
      }
    } catch (error) {
      throw new Error("Error al obtener el producto");
    }
  }

  async addProduct(req, res) {
    try {
      const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      } = req.body;

      if (
        !title ||
        !description ||
        !code ||
        !price ||
        !status ||
        !stock ||
        !category
      ) {
        return res
          .status(400)
          .send({ error: "Todos los campos son obligatorios" });
      }
      const codeRepeat = await productsModel.findOne({ code: code });
      if (codeRepeat) {
        return res
          .status(400)
          .send({ error: "El código del producto ya existe" });
      } else {
        const newProduct = await productsModel.create({
          title: title,
          description: description,
          code: code,
          price: price,
          status: status,
          stock: stock,
          category: category,
          thumbnails: thumbnails,
        });
        res.status(200).send({ message: "Producto agregado exitosamente" });
      }
    } catch (error) {
      throw new Error("Error al agregar el producto");
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = req.params.pid;
      const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      } = req.body;

      if (
        !title ||
        !description ||
        !code ||
        !price ||
        !status ||
        !stock ||
        !category
      ) {
        return res
          .status(400)
          .send({ error: "Todos los campos son obligatorios" });
      }
      const codeRepeat = productsModel.findOne({ code: code });
      if (codeRepeat) {
        return res
          .status(400)
          .send({ error: "El código del producto ya existe" });
      } else {
        const product = await productsModel.findOne({ _id: productId });

        if (product === null) {
          res.status(404).send({ error: "Producto no encontrado" });
        } else {
          const updatedProduct = await productsModel.updateOne(
            { _id: productId },
            {
              title: title,
              description: description,
              code: code,
              price: price,
              status: status,
              stock: stock,
              category: category,
              thumbnails: thumbnails,
            }
          );
          res.status(200).send({ message: "Producto modificado exitosamente" });
        }
      }
    } catch (error) {
      throw new Error("Error al modificar el producto");
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.pid;
      const product = await productsModel.findOne({ _id: productId });

      if (product === null) {
        res.status(404).send({ error: "Producto no encontrado" });
      } else {
        const deletedProduct = await productsModel.deleteOne({
          _id: productId,
        });
        res.status(200).send({ message: "Producto eliminado exitosamente" });
      }
    } catch (error) {
      throw new Error("Error al eliminar el producto");
    }
  }

  async uploadProducts(req, res) {
    try {
      const result = await productsModel.insertMany([
        {
          title: "producto 1",
          description: "descripcion de producto 1",
          code: "abcx123",
          price: 200,
          status: true,
          stock: 25,
          category: "categoria producto 1",
          thumbnails: [],
        },
        {
          title: "producto 2",
          description: "descripcion de producto 2",
          code: "defx456",
          price: 150,
          status: true,
          stock: 10,
          category: "categoria producto 2",
          thumbnails: [],
        },
        {
          title: "producto 3",
          description: "descripcion de producto 3",
          code: "ghix789",
          price: 300,
          status: true,
          stock: 50,
          category: "categoria producto 3",
          thumbnails: [],
        },
        {
          title: "producto 4",
          description: "descripcion de producto 4",
          code: "jklx012",
          price: 180,
          status: true,
          stock: 15,
          category: "categoria producto 4",
          thumbnails: [],
        },
        {
          title: "producto 5",
          description: "descripcion de producto 5",
          code: "mnox345",
          price: 250,
          status: true,
          stock: 5,
          category: "categoria producto 5",
          thumbnails: [],
        },
        {
          title: "producto 6",
          description: "descripcion de producto 6",
          code: "pqr6x78",
          price: 350,
          status: true,
          stock: 30,
          category: "categoria producto 6",
          thumbnails: [],
        },
        {
          title: "producto 7",
          description: "descripcion de producto 7",
          code: "stux901",
          price: 190,
          status: true,
          stock: 20,
          category: "categoria producto 7",
          thumbnails: [],
        },
        {
          title: "producto 8",
          description: "descripcion de producto 8",
          code: "vwxx234",
          price: 280,
          status: true,
          stock: 8,
          category: "categoria producto 8",
          thumbnails: [],
        },
        {
          title: "producto 9",
          description: "descripcion de producto 9",
          code: "yzax567",
          price: 220,
          status: true,
          stock: 18,
          category: "categoria producto 9",
          thumbnails: [],
        },
        {
          title: "producto 10",
          description: "descripcion de producto 10",
          code: "bcdx890",
          price: 170,
          status: true,
          stock: 12,
          category: "categoria producto 10",
          thumbnails: [],
        },
        {
          title: "producto 11",
          description: "descripcion de producto 11",
          code: "abcx111",
          price: 600,
          status: true,
          stock: 19,
          category: "categoria producto 11",
          thumbnails: [],
        },
        {
          title: "producto 12",
          description: "descripcion de producto 12",
          code: "abcx222",
          price: 200,
          status: true,
          stock: 12,
          category: "categoria producto 12",
          thumbnails: [],
        },
        {
          title: "producto 13",
          description: "descripcion de producto 13",
          code: "abcx333",
          price: 233,
          status: true,
          stock: 13,
          category: "categoria producto 13",
          thumbnails: [],
        },
        {
          title: "producto 14",
          description: "descripcion de producto 14",
          code: "sdfxs14",
          price: 144,
          status: true,
          stock: 14,
          category: "categoria producto 14",
          thumbnails: [],
        },
        {
          title: "producto 15",
          description: "descripcion de producto 15",
          code: "sdfxs15",
          price: 155,
          status: true,
          stock: 15,
          category: "categoria producto 15",
          thumbnails: [],
        },
      ]);
      res.status(200).send({ message: "Productos agregados exitosamente" });
    } catch (error) {
      console.error(error);
      throw new Error("Error al agregar los productos");
    }
  }
}

export default ProductManagerDB;
