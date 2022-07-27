import { ObjectId } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { TCategory } from '../interfaces/category';
import Category from '../models/category';

const getAll = async (req: Request, res: Response) => {
  try {
    await Category.find()
      .select(['category'])
      .exec()
      .then((categories) => {
        console.log(categories);
        res.json({
          categories,
          count: categories.length,
        });
      });
  } catch (e) {
    res.json({
      message: "could't get users",
      e,
    });
  }
};
const create = async (req: Request, res: Response, next: NextFunction) => {
  const newCategory: string = req.params.category;
  try {
    const createdCategory: TCategory = await Category.create({
      category: newCategory,
    });
    res.status(200).json({
      createdCategory,
    });
  } catch (e) {
    res.json({ message: "couldn't create category", e });
  }
};
const deleteCategory = async (req: Request, res: Response) => {
  const category: string = req.params.category;
  try {
    const deletedCategory: TCategory | null = await Category.findOneAndDelete({
      category: category,
    });
    if (deleteCategory !== null) {
      res.status(200).json({
        deletedCategory,
      });
    }
  } catch (e) {
    res.json({ message: "couldn't delete category", e });
  }
};
const addProduct = async (req: Request, res: Response) => {
  const { category, id } = req.params;
  try {
    const dbCategory: TCategory | null = await Category.findOne({ category });
    if (dbCategory) {
      const addProduct: TCategory | null = await Category.findOneAndUpdate(
        {
          category: category,
        },
        {
          products: dbCategory?.products.length > 0 ? [...dbCategory?.products, id] : [id],
        },
      );
      if (deleteCategory !== null) {
        res.status(200).json({
          addProduct,
        });
      } else {
        res.status(500).json({ message: 'internal server error' });
      }
    } else {
      res.status(400).json({ message: "requested category don't exists" });
    }
  } catch (e) {
    res.json({ message: "couldn't update product", e });
  }
};
export default {
  getAll,
  create,
  deleteCategory,
  addProduct,
};
