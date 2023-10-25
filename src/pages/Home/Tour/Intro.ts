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
  page:HTMLElement = null;
  iframe: HTMLIFrameElement = null;
  introbutton: HTMLButtonElement = null;
  introDivtour: NodeListOf<HTMLDivElement> = null;

  constructor() {
    this.iframe = document.querySelector("#myIframe") as HTMLIFrameElement;

    if (this.iframe) this.iframe.style.display = "none";

    this.introbutton = document.querySelector("#intro") as HTMLButtonElement;

    if (this.iframe) {
      this.page = this.iframe.contentDocument.body;
      this.introDivtour = this.page.querySelectorAll(".introtour") as NodeListOf<HTMLDivElement>;
    }

    fetch('documentation/tour.json')
      .then(response => response.json())
      .then(data => 
      {
        if (this.introbutton && this.introDivtour) {
          let introtourObjects = data.intro as IntroTour[];
  
          this.introbutton.addEventListener("click", () => this.starttour(introtourObjects));
        } else {
          console.error('Missing elements or JSON data.');
        }
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error);
      });
  }

  public starttour(introtourObjects: IntroTour[]): void 
  {
    this.intro = introJs();
    console.log("1");
    this.tour(introtourObjects);

    if (this.iframe) this.iframe.style.display = "block";

    this.intro.onexit(() => {
      if (this.iframe) this.iframe.style.display = "none";
    });

    this.intro.start();
  }

  private tour(introtourObjects: IntroTour[]): void 
  {
      let steps = introtourObjects.map((introtour) => 
      ({
        element: introtour.element instanceof HTMLElement
        ? introtour.element
        : this.page.querySelector(introtour.element) as HTMLElement,
        title: introtour.title,
        intro: introtour.intro,
      }));
      this.intro.setOptions
      ({
        steps: steps,
      });
  }
}