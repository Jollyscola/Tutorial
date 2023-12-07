import * as marked from 'marked';



export class Markdown
{
  private url:string = null;
  private contentElement:HTMLDivElement = null;
  constructor(contentDiv: HTMLElement) 
  {

    this.url = "documentation/welcome.md";
    this.contentElement = contentDiv.querySelector("#readme_content") as HTMLDivElement;

    if (this.contentElement) 
      this.initialize();
    else 
      console.error('content fandt ikke.');
  }

  private initialize(): void 
  {
    this.fetchContent()
    .then(markdown => 
    {
      let htmlContent = this.renderAccordionContent(markdown);
      this.contentElement.innerHTML = htmlContent;
      this.addAccordionButtons();
      this.replaceCodeBlocks();
    })
    .catch(error => 
    {
      console.error('Error with content:', error);
    });
  }

  private async fetchContent(): Promise<string> 
  {
    try 
    {
      let response = await fetch(this.url);
      if (!response.ok) 
        throw new Error(`Network var ikke okay: ${response.status}`);

      return response.text();
    } 
    catch (error) 
    {
      console.error('Error indhold:', error);
      return '';
    }
  }

  private createCopyButton(codeBlock: HTMLPreElement): HTMLDivElement 
  {
    let copyButtondiv = document.createElement('div') as HTMLDivElement;
    let copyButton = document.createElement('button') as HTMLButtonElement;

    copyButton.textContent = "Copy code";
    copyButtondiv.classList.add("copyDIV");
    
    copyButtondiv.appendChild(copyButton);

    copyButton.addEventListener('click', () => 
    {
      let copy = codeBlock.textContent;
      this.copyWithTimeout(copy, copyButton);
    });

    return copyButtondiv;
  }

  private copyWithTimeout(text: string, button: HTMLButtonElement): void 
  {
    let timeoutDuration: number = 2000;
    navigator.clipboard.writeText(text)
      .then(() => 
      {
        if (button) button.textContent = 'Copied';

        setTimeout(() => {
          if (button) button.textContent = 'Copy code';

        }, timeoutDuration);
      })
      .catch((error) => {
        console.error("Copy error: ", error);
      });
  }

  private renderAccordionContent(markdown: string): string 
  {

    let sections = markdown.split(/^##\s+/gm);
    let mainTitle = marked.parse(sections.shift() || '');
  

    let htmlContent = `<h1 class="title">${mainTitle}</h1>`;

    let sectionHTML = sections.map((section) => 
    {
        let lines = section.split('\n');
        let title = marked.parse(lines[0].trim());

        lines.shift();
        let content = marked.parse(lines.join('\n'));

        return this.createAccordionSection(title, content);
    })
    .join('');

    return htmlContent + sectionHTML;
  } 

  private createAccordionSection(title: string, content: string): string 
  {
    return `
      <button class="accordion_title"> ` + title + `</button>
      <div class="accordion_panel">` + content + `</div>`;
  }

  private addAccordionButtons(): void 
  {
    let buttons = this.contentElement.querySelectorAll('.accordion_title') as NodeListOf<HTMLButtonElement>;
    for (let button of buttons) 
    {
        button.addEventListener('click', () => 
        {
            let panel = button.nextElementSibling as HTMLElement;
            let isActive = button.classList.contains('open');
          
            if (isActive) 
            {
              panel.style.display = 'none';
              button.classList.remove('open');
            } 
            else 
            {
              panel.style.display = 'block';
              button.classList.add('open');
            }
          });
    }
  }

  private replaceCodeBlocks(): void 
  {
    let codeBlocks = this.contentElement.querySelectorAll('pre') as NodeListOf<HTMLPreElement>;

    codeBlocks.forEach(codeBlock => 
      {
      let codeContainer = document.createElement('div');
      codeContainer.className = 'markdown_container';

      let copyButton = this.createCopyButton(codeBlock);
      codeContainer.appendChild(copyButton);


      let codeBlockToAppend  = codeBlock.cloneNode(true) as HTMLPreElement;
      codeContainer.appendChild(codeBlockToAppend);

      codeBlock.parentNode?.replaceChild(codeContainer, codeBlock);
    });
  }
}