
import { RouteMap } from "./RouteInterface";

export class Route
{

    private readonly routes: RouteMap;
    public contentDiv: HTMLElement = null;
    private navLinks: NodeListOf<Element> = null;
  
    constructor()
    {
        this.contentDiv = document.getElementById("main-page");
        this.navLinks = document.querySelectorAll("#nav-link");
        

        this.routes = 
        {
          404: "/src/pages/404.html",
          "/": "/src/pages/home.html",
          "/texthelp": "/src/pages/textHelp.html"
        }

        this.attachEventListeners();   
        this.init();
    }

    private init(): void
    {
        let initialRoute = window.location.pathname;
        this.updateContent(initialRoute);
    }

    private attachEventListeners(): boolean 
    {
        try 
        {
          this.navLinks.forEach(link => link.addEventListener("click", () => this.handleNavigation));
      
          window.addEventListener("popstate", () => this.handlePopstate);
      
          return true;
        }

        catch (error) 
        {
          console.error(`Error attaching event listeners:`, error);
          return false;
        }
    }

    private async handleNavigation(event: Event): Promise<boolean> 
    { 
        event.preventDefault();
        let targetRoute = (event.target as HTMLAnchorElement).getAttribute("href");
        
        if (targetRoute) 
        {
          history.pushState({}, "", targetRoute);
          let success = await this.updateContent(targetRoute);
          return success;
        } 
        else 
        {
          console.error("Invalid target route");
          return false;
        }
      }

      private async updateContent(route: string): Promise<boolean> 
      {
        try 
        {
          let response = await fetch(this.routes[route]);
      
          if (response.ok) 
          {
            let template = await response.text();
            this.contentDiv.innerHTML = template;
            return (true) 

          } 
          else if (response.status === 404) 
          {
            let notFoundTemplate = await fetch(this.routes[404]).then((data) => data.text());
            this.contentDiv.innerHTML = notFoundTemplate;
            return (true) 

          } 
          else 
          {
            console.error(`Failed to fetch route:`, route);
            return (false)

          }
        } 
        catch (error) 
        {
          console.error(`Error updating content:`, error);
          return (false)
        }
    }
    
    private async handlePopstate(): Promise<boolean> 
    {
      try 
      {
        let currentRoute = window.location.pathname;
        let success = await this.updateContent(currentRoute);
        return success;
      } 
      catch (error) 
      {
        console.error("Error handling popstate:", error);
        return (false);
      }
    }
}
