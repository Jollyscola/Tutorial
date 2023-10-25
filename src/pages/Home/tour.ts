import { Intro } from "./Tour/Intro";
import { TourObject } from "./Tour/toursinterface";

export class Tour implements EventListenerObject 
{
  data: any = null;
  page:HTMLElement = null;
  iframe: HTMLIFrameElement = null;
  introbutton: HTMLButtonElement = null;
  introDivtour: NodeListOf<HTMLDivElement> = null;
  constructor() 
  {
    this.introbutton = document.querySelector("#intro") as HTMLButtonElement;
    this.iframe = document.querySelector("#myIframe") as HTMLIFrameElement;
    if (this.iframe) 
    {
      this.page = this.iframe.contentDocument.body;
      this.introDivtour = this.page.querySelectorAll(".introtour") as NodeListOf<HTMLDivElement>;
    }

    this.loadAndCreate();
  }
  handleEvent(event: Event): void 
  {
    let target = event.target as HTMLElement

    if(target.classList.contains("one"))
    {
      let intro = new Intro(this.iframe, this.introDivtour);
      let introtourObjects = this.data.intro as TourObject[];
      intro.starttour(introtourObjects); 
      return;
    }
  
  }

  public loadAndCreate(): void 
  {
    fetch('documentation/tour.json')
      .then(response => response.json())
      .then(data => {
        this.data = data;
        if (this.iframe && this.introDivtour) 
          this.introbutton.addEventListener("click", this);
        else 
          console.error('Missing elements or JSON data.');
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error);
      });
  }
}