

interface Video {
  image: string;
  title: string;
  videoIds: string;
}


export class youtubeSlider 
{

  private youtubePlayer: HTMLFormElement;
  private youtubetitle: HTMLLabelElement;
  private smallVideo: NodeListOf<HTMLImageElement> = null;
  private radioButtons: NodeListOf<HTMLInputElement> = null;
  private videos: Video[] = null;
  private currentVideoIndex: number = 0;

    constructor(contentDiv:HTMLElement) 
    {

        this.videos = 
        [
            { image:'dist/images/image1.jpg',title:  'Slider Title 1', videoIds: 'mzgHQUjxlBg' },
            { image:'dist/images/image2.jpg', title: 'Slider Title 2', videoIds: 'SgmNxE9lWcY' },
            { image:'dist/images/image3.jpg', title: 'Slider Title 3', videoIds:  'L3azzI6gqm0' },
        ];

        
        this.youtubetitle = contentDiv.querySelector('#youtube-title') as HTMLLabelElement;
        this.youtubePlayer = contentDiv.querySelector('#youtube-player') as HTMLFormElement;
        this.smallVideo = contentDiv.querySelectorAll(".video-container img") as NodeListOf<HTMLImageElement>;
        this.radioButtons = contentDiv.querySelectorAll('input[name="slider"]') as NodeListOf<HTMLInputElement>;

        this.smallVideo.forEach((image) =>
        {
          image.addEventListener('click', () => this.selectVideo(image.id))
        })

        this.RadioButtons();
    }

    private getVideoById(id: string): Video 
    {
      let find =  this.videos.find(video => video.videoIds === id);
      return find;
    }

    private RadioButtons(): boolean 
    {
        try 
        {
          this.radioButtons.forEach((radio, index) => {
            radio.addEventListener('change', () => {
              if (radio.checked) {
                this.selectRadio(index.toString());
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

    private selectVideo(index: string): void {

      let link:any =  this.youtubePlayer 
      let image: HTMLImageElement = link.children[0] as HTMLImageElement;

      let video = this.getVideoById(index);
      let indexnumber = this.videos.findIndex(video => video.videoIds === index);

      link.href = video;
      image.src = video.image;

      this.youtubetitle.textContent = video.title;
      this.radioButtons[indexnumber].checked = true;
    }
 
 
    private selectRadio(index: string): boolean 
    {
        
            let link:any =  this.youtubePlayer 
            let image: HTMLImageElement = link.children[0] as HTMLImageElement;
            
            let video = this.getVideoById(this.videos[index].videoIds);
           

            link.href = video;
            image.src = video.image;

            this.youtubetitle.textContent = video.title;
            const videoUrl = 'https://www.youtube.com/embed/' + video.videoIds;
            this.youtubePlayer.href = videoUrl;

            this.radioButtons[index].checked = true;

            return true;
    }
}
