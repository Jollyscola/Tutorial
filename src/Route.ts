// import fetch from 'node-fetch';
import { Intro } from './Tour/Intro';
import { youtubeSlider } from './youtube';
import { RouteMap } from "./RouteInterface";

export class Route implements EventListenerObject {

  public intro: Intro = null;
  public gallery: youtubeSlider  = null;
  public contentDiv: HTMLElement  = null;
  private navLinks: NodeListOf<Element> = null;

  private readonly routes: RouteMap = null;

  constructor() {
    this.contentDiv = document.getElementById('main-page');
    this.navLinks = document.querySelectorAll('a[data-route]');

    this.routes = {
      '/': 'src/pages/home.html',
      '404': 'src/pages/404.html',
      '/quiz' : 'src/pages/quiz.html',
      '/texthelp': 'src/pages/texthelp.html',
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
    const target = event.target as HTMLAnchorElement;
    if (target.tagName === 'A' && target.hasAttribute('data-route')) 
    {
      event.preventDefault();
      this.navigate(target.getAttribute('data-route') || '/');
    }
  }

  public navigate(path: string) : void 
  {
    const htmlPageURL = this.routes[path] || this.routes['404'];

    fetch(htmlPageURL)
      .then((response) => response.text())
      .then((html) => {
        this.updateURL(path);
        this.updateContent(html);
      })
  }

  private updateContent(html: string) : void
  {
    if (this.contentDiv) {
      this.contentDiv.innerHTML = html;

      this.intro = new Intro();
      this.gallery = new youtubeSlider(this.contentDiv);
    }
  }

  private updateURL(path: string) : void
  {
    window.history.pushState({}, '', path);
  }
}