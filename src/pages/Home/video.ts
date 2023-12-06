
import { Video } from "./videointerface";
import VideoData from "../../../JSON/Video.json";

export class videoslider 
{
 
  private videotitle: HTMLElement = null;
  private mainvideo: HTMLVideoElement = null;
  private videotext: HTMLParagraphElement = null;
  private smallVideo:NodeListOf<HTMLVideoElement> = null;

  constructor(contentDiv:HTMLElement) 
  {

    this.videotitle = contentDiv.querySelector('.main-video .title') as HTMLElement;
    this.mainvideo = contentDiv.querySelector('.main-video video') as HTMLVideoElement;
    this.videotext = contentDiv.querySelector('.main-video .snippet') as HTMLParagraphElement;
    this.smallVideo = contentDiv.querySelectorAll(".video-thumbnails .vid") as NodeListOf<HTMLVideoElement>;

    this.smallVideo.forEach((video) => video.addEventListener('click', () => this.selectVideo(video)))
  }

  private selectVideo(video: HTMLVideoElement): void 
  {
    this.smallVideo.forEach(vid => vid.classList.remove('active'));

    video.classList.add('active');

    if ( video.classList.contains('active'))
    {
      let title = video.children[1].innerHTML;
      let snippet = video.children[2].innerHTML;
      let src = video.children[0].getAttribute('src');

      this.mainvideo.src = src;
      this.videotitle.innerHTML = title;
      this.videotext.innerHTML = snippet;
    }
  }
}
