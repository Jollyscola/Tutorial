// import fetch from 'node-fetch';
import { Intro } from './Tour/Intro';
import { youtubeSlider } from './youtube';
import { RouteMap } from "./RouteInterface";
// import express, { Express, Request, Response } from 'express';

// export class Route {
//   ;

//   constructor() {
//     this.routes = {
//       404: "/src/pages/404.html",
//       "/home": "/src/pages/home.html",
//       "/texthelp": "/src/pages/textHelp.html"
//     }

//     this.contentDiv = document.getElementById("main-page");
//     this.navLinks = document.querySelectorAll(".route-nav-link");

//     this.attachEventListeners();
//     this.init();
//   }

//   private init(): void {
//     let initialRoute = window.location.pathname;
//     this.updateContent(initialRoute);
//   }

//   private attachEventListeners(): boolean {
//     try {
//       this.navLinks.forEach(link => link.addEventListener("click", (event) => this.handleNavigation(event)));

//       window.addEventListener("popstate", () => this.handlePopstate());

//       return true;
//     } catch (error) {
//       console.error(`Error attaching event listeners:`, error);
//       return false;
//     }
//   }

//   private async handleNavigation(event: Event): Promise<boolean> {
//     event.preventDefault();
//     let targetRoute = (event.target as HTMLAnchorElement).getAttribute("href");

//     if (targetRoute) {
//       history.pushState({}, "", targetRoute);
//       let success = await this.updateContent(targetRoute);
//       return success;
//     } else {
//       console.error("Invalid target route");
//       return false;
//     }
//   }

//   private async updateContent(route: string): Promise<boolean> {
//     try {
//       let response = await fetch(this.routes[route]) as Response;

//       if (response.ok) {
//         let template = await response.text() as string;
//         this.contentDiv.innerHTML = template;

//         let introButton = document.getElementById("intro") as HTMLElement;
//         if (introButton) {
//           introButton.addEventListener("click", () => new Intro().startIntrotour());
//         }
//         this.gallery = new youtubeSlider(this.contentDiv);

//         return true;
//       } else if (response.status === 404) {
//         let notFoundTemplate = await fetch(this.routes[404]).then((data) => data.text());
//         this.contentDiv.innerHTML = notFoundTemplate;
//         return true;
//       } else {
//         console.error(`Failed to fetch route:`, route);
//         return false;
//       }
//     } catch (error) {
//       console.error(`Error updating content for route ${route}:`, error);
//       return false;
//     }
//   }

//   private async handlePopstate(): Promise<boolean> {
//     try {
//       let currentRoute = window.location.pathname;
//       let success = await this.updateContent(currentRoute);
//       return success;
//     } catch (error) {
//       console.error("Error handling popstate:", error);
//       return false;
//     }
//   }
// }

export class Route implements EventListenerObject {

  public intro: Intro | null = null;
  public gallery: youtubeSlider | null = null;
  public contentDiv: HTMLElement | null = null;
  private navLinks: NodeListOf<Element> | null = null;

  private readonly routes: RouteMap = null;

  constructor() {
    this.contentDiv = document.getElementById('main-page');
    this.navLinks = document.querySelectorAll('a[data-route]');

    this.routes = {
      '404': 'src/pages/404.html',
      '/': 'src/pages/home.html',
      '/texthelp': 'src/pages/texthelp.html',
    };

    this.navLinks.forEach((link) => 
    {
      link.addEventListener('click', this);
    });
  
    this.navigate(window.location.pathname);
  }

  handleEvent(event: Event)
  {
    if (event.type === 'click') 
    {
      this.handleLinkClick(event as MouseEvent);
    }
  }

  private handleLinkClick(event: MouseEvent) 
  {
    const target = event.target as HTMLAnchorElement;
    if (target.tagName === 'A' && target.hasAttribute('data-route')) {
      event.preventDefault();
      this.navigate(target.getAttribute('data-route') || '/');
    }
  }

  public navigate(path: string) 
  {
    const htmlPageURL = this.routes[path] || this.routes['404'];

    fetch(htmlPageURL)
      .then((response) => response.text())
      .then((html) => {
        this.updateURL(path);
        this.updateContent(html);
      })
      .catch((error) => console.error(`Error loading page: ${error}`));
  }

  private updateContent(html: string) {
    if (this.contentDiv) {
      this.contentDiv.innerHTML = html;

      this.intro = new Intro();
      this.gallery = new youtubeSlider(this.contentDiv);
    }
  }

  private updateURL(path: string) {
    window.history.pushState({}, '', path);
  }
}

// export class Server {
//   private app: Express;
//   private port: number;
//   private route: Route;

//   constructor(port: number) {
//     this.app = express();
//     this.port = port;
//     this.route = new Route();

//     this.setupMiddleware();
//     this.setupRoutes();
//   }

//   private setupMiddleware() {
//     this.app.use(express.static('public'));
//   }

//   private async fetchExternalHTML(req: Request, res: Response) {
//     try {
//       // Replace the URL with the external page you want to fetch
//       const response = await fetch('http://localhost:3000/');
//       const html = await response.text();
//       res.send(html);
//     } catch (error) {
//       console.error('Error fetching HTML:', error);
//       res.status(500).send('Error fetching HTML');
//     }
//   }

//   private setupRoutes() {
//     this.app.get('/fetch-html', this.fetchExternalHTML.bind(this));

//     // Define a route that triggers your Route class logic
//     this.app.get('/route', (req, res) => {
//       // Modify this logic as needed to pass data to your Route class
//       const path = req.query.path as string;
//       this.route.navigate(path);
//       res.send('Route executed');
//     });
//   }

//   public start() {
//     this.app.listen(this.port, () => {
//       console.log(`Server is running on port ${this.port}`);
//     });
//   }
// }