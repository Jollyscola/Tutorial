export class ImageSlider {
    private videos: {title: string; videoIds: string}[] = null;
    private youtubetitle: HTMLLabelElement;
    private youtubePlayer: HTMLIFrameElement;
    private currentVideoIndex: number = null;
    
    constructor() {
      
        this.videos = [
            { title: 'Slider Title 1', videoIds: 'T33NN_pPeNI' },
            { title: 'Slider Title 2', videoIds: 'SgmNxE9lWcY' },
            { title: 'Slider Title 3', videoIds:  'L3azzI6gqm0' },
        ];

        this.currentVideoIndex = 0;
    }
 
    public prevVideo(): void 
    {
        this.loadVideo(this.currentVideoIndex - 1);
    }

    public nextVideo(): void 
    {
        this.loadVideo(this.currentVideoIndex + 1);
    }
  
    private loadVideo(index: number): void {
        this.youtubetitle = document.getElementById('youtube-title') as HTMLLabelElement;
        this.youtubePlayer = document.getElementById('youtube-player') as HTMLIFrameElement;

        if (index >= 0 && index < this.videos.length) 
        {
            const videoId = this.videos[index];
            this.youtubetitle.textContent = videoId.title;
            const videoUrl = 'https://www.youtube.com/embed/' + videoId.videoIds;
            this.youtubePlayer.src = videoUrl;
            this.currentVideoIndex = index;
        }
    }
}
