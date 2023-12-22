import { userService } from '../services/user.service';

class ProductsService {

  async getProducts() {
    let userId = await userService.getId();
    return fetch('/api/getProducts', {
      headers: {
        'x-userid': userId,
      }
    });
  }

  async getPopularProducts() {
    let userId = await userService.getId();
    return fetch('/api/getPopularProducts', {
      headers: {
        'x-userid': userId,
      }
    });
  }
}

export const productsService = new ProductsService();