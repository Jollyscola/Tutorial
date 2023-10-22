import introJs from "intro.js";

interface IntroTour 
{
  title: string;
  intro: string;
  element?: string | HTMLElement;
}

export class Intro 
{

  intro: any = null;
  page: HTMLElement = null;
  leftmenu: HTMLElement = null;
  readmeDIv: HTMLElement = null;
  connection: HTMLElement = null;
  iframe: HTMLIFrameElement = null;
  introbutton: HTMLButtonElement = null;
  introDivtour: NodeListOf<HTMLDivElement> = null;


  constructor() 
  {
    
    this.iframe = document.querySelector("#myIframe") as HTMLIFrameElement;

    if(this.iframe)
      this.iframe.style.display = "none";

    this.introbutton = document.querySelector("#intro") as HTMLButtonElement;
    
    if(this.introbutton) 
      this.introbutton.addEventListener("click", () => this.starttour());
    
    if(this.iframe) 
      this.page = this.iframe.contentDocument.body.querySelector(".image_container") as HTMLDivElement;

    if(this.page) 
    {
      this.leftmenu = this.page.querySelector("#leftmenu") as HTMLDivElement;
      this.introDivtour = this.page.querySelectorAll(".introtour") as NodeListOf<HTMLDivElement>;
    }    
  }

  private getIntrotourObjects(introDivtour: NodeListOf<HTMLDivElement>): IntroTour[]
  {
    let introtourObjects: IntroTour[] = [];

    introDivtour.forEach((introtourElement) =>
    {

      let titleElement = introtourElement.querySelector('#title') as HTMLLabelElement;
      let introElement = introtourElement.querySelector('#intro')as HTMLLabelElement;
      let elementElement = introtourElement.querySelector('#element') as HTMLLabelElement
 
      
    
      if (titleElement && introElement)
      {
        let element = null ;

        if(elementElement)
        {
          element = this.page.querySelector(elementElement.textContent) as HTMLElement;

          if(elementElement.textContent == ".image_container")
            element = this.page
        }

        let introtour : IntroTour = 
        {
          title: titleElement.textContent,
          intro: introElement.textContent,
          element: element
        }

        introtourObjects.push(introtour);
      };
    })
    return introtourObjects
  }

  public starttour() : void
  {
    this.intro = introJs();
      this.tour(this.introDivtour);

    this.iframe.style.display = "block";
    this.intro.onexit(() => {
      this.iframe.style.display = "none";
    });
    this.intro.start();
  }


  private tour(introDivtour : NodeListOf<HTMLDivElement>): void 
  {
    let introtourObjects = this.getIntrotourObjects(introDivtour);
    let steps = introtourObjects.map((introtour) => ({
      element: introtour.element, 
      title: introtour.title,
      intro: introtour.intro,
    }));

    this.intro.setOptions(
    {
      steps: steps,
    });
  }
}