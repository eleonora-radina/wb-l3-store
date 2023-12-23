import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favourites';

class FavouriteService {
  init() {
    this._updCounters();
    this._displayFavBtn();
  }

  async toggleProduct(product: ProductData) {
    if (!await this.isInFav(product)) {
      await this.addProduct(product);
    } else {
      await this.removeProduct(product);
    }  
  }

  async addProduct(product: ProductData) {
    const products = await this.get();
    await this.set([...products, product]);
  }

  async removeProduct(product: ProductData) {
    const products = await this.get();
    await this.set(products.filter(({ id }) => id !== product.id));
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(DB, data);
    this._displayFavBtn();
    this._updCounters();
  }

  async isInFav(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _updCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;

    //@ts-ignore
    document.querySelectorAll('.js__fav-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
  }

  private async _displayFavBtn() {
    const products = await this.get();
    const fav = document.querySelector('.fav');
    if (products.length < 1) {
      fav?.classList.add('hide');
    } else {
      fav?.classList.remove('hide');
    }
  }
}

export const favouriteService = new FavouriteService();
