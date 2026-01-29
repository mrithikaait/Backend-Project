import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(data: any) {
    const product = new this.productModel(data);
    return product.save();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, data: any) {
    const product = await this.productModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  
  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException('Product not found');
    return { message: 'Product deleted successfully' };
  }


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

    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sortOption = sort === 'asc' ? 1 : -1;

    
    const skip = (Number(page) - 1) * Number(limit);

    
    const products = await this.productModel
      .find(query)
      .sort({ price: sortOption })
      .skip(skip)
      .limit(Number(limit));

    const total = await this.productModel.countDocuments(query);

    return {
      data: products,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    };
  }

  
  async filterByName(name: string) {
    return this.productModel.find({
      name: { $regex: name, $options: 'i' },
    });
  }

  async filterByDate(from: string, to: string) {
    return this.productModel.find({
      createdAt: {
        $gte: new Date(from),
        $lte: new Date(to),
      },
    });
  }


  async filterByStock() {
    return this.productModel.find({
      stock: { $gt: 0 },
    });
  }
}

