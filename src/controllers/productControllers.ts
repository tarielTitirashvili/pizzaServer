import { Request, Response } from 'express';
import { TCategory } from '../interfaces/category';
import { IProduct } from '../interfaces/product';
import Product from '../models/product';

const getAll = async (req: Request, res: Response) => {
  try {
    await Product.find()
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
const create = async (req: Request<{}, {}, IProduct>, res: Response) => {
  const { images, title, category, rating, price, types, sizes } = req.body;
  try {
    const createProduct = await Product.create<IProduct>({
      images,
      title,
      category,
      rating,
      price,
      types,
      sizes,
    });
    res.status(200).json({
      createProduct,
    });
  } catch (e) {
    res.json({ message: "couldn't create category", e });
  }
};
const deleteCategory = async (req: Request, res: Response) => {
  const category: string = req.params.category;
  try {
    const deletedCategory: TCategory | null = await Product.findOneAndDelete({
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
