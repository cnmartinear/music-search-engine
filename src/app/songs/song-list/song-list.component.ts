import { Component, ElementRef, Input, OnInit, ViewChild, } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NapsterSearchResult, NapsterTrack } from '../napster';
import { MusicService } from '../song.service';
import { SpotifyItem, SpotifySearchResult } from '../spotify';
import { YouTubeItems, YouTubeSearchResult } from '../youtube';
import { PageEvent } from '@angular/material/paginator'
import { NapsterComponent } from '../song-list/napster/napster.component'

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
})
export class SongListComponent implements OnInit{
  query: string=""

  @Input() item = "light";

  view : string = "list";

  audioPlayer : HTMLAudioElement = new Audio();
  showResults : boolean = false;
  ytSearchResult!: YouTubeSearchResult
  spSearchResult!: SpotifySearchResult
  npSearchResult!: NapsterSearchResult

  ytSearchResultDisplay: YouTubeItems[] = []
  spSearchResultDisplay: SpotifyItem[] = []
  npSearchResultDisplay: NapsterTrack[] = []

  ytPageSize = 25;
  spPageSize = 25;
  npPageSize = 25;

  ytItemCount : number = 0;
  spItemCount : number = 0;
  npItemCount : number = 0;

  pageEvent : PageEvent = new PageEvent()
  errorMessage: string = ''
  sub!: Subscription
  pageSizeOptions: number[] = [5, 10, 25, 100];

  napster! : NapsterComponent;



  private _musicService;
  private _spotifyService;
  private _napsterService;

  constructor(musicService: MusicService) {
    this._musicService = musicService;
    this._spotifyService = musicService;
    this._napsterService = musicService;
    this.napster = new NapsterComponent(musicService);
  }

  search(): void {
    this.showResults = true;
    this.searchYoutube();
    this.searchSpotify();
    this.searchNapster();
    this.napster.search(this.query);
  }

  searchYoutube(): void {
    this._musicService.getYouTubeSearchResult(this.query).subscribe({
      next: (result) => {
        this.ytSearchResult = result;
        this.ytSearchResultDisplay = this.ytSearchResult.items.slice(0, this.ytPageSize);
        this.ytItemCount = this.ytSearchResult.items.length;
        console.log(this.ytSearchResultDisplay);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  searchSpotify() : void{
    this._spotifyService.getSpotifySearchResult(this.query).subscribe({
      next: (result) => {
        this.spSearchResult = result;
        this.spSearchResultDisplay = this.spSearchResult.tracks.items.slice(0, this.spPageSize);
        this.spItemCount = this.spSearchResult.tracks.items.length;
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
        this.npSearchResultDisplay = this.npSearchResult.search.data.tracks.slice(0, this.npPageSize);
        this.npItemCount = this.npSearchResult.search.data.tracks.length;
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

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  handlePageEvent(event: PageEvent) {
    this.ytSearchResultDisplay = this.ytSearchResult.items.slice(event.pageIndex * this.ytPageSize, (event.pageIndex + 1) * (this.ytPageSize - 1));
  }

  handleSpotifyPageEvent(event: PageEvent){
    this.spSearchResultDisplay = this.spSearchResult.tracks.items.slice(event.pageIndex * this.spPageSize, (event.pageIndex + 1) * (this.spPageSize - 1));
  }

  handleNapsterPageEvent(event: PageEvent){
    this.npSearchResultDisplay = this.npSearchResult.search.data.tracks.slice(event.pageIndex * this.npPageSize, (event.pageIndex + 1) * (this.npPageSize - 1));
  }

  toggleView(view : string){
    this.view = view;
  }

  ngOnInit(): void {
    //this.toggleView(this.view);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
