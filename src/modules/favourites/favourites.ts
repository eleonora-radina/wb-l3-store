import { Component } from '../component';
//import { Product } from '../product/product';
import html from './favourites.tpl.html';
import { favouriteService } from '../../services/favourites.service';
import { ProductData } from 'types';
import { ProductList } from '../productList/productList';

class Favourites extends Component {
  products!: ProductData[];
  productList!: ProductList;

  constructor(props: any) {
    super(props);
    this.productList = new ProductList();
    this.productList.attach(this.view.favcontainer);
  }

  async render() {
    this.products = await favouriteService.get();
    
    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.productList.update(this.products);
  }
}

export const favouritesComp = new Favourites(html);

