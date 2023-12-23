import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import { formatPrice } from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
import { ProductData } from 'types';
import { genUUID } from '../../utils/helpers';
import { EventType, analyticsService } from '../../services/analytics.service';

class Checkout extends Component {
  products!: ProductData[];

  async render() {
    this.products = await cartService.get();

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: true });
      productComp.render();
      productComp.attach(this.view.cart);
    });

    this.view.price.innerText = formatPrice(this._getTotalPrice());

    this.view.btnOrder.onclick = this._makeOrder.bind(this);
  }

  private _getTotalPrice() {
    const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
    return totalPrice;
  }

  private async _makeOrder() {
    await cartService.clear();
    fetch('/api/makeOrder', {
      method: 'POST',
      body: JSON.stringify(this.products)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          analyticsService.sendEvent(EventType.Purchase, {
            id: genUUID(),
            totalPrice: Math.round(this._getTotalPrice() / 1000),
            productIds: this.products.map(p => p.id)
          })
          window.location.href = '/?isSuccessOrder';
        }});

  }
}

export const checkoutComp = new Checkout(html);
