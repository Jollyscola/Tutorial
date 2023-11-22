import {TourObject} from "./toursinterface";
import introJs from "intro.js";


export class Intro 
{

  intro: any = null;
  page: HTMLElement = null;
  iframe: HTMLIFrameElement = null;
  introbutton: HTMLButtonElement = null;
  introDivtour: NodeListOf<HTMLDivElement> = null;

  constructor(iframe: HTMLIFrameElement, introDivtour: NodeListOf<HTMLDivElement>) 
  {
    this.iframe = iframe;

    if (this.iframe) this.iframe.style.display = "none";

    this.introbutton = document.querySelector("#intro") as HTMLButtonElement;

    if (this.iframe) 
    {
      this.page = this.iframe.contentDocument.body;
      this.introDivtour = introDivtour;
    }
  }

  public starttour(introtourObjects: TourObject[]): void 
  {
    this.intro = introJs();
    this.tour(introtourObjects);
    if (this.iframe) this.iframe.style.display = "block";
    this.intro.onexit(() => 
    {
      if (this.iframe) this.iframe.style.display = "none";
    });

    this.intro.start();
  }

  private tour(introtourObjects: TourObject[]): void 
  {
    let steps = introtourObjects.map((introtour) => 
      ({
        element: introtour.element instanceof HTMLElement
          ? introtour.element
          : this.page.querySelector(introtour.element) as HTMLElement,
        title: introtour.title,
        intro: introtour.intro,
      })
    );

    this.intro.setOptions
    (
      {
        steps: steps,
      }
    );
  }
}