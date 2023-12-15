import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { formatPrice } from '../../utils/helpers'
import html from './product.tpl.html';
import { ProductData } from 'types';
import { favouriteService } from '../../services/favourites.service';

type ProductComponentParams = { [key: string]: any };

export class Product {
  view: View;
  product: ProductData;
  params: ProductComponentParams;

  constructor(product: ProductData, params: ProductComponentParams = {}) {
    this.product = product;
    this.params = params;
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  async render() {
    const { id, name, src, salePriceU } = this.product;

    this.view.product.setAttribute('href', `/product?id=${id}`);
    this.view.img.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.price.innerText = formatPrice(salePriceU);

    if (this.params.isHorizontal) this.view.product.classList.add('is__horizontal');
    if (this.params.isBtnDeleteVisible) this.view.btnDelete.classList.add('visible');

    this.view.btnDelete.onclick = this._removeFromFav.bind(this);
  }

  private async _removeFromFav() {
    if (!this.product) return;
    await favouriteService.removeProduct(this.product);
    await this.params.updateFav();
  }
}