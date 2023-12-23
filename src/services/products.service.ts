
class ProductsService {

  async getProducts() {
    return fetch('/api/getProducts', {
      headers: {
        'x-userid': window.userId,
      }
    });
  }

  async getPopularProducts() {
    return fetch('/api/getPopularProducts', {
      headers: {
        'x-userid': window.userId,
      }
    });
  }
}

export const productsService = new ProductsService();