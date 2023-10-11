import * as marked from 'marked';

export class Accordion 
{
    constructor(contentDiv: HTMLElement) 
    {
        let contentElement = contentDiv.querySelector("#readme_content") as HTMLDivElement;

        if (contentElement) 
        {
            this.initializeAccordion(contentElement);
        } 
        else 
        {
            console.error('contentElement ikke fundet.');
        }
    }

    private initializeAccordion(contentElement: HTMLElement) 
    {
        fetch('http://127.0.0.1:5501/documentation/welcome.md')
            .then(response => 
                {
                if (!response.ok) {
                    throw new Error(`Netværkssvaret var ikke ok: ${response.status}`);
                }
                return response.text();
            })
            .then(markdown => 
                {
                let sections = markdown.split(/(^# .*)/gm).filter(section => section.trim() !== '');

                let htmlContent = '';

                let mainTitle = marked.parse(sections[0]);
                htmlContent += `<h1>${mainTitle}</h1>`;

                for (let i = 1; i < sections.length; i += 2) {
                    let title = marked.parse(sections[i]);
                    let content = marked.parse(sections[i + 1]);
                    htmlContent += `
                        <button class="accordion-title">${title}</button>
                        <div class="accordion-panel">${content}</div>
                    `;
                }

                contentElement.innerHTML = htmlContent;

                let buttons = contentElement.querySelectorAll('accordion-title') as NodeListOf<HTMLButtonElement>;
                for (let button of buttons) 
                {
                    button.addEventListener('click', () => {
                        let panel = button.nextElementSibling as HTMLElement;
                        if (panel.style.display === 'block') {
                            panel.style.display = 'none';
                        } else {
                            panel.style.display = 'block';
                        }
                    });
                }
            })
            .catch(error => 
            {
                console.error('Fejl ved indlæsning af accordion content:', error);
            });
    }
}