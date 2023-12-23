import { Component } from '../component';
import html from './favourites.tpl.html';
import { favouriteService } from '../../services/favourites.service';
import { ProductData } from 'types';
import { ProductList } from '../productList/productList';

class Favourites extends Component {
  products!: ProductData[];
  productList!: ProductList;

  constructor(props: any) {
    super(props);
    this.productList = new ProductList({ isBtnDeleteVisible: true, updateFav: () => this.render()});
    this.productList.attach(this.view.favcontainer);
  }

  async render() {
    this.products = await favouriteService.get();
    this.productList.update(this.products);
    
    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
    }
  }
}

export const favouritesComp = new Favourites(html);

