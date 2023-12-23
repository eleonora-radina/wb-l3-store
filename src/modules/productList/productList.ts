import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './productList.tpl.html';
import { ProductData } from 'types';
import { Product } from '../product/product';

type ProductListComponentParams = { [key: string]: any };

export class ProductList {
  view: View;
  products: ProductData[];
  params: ProductListComponentParams;

  constructor(params: ProductListComponentParams = {}) {
    this.products = [];
    this.view = new ViewTemplate(html).cloneView();
    this.params = params;
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(products: ProductData[]) {
    this.products = products;
    this.render();
  }

  render() {
    this.view.root.innerHTML = '';

    this.products.forEach((product) => {
      const productComp = new Product(product, { isBtnDeleteVisible: this.params.isBtnDeleteVisible, updateFav: this.params.updateFav});
      productComp.render();
      productComp.attach(this.view.root);
    });
  }
}
