import Shepherd from 'shepherd.js';

export class Intro
{
   page: HTMLElement = null;
   intro:Shepherd.Tour = null;
   iframe:HTMLIFrameElement = null;
   introbutton:HTMLButtonElement = null;
   headers = null;

   constructor()
   {

    this.headers =  {'Access-Control-Allow-Origin': '*'} 
    
      this.intro = new Shepherd.Tour({
         useModalOverlay: true,
         defaultStepOptions: {
           classes: 'shadow-md bg-purple-dark',
           scrollTo: true
         }
       });

       this.iframe = document.querySelector("#myIframe") as HTMLIFrameElement;
       this.introbutton = document.querySelector("#intro") as HTMLButtonElement;

       this.introbutton.addEventListener("click", ()=> this.startIntrotour())

       this.page = this.iframe.contentDocument.querySelector(".page")
       
       this.tour();
   }

   public startIntrotour(): void
   {
     this.intro.start()
   }
    

   private tour(): void
  {
        this.intro.addStep({
          id: 'step1',
          text: 'Welcome too the tour',
          
          buttons: [
            {
              text: 'Next',
              action: this.intro.next
            }
          ]
        });
        
        this.intro.addStep({
          id: 'step2',
          text: 'let us start',
 
          buttons: [
            {
              text: 'Back', 
              action: this.intro.back,
            },
            {
              text: 'Next',
              action: this.intro.next
            }
          ]
        });

        this.intro.addStep({
          id: 'step3',
          text: 'this is the page where u can enjoy ',
          attachTo: {
            element: this.page,
            on: 'bottom'
          },
          buttons: [
            {
              text: 'Back', 
              action: this.intro.back,
            },
            {
              text: 'Next',
              action: this.intro.next
            }
          ]
        });

        this.intro.addStep({
          id: 'step4',
          text: 'this too connection',
          attachTo: {
            element: this.page.querySelector("#connection") as HTMLElement,
            on: 'bottom'
          },
          buttons: [
            {
              text: 'Back', 
              action: this.intro.back,
            },
            {
              text: 'Finsh',
              action: this.intro.next
            }
          ]
        });
    }

  
}