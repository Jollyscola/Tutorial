import introJs from "intro.js";

export class Intro 
{

  headers:any = null;
  intro: any = null;
  page: HTMLElement = null;
  leftmenu: HTMLElement = null;
  connection: HTMLElement = null;
  iframe: HTMLIFrameElement = null;
  introbutton: HTMLButtonElement = null;

  constructor() 
  {
    
    this.iframe = document.querySelector("#myIframe") as HTMLIFrameElement;
    this.page = this.iframe.contentDocument.body.querySelector(".image_container") as HTMLDivElement;

    this.leftmenu = this.page.querySelector("#leftmenu") as HTMLDivElement;
    this.introbutton = document.querySelector("#intro") as HTMLButtonElement;
    this.connection = this.page.querySelector("#connection") as HTMLDivElement;
        
    this.intro = introJs();
    
    this.introbutton.addEventListener("click", () => this.tour());
  }


  private tour(): void 
  {

    this.intro.setOptions(
      {
      steps: 
      [
        {
          title: 'Welcome',
          intro: 'Hello World! 👋'
        },
        {
          title: 'let us giv a tour into futurefroms',
          intro: 'Let us start'
        },
        {
          element: this.page,
          title: 'this is page',
          intro: 'this the page about futureforms'
        },
      ],
    }
    ).start();
  }
}