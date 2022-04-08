import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  ytSearchResult!: YouTubeSearchResult
  spSearchResult!: SpotifySearchResult
  npSearchResult! : NapsterSearchResult
  errorMessage: string = ''
  sub!: Subscription

  private _musicService;
  constructor(musicService: MusicService) {
    this._musicService = musicService;
  }

  ngOnInit(): void {
    authenticate().then(loadClient());
  }

  search(): void {


    this._musicService.getYouTubeSearchResult(this.query).subscribe({
      next: (result) => {
        this.ytSearchResult = result;
        console.log(this.ytSearchResult);
      },
      error: (err) => (this.errorMessage = err),
    });

    this._musicService.getSpotifySearchResult(this.query).subscribe({
      next: (result) => {
        this.spSearchResult = result;
        console.log(this.spSearchResult);
        console.log(this.spSearchResult.tracks);
      },
      error: (err) => (this.errorMessage = err),
    });

    this._musicService.getNapsterSearchResult(this.query).subscribe({
      next: (result) => {
        this.npSearchResult = result;
        console.log(this.npSearchResult);
        console.log(this.npSearchResult.search.data);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
