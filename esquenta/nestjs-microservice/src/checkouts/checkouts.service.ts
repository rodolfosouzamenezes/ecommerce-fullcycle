import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { Checkout } from './entities/checkout.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

const PRODUCTS_LIST = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is a product description',
    image_url: 'https://via.placeholder.com/150',
    price: 100,
    category_id: 1,
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is a product description',
    image_url: 'https://via.placeholder.com/150',
    price: 200,
    category_id: 1,
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is a product description',
    image_url: 'https://via.placeholder.com/150',
    price: 300,
    category_id: 2,
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'This is a product description',
    image_url: 'https://via.placeholder.com/150',
    price: 400,
    category_id: 2,
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'This is a product description',
    image_url: 'https://via.placeholder.com/150',
    price: 500,
    category_id: 1,
  },
];

@Injectable()
export class CheckoutsService {
  constructor(
    @InjectRepository(Checkout) private checkoutRepo: Repository<Checkout>,
  ) {}

  async create(createCheckoutDto: CreateCheckoutDto) {
    const productIds = createCheckoutDto.items.map((item) => item.product_id);
    const products = PRODUCTS_LIST.filter((product) =>
      productIds.includes(product.id),
    );

    const checkout = Checkout.create({
      items: createCheckoutDto.items.map((item) => {
        const product = products.find((p) => p.id === item.product_id);

        return {
          quantity: item.quantity,
          price: product.price,
          product: {
            product_id: product.id,
            name: product.name,
            description: product.description,
            image_url: product.image_url,
          },
        };
      }),
    });

    await this.checkoutRepo.save(checkout);

    return checkout;
  }

  findAll() {
    return this.checkoutRepo.find();
  }

  findOne(id: number) {
    return this.checkoutRepo.findOneByOrFail({ id });
  }

  update(id: number, updateCheckoutDto: UpdateCheckoutDto) {
    return `This action updates a #${id} checkout`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkout`;
  }
}