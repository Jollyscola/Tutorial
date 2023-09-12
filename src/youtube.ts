


export class youtubeSlider 
{
    private videos: {title: string; videoIds: string}[] = null;
    private youtubetitle: HTMLLabelElement;
    private youtubePlayer: HTMLIFrameElement;
    private currentVideoIndex: number = null;
    private radioButtons: NodeListOf<HTMLInputElement> = null;
    
    constructor(contentDiv:HTMLElement) 
    {
        this.currentVideoIndex = 0;

        this.videos = 
        [
            { title: 'Slider Title 1', videoIds: 'mzgHQUjxlBg' },
            { title: 'Slider Title 2', videoIds: 'SgmNxE9lWcY' },
            { title: 'Slider Title 3', videoIds:  'L3azzI6gqm0' },
        ];

        this.radioButtons = contentDiv.querySelectorAll('input[name="slider"]') as NodeListOf<HTMLInputElement>;

        const prevbutton = document.querySelector("#prev-button") as HTMLInputElement;
        const nextbutton = document.querySelector("#next-button") as HTMLInputElement;

        prevbutton.addEventListener("click", () => this.prevVideo());
        nextbutton.addEventListener("click", () => this.nextVideo());

        this.setupRadioButtons();
    }

    private setupRadioButtons(): boolean 
    {
        try 
        {
          this.radioButtons.forEach((radio, index) => {
            radio.addEventListener('change', () => {
              if (radio.checked) {
                this.selectSlider(index);
              }
            });
          });
      
          return true; 
        } 
        catch (error) 
        {
          console.error("Error setting up radio buttons:", error);
          return false; 
        }
    }

    private selectSlider(index: number): void 
    {
        this.loadVideo(index);
    }
 
    public prevVideo(): void 
    {
        console.log("prev")
        this.loadVideo(this.currentVideoIndex - 1);
    }

    public nextVideo(): void 
    {
        this.loadVideo(this.currentVideoIndex + 1);
    }
  
    private loadVideo(index: number): void 
    {
        this.youtubetitle = document.getElementById('youtube-title') as HTMLLabelElement;
        this.youtubePlayer = document.getElementById('youtube-player') as HTMLIFrameElement;
        this.radioButtons = document.querySelectorAll('input[name="slider"]') as NodeListOf<HTMLInputElement>;

        if (index >= 0 && index < this.videos.length) 
        {
            const videoId = this.videos[index];
            this.youtubetitle.textContent = videoId.title;
            const videoUrl = 'https://www.youtube.com/embed/' + videoId.videoIds;
            this.youtubePlayer.src = videoUrl;
            this.currentVideoIndex = index;
            this.radioButtons[index].checked = true;
        }
    }
}
