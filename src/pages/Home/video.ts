
import { Video } from "./videointerface";
import VideoData from "../../../JSON/Video.json";

export class videoslider 
{
  private videos: Video[] = null;
  private youtubePlayer: HTMLFormElement;
  private youtubetitle: HTMLLabelElement;
  private smallVideo:NodeListOf<HTMLVideoElement> = null;

  constructor(contentDiv:HTMLElement) 
  {

    // this.videos = VideoData as Video[];
    this.youtubetitle = contentDiv.querySelector('#youtube-title') as HTMLLabelElement;
    this.youtubePlayer = contentDiv.querySelector('#youtube-player') as HTMLFormElement;
    this.smallVideo = contentDiv.querySelectorAll(".video_container .vid video") as NodeListOf<HTMLVideoElement>;

      // console.log(this.smallVideo);
    this.smallVideo.forEach((video) => video.addEventListener('click', () => this.selectVideo(video)))

    // console.log(this.smallVideo)
  }

  // private getVideoById(id: string): Video 
  // {
  //   let find =  this.videos.find(video => video.videoIds === id);
  //   return find;
  // }


  private selectVideo(index: HTMLVideoElement): void 
  {
    // console.log(hell)
    console.log(index);

    // let link:any =  this.youtubePlayer;
    // let image: HTMLVideoElement = link.children;

    // let video = this.getVideoById(index);

    // if(video)
    // {
      // link.href = video;
      // image.src = video.video;
      // this.youtubetitle.textContent = video.title;
    // }
  }
}
