import { Intro } from './Tour/Intro';
import { RouteMap } from "./RouteInterface";
import {Quiz} from './pages/Quiz/Quizquuestion';
import { Accordion } from './pages/Home/accordion';
import { TextHelp } from './pages/Texthelp/texthelp';
import { youtubeSlider } from './pages/Home/youtube';

export class Route implements EventListenerObject 
{

  public quiz: Quiz  = null;
  public intro: Intro = null;
  public homeaccordion = null;
  public texhhelp: TextHelp = null;
  public gallery: youtubeSlider  = null;
  public contentDiv: HTMLElement  = null;
  private navLinks: NodeListOf<Element> = null;

  private readonly routes: RouteMap = null;

  constructor() {
    this.contentDiv = document.getElementById('main-page');
    this.navLinks = document.querySelectorAll('a[data-route]');

    this.routes = {
      '404': 'src/pages/404.html',
      '/': 'src/pages/Home/home.html',
      '/quiz' : 'src/pages/Quiz/quiz.html',
      '/texthelp': 'src/pages/Texthelp/texthelp.html',
    };

    this.navLinks.forEach((link) => 
    {
      link.addEventListener('click', this);
    });
  
      this.navigate(window.location.pathname);
  }

  handleEvent(event: Event) : void
  {
    if (event.type === 'click') 
    {
      this.handleLinkClick(event as MouseEvent);
    }
  }

  private handleLinkClick(event: MouseEvent) : void
  {
    let target = event.target as HTMLAnchorElement;
    if (target.tagName === 'A' && target.hasAttribute('data-route')) 
    {
      event.preventDefault();
      this.navigate(target.getAttribute('data-route') || '/');
    }
  }

  public async navigate(path: string): Promise<void>
  {
      let htmlPageURL = this.routes[path] || this.routes['404'];
      let response = await fetch(htmlPageURL);
      let html = await response.text();

      this.updateContent(html,path);
  }

  private updateContent(html: string,path:string) : void
  {
    
    this.updateURL(path);

    if (this.contentDiv) {
      this.contentDiv.innerHTML = html;

      if(path == "/")
      {
        this.intro = new Intro();
        this.gallery = new youtubeSlider(this.contentDiv);
        this.homeaccordion = new Accordion(this.contentDiv);
      }
        
      if(path == "/quiz")
      {
        this.quiz = new Quiz(this.contentDiv);
      }

      if(path == "/texthelp")
      {
        this.texhhelp = new TextHelp(this.contentDiv);
      }
    }
  }

  private updateURL(path: string) : void
  {
    window.history.pushState({}, '', path);
  }

}

