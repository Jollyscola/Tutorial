let items = [
   {
     title: 'Denmark',
     text: 'Denmark, a Scandinavian gem, is known for its picturesque landscapes and progressive society.',
     subItems: ['Copenhagen', 'Odense'],
     isOpen: false,
   },
   {
      title: 'Sweden',
      text: 'Sweden, often referred to as Sverige in Swedish, is a captivating Nordic nation known for its stunning natural landscapes and progressive values.',
      subItems: ['Gothenburg', 'Stockholm'],
      isOpen: false,
    },
   // Add more items as needed
 ];

export class TextHelp 
{
   private texthelpPage: HTMLElement = null;

   constructor(contentDiv: HTMLElement) 
   {
     this.texthelpPage = contentDiv.querySelector('.texthelp-page');
     this.generateList(items);
   }

   private generateList(items: { title: string; text: string; subItems: string[]; isOpen: boolean }[]) 
   {
     let html = '';

     for (let item of items) {
       let itemHtml = this.generateListItem(item.title, item.text, item.subItems, item.isOpen);
       html += itemHtml;
     }

     let listHtml = this.generateListHtml(html);

     if (this.texthelpPage) 
     {
       this.texthelpPage.innerHTML += listHtml;
     }

     let titleElements = this.texthelpPage.querySelectorAll('.custom-title');
     titleElements.forEach((titleElement, index) => {
       titleElement.addEventListener('click', () => this.toggleVisibility(index));
     });
   }

   private generateListItem(title: string, text: string, subItems: string[], isOpen: boolean): string 
   {
     let subItemsHtml = subItems.map(subItem => `<li>${subItem}</li>`).join('');

     let sublistClass = isOpen ? 'sub-list open' : 'sub-list';

     let titleArrow = isOpen ? '▼' : '►';

     return `<li class="custom-item">
          <div class="custom-title">
            ${title} <span class="title-arrow">${titleArrow}</span>
          </div>
          <div class="custom-text ${isOpen ? 'open' : ''}">${text}</div>
          <ul class="${sublistClass}">
             ${subItemsHtml}
          </ul>
       </li>`;
   }

   private generateListHtml(itemsHtml: string): string 
   {
     return `
      <ul class="custom-list">
          ${itemsHtml}
       </ul>
      `;
   }

   private toggleVisibility(index: number) 
   {
     let item = items[index];
     let sublistElement = this.texthelpPage.querySelector(`.custom-item:nth-child(${index + 1}) .sub-list`);
     let textElement = this.texthelpPage.querySelector(`.custom-item:nth-child(${index + 1}) .custom-text`);
     let titleArrowElement = this.texthelpPage.querySelector(`.custom-item:nth-child(${index + 1}) .title-arrow`);

     if (sublistElement && textElement && titleArrowElement) {
       item.isOpen = !item.isOpen;
       textElement.classList.toggle('open', item.isOpen);
       sublistElement.classList.toggle('open', item.isOpen);

       titleArrowElement.innerHTML = item.isOpen ? '▼' : '►';
     }
   }
}