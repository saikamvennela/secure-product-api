import { Request, Response, NextFunction } from "express";
import { products } from "../data/products";
import { Product } from "../types/product";

// GET ALL PRODUCTS
export const getProducts = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// GET PRODUCT BY ID
export const getProductById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const id = Number(req.params.id);

    const product = products.find((product) => product.id === id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found"
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// CREATE PRODUCT
export const createProduct = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const newProduct: Product = {
      id:
        products.length > 0
          ? Math.max(...products.map((product) => product.id)) + 1
          : 1,

      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
      stock: Number(req.body.stock),
      description: req.body.description
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE PRODUCT
export const updateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const id = Number(req.params.id);

    const productIndex = products.findIndex(
      (product) => product.id === id
    );

    if (productIndex === -1) {
      res.status(404).json({
        success: false,
        message: "Product not found"
      });

      return;
    }

    products[productIndex] = {
      ...products[productIndex],
      name: req.body.name,
      price: Number(req.body.price),
      category: req.body.category,
      stock: Number(req.body.stock),
      description: req.body.description
    };

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: products[productIndex]
    });
  } catch (error) {
    next(error);
  }
};

// DELETE PRODUCT
export const deleteProduct = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const id = Number(req.params.id);

    const productIndex = products.findIndex(
      (product) => product.id === id
    );

    if (productIndex === -1) {
      res.status(404).json({
        success: false,
        message: "Product not found"
      });

      return;
    }

    products.splice(productIndex, 1);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};