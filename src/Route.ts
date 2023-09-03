

export class Route{

   private contentDiv: HTMLElement = null;
   private navLinks: NodeListOf<Element> = null;
   private routes: { [key: string]: string } = null;
  

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

      this.updateContent = this.updateContent.bind(this);
      this.handlePopstate = this.handlePopstate.bind(this);
      this.handleNavigation = this.handleNavigation.bind(this);

      this.attachEventListeners();   

      this.init();
   }

   private async updateContent(route: string): Promise<boolean>
    {
      let template = await fetch(this.routes[route]).then((data) => data.text());
      this.contentDiv.innerHTML = template;

      return(true)
    }

   async handleNavigation(event: Event): Promise<boolean> {
      event.preventDefault();
      let targetRoute = (event.target as HTMLAnchorElement).getAttribute("href");
      history.pushState({}, "", targetRoute);
      this.updateContent(targetRoute);
    
      return(true);
    }

    private handlePopstate(): boolean
    {
      const currentRoute = window.location.pathname;
      this.updateContent(currentRoute);

      return(true);
   }

   private attachEventListeners(): boolean
   {
      this.navLinks.forEach(link => {
        link.addEventListener("click", this.handleNavigation);
      });
  
      window.addEventListener("popstate", this.handlePopstate);

      return(true);
    }

    private init(): void
    {
      const initialRoute = window.location.pathname;
      this.updateContent(initialRoute);
    }

}
