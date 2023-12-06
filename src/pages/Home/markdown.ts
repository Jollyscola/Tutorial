import * as marked from 'marked';



export class Markdown
{
  constructor(contentDiv: HTMLElement) 
  {
    let contentElement = contentDiv.querySelector("#readme_content") as HTMLDivElement;

    if (contentElement) 
      this.initializeAccordion(contentElement);
    else 
      console.error('content fandt ikke.');
  }

  private async fetchMarkdownContent(url: string): Promise<string> 
  {
    try 
    {
      let response = await fetch(url);
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

  private renderMarkdownToHTML(markdown: string): string 
  {
    return marked.parse(markdown);
  }

  private createCopyButton(codeBlock: HTMLPreElement): HTMLDivElement 
  {
    let copyButtondiv = document.createElement('div') as HTMLDivElement;
    let copyButton = document.createElement('button') as HTMLButtonElement;

    copyButton.textContent = "Copy code";
    copyButtondiv.classList.add("copybutton");
    
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
        this.handleCopySuccess(button);
        setTimeout(() => {
          this.resetCopyButton(button);
        }, timeoutDuration);
      })
      .catch((error) => {
        console.error("Copy error: ", error);
      });
  }

  private handleCopySuccess(button: HTMLButtonElement): void 
  {
    if (button) button.textContent = 'Copied';

  }

  private resetCopyButton(button: HTMLButtonElement): void 
  {
    if (button) button.textContent = 'Copy code';
  }

  private renderAccordionContent(markdown: string): string 
  {

    let sections = markdown.split(/^##\s+/gm);
    let mainTitle = this.renderMarkdownToHTML(sections.shift() || '');

    let htmlContent = `<h1 class="title">${mainTitle}</h1>`;

    let sectionHTML = sections.map((section) => 
    {
        let lines = section.split('\n');
        let title = this.renderMarkdownToHTML(lines[0].trim());
        lines.shift();
        let content = this.renderMarkdownToHTML(lines.join('\n'));

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

  private addAccordionButtons(contentElement: HTMLElement): void 
  {
    let buttons = contentElement.querySelectorAll('.accordion_title') as NodeListOf<HTMLButtonElement>;
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

  private replaceCodeBlocks(contentElement: HTMLElement): void 
  {
    const codeBlocks = contentElement.querySelectorAll('pre') as NodeListOf<HTMLPreElement>;

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

  public initializeAccordion(contentElement: HTMLElement): void 
  {
    this.fetchMarkdownContent('documentation/welcome.md')
      .then(markdown => 
      {
        let htmlContent = this.renderAccordionContent(markdown);
        contentElement.innerHTML = htmlContent;
        this.addAccordionButtons(contentElement);
        this.replaceCodeBlocks(contentElement);
      })
      .catch(error => 
      {
        console.error('Error with content:', error);
      });
  }
}