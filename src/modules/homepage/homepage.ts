import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';
import { SearchSuggestions } from '../searchSuggestions/searchSuggestions'
import { ProductList } from '../productList/productList';

class Homepage extends Component {
  popularProducts: ProductList;
  searchSuggestions: SearchSuggestions;

  constructor(props: any) {
    super(props);

    this.popularProducts = new ProductList();
    this.popularProducts.attach(this.view.popular);

    this.searchSuggestions = new SearchSuggestions();
    this.searchSuggestions.attach(this.view.notifies);
  }

  render() {

    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.popularProducts.update(products);
      });

    const isSuccessOrder = new URLSearchParams(window.location.search).get('isSuccessOrder');
    if (isSuccessOrder != null) {
      const $notify = addElement(this.view.notifies, 'div', { className: 'notify' });
      addElement($notify, 'p', {
        innerText:
          'Заказ оформлен. Деньги спишутся с вашей карты, менеджер может позвонить, чтобы уточнить детали доставки'
      });
    }

    //this.searchSuggestions.update(["рекомендация1", "рекомендация2"]);
  }
}

export const homepageComp = new Homepage(html);
