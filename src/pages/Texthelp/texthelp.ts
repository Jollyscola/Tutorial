interface TextHelpItem {
  title: string;
  text: string;
  subItems: string[];
  isOpen: boolean;
}

export class TextHelp {
  private texthelpPage: HTMLElement = null;

  constructor(contentDiv: HTMLElement, private items: TextHelpItem[]) {
     this.texthelpPage = contentDiv.querySelector('.texthelp-page');
     this.generateList();
  }

  private generateList() {
     let listHtml = '';
     for (let item of this.items) {
        listHtml += this.generateListItem(item);
     }

     const fullHtml = this.generateListHtml(listHtml);

     if (this.texthelpPage) {
        this.texthelpPage.innerHTML = fullHtml;
     }

     this.attachEventListeners();
  }

  private generateListItem(item: TextHelpItem): string {
     const subItemsHtml = item.subItems.map(subItem => '<li>' + subItem + '</li>').join('');

     const containerClass = item.isOpen ? 'texthelp-container open' : 'texthelp-container';
     const titleArrow = item.isOpen ? '▼' : '►';

     return '<li class="' + containerClass + '">' +
        '<div class="texthelp-title">' +
        item.title + ' <span class="title-arrow">' + titleArrow + '</span>' +
        '</div>' +
        '<div class="texthelp-content">' +
        '<div class="texthelp-text ' + (item.isOpen ? 'open' : '') + '">' + item.text + '</div>' +
        '<ul class="sub-list">' + subItemsHtml + '</ul>' +
        '</div>' +
        '</li>';
  }

  private generateListHtml(itemsHtml: string): string {
     return '<ul class="texthelp-list">' + itemsHtml + '</ul>';
  }

  private attachEventListeners() {
     const titleElements = this.texthelpPage?.querySelectorAll('.texthelp-title');
     if (titleElements) {
        titleElements.forEach((titleElement, index) => {
           titleElement.addEventListener('click', () => this.toggleVisibility(index));
        });
     }
  }

  private toggleVisibility(index: number) {
    const item = this.items[index]
    const titleArrowElement = this.texthelpPage?.querySelector('.texthelp-container:nth-child(' + (index + 1) + ') .title-arrow');
    const contentElement = this.texthelpPage?.querySelector('.texthelp-container:nth-child(' + (index + 1) + ') .texthelp-content');
 
    if (titleArrowElement && contentElement) {
       item.isOpen = !item.isOpen;
       titleArrowElement.innerHTML = item.isOpen ? '▼' : '►';
       contentElement.classList.toggle('open', item.isOpen);
    }
 }
}