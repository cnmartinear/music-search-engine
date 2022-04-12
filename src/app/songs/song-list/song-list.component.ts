import { Component, ElementRef, Input, OnInit, ViewChild, } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NapsterSearchResult } from '../napster';
import { MusicService } from '../song.service';
import { SpotifySearchResult } from '../spotify';
import { YouTubeSearchResult } from '../youtube';

declare function authenticate(): any;
declare function loadClient(): any;

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
})
export class SongListComponent implements OnInit {
  query: string=""

  @Input() item = "light";
  audioPlayer : HTMLAudioElement = new Audio();
  showResults : boolean = false;
  ytSearchResult!: YouTubeSearchResult
  spSearchResult!: SpotifySearchResult
  npSearchResult!: NapsterSearchResult
  errorMessage: string = ''
  sub!: Subscription

  private _musicService;
  private _spotifyService;
  private _napsterService;
  constructor(musicService: MusicService) {
    this._musicService = musicService;
    this._spotifyService = musicService;
    this._napsterService = musicService;
  }

  ngOnInit(): void {
    authenticate().then(loadClient());
  }

  search(): void {
    this.showResults = true;
    this.searchYoutube();
    this.searchSpotify();
    this.searchNapster();
  }

  searchYoutube(): void {
    this._musicService.getYouTubeSearchResult(this.query).subscribe({
      next: (result) => {
        this.ytSearchResult = result;
        console.log(this.ytSearchResult.items);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  searchSpotify() : void{
    this._spotifyService.getSpotifySearchResult(this.query).subscribe({
      next: (result) => {
        this.spSearchResult = result;
        console.log(this.spSearchResult);
        console.log(this.spSearchResult.tracks);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  searchNapster() : void{
    this._napsterService.getNapsterSearchResult(this.query).subscribe({
      next: (result) => {
        this.npSearchResult = result;
        console.log(this.npSearchResult);
        console.log(this.npSearchResult.search.data.tracks);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  playAudio(previewLink:string) : void{
    if (this.audioPlayer == undefined){
      this.audioPlayer = new Audio();
      this.audioPlayer.src = previewLink;
      this.audioPlayer.load();
      this.audioPlayer.play();
    }
    else if (this.audioPlayer.paused){
      if (this.audioPlayer.src != previewLink){
        this.audioPlayer.src = previewLink;
        this.audioPlayer.load();
        this.audioPlayer.play();
      }
      else this.audioPlayer.play();
    }
    else{
      if (this.audioPlayer.src != previewLink){
        this.audioPlayer.src = previewLink;
        this.audioPlayer.load();
        this.audioPlayer.play();
      }
      else
        this.audioPlayer.pause();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
