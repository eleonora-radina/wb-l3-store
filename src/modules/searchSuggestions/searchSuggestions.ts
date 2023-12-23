import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchSuggestions.tpl.html';
import { addElement } from '../../utils/helpers';

export class SearchSuggestions {
  view: View;
  suggestions: String[];

  constructor() {
    this.view = new ViewTemplate(html).cloneView();
    this.suggestions = [
      "чехол iphone 13 pro",
      "коляски agex",
      "яндекс станция 2",
    ];
  }

  update(suggestions: String[]) {
    this.suggestions = suggestions;
    this.attach(this.view.root);
  }

  attach($root: HTMLElement) {
    this.view.root.innerHTML = '';
    let text;
    for (let i = 0; i < this.suggestions.length; i++) {
      switch (i) {
        case 0:
          text = "Например, \xa0";
          break;
        case this.suggestions.length - 1:
          text = "\xa0 или \xa0";
          break;
        default:
          text = ", \xa0"
          break;
      }

      addElement(this.view.root, 'p', { className: 'suggestions__text', innerText: text });
      const item = addElement(this.view.root, 'div', { className: 'suggestions__item' });
      addElement(item, 'p', { className: 'suggestions__text', innerText: this.suggestions[i] });
    };

    $root.appendChild(this.view.root);
  }
}

