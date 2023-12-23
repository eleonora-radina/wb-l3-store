import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './productList.tpl.html';
import { ProductData } from 'types';
import { Product } from '../product/product';
import { EventType, analyticsService } from '../../services/analytics.service';
import { extractIdFromUrl } from '../../utils/helpers'

export class ProductList {
  view: View;
  products: ProductData[];
  observer: IntersectionObserver;

  constructor() {
    this.products = [];
    this.view = new ViewTemplate(html).cloneView();

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    let observerCallback = (entries: any) => {
      let products = this.products;

      const findProduct = (href: any) => {
        const idFromUrl = extractIdFromUrl(href);
        return products.find((el) => el.id === parseInt(idFromUrl!));
      }

      const findSecretKey = async (href: any) => {
        const idFromUrl = extractIdFromUrl(href);
        let secretKey = await fetch(`/api/getProductSecretKey?id=${idFromUrl}`);
        return secretKey.json();
      }

      entries.forEach(async (entry: any) => {
        if (entry.isIntersecting) {
          analyticsService.sendEvent(EventType.ViewCard, {
            product: findProduct(entry.target.href),
            secretKey: await findSecretKey(entry.target.href),
          })
        }
      });
    };

    this.observer = new IntersectionObserver(observerCallback, options);
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
      const productComp = new Product(product);
      productComp.render();
      productComp.attach(this.view.root);

      this.observer.observe(productComp.view.root);
    });
  }

}
