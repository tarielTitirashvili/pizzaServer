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
  const { images, title, category, rating, price, types, sizes, quantity } = req.query;
  try {
    const createdCategory: TCategory = await Category.create({});
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
export default {
  getAll,
  create,
  deleteCategory,
};
