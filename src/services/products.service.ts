import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  // 🔹 CREATE
  async create(data: any) {
    const product = new this.productModel(data);
    return product.save();
  }

  // 🔹 READ ONE
  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  // 🔹 UPDATE
  async update(id: string, data: any) {
    const product = await this.productModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  // 🔹 DELETE
  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException('Product not found');
    return { message: 'Product deleted successfully' };
  }

  // 🔹 SERVER SIDE LIST WITH FILTER + SORT + PAGINATION  ⭐ MAIN FUNCTION
  async findAllServer(filters: any) {
    const {
      page = 1,
      limit = 5,
      search = '',
      minPrice = '',
      maxPrice = '',
      sort = 'asc',
    } = filters;

    const query: any = {};

    // 🔹 SEARCH BY NAME
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // 🔹 PRICE RANGE FILTER
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 🔹 SORTING
    const sortOption = sort === 'asc' ? 1 : -1;

    // 🔹 PAGINATION
    const skip = (Number(page) - 1) * Number(limit);

    // 🔹 FETCH DATA
    const products = await this.productModel
      .find(query)
      .sort({ price: sortOption })
      .skip(skip)
      .limit(Number(limit));

    // 🔹 TOTAL COUNT (FOR PAGES)
    const total = await this.productModel.countDocuments(query);

    return {
      data: products,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    };
  }

  // 🔹 FILTER BY NAME (OLD SIMPLE API)
  async filterByName(name: string) {
    return this.productModel.find({
      name: { $regex: name, $options: 'i' },
    });
  }

  // 🔹 FILTER BY CREATED DATE
  async filterByDate(from: string, to: string) {
    return this.productModel.find({
      createdAt: {
        $gte: new Date(from),
        $lte: new Date(to),
      },
    });
  }

  // 🔹 FILTER BY STOCK AVAILABLE
  async filterByStock() {
    return this.productModel.find({
      stock: { $gt: 0 },
    });
  }
}

