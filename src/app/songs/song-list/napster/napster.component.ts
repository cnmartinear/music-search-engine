import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NapsterSearchResult, NapsterTrack } from '../../napster';
import { PageEvent } from '@angular/material/paginator'
import { MusicService } from '../../song.service';

@Component({
  selector: 'app-napster',
  templateUrl: './napster.component.html',
  styleUrls: ['./napster.component.css']
})
export class NapsterComponent{
  @Input() item = "light";
  pageSize: number = 20;
  itemCount : number = 0;
  searchResult! : NapsterSearchResult
  searchResultDisplay : NapsterTrack[] = []
  private musicService;
  audioPlayer : HTMLAudioElement = new Audio();
  errorMessage : string = "";
  // @Output() searchResults = new EventEmitter<NapsterSearchResult>();
  // @Output() searchResults = new EventEmitter<NapsterSearchResult>();
  // @Output() searchResults = new EventEmitter<NapsterSearchResult>();


  constructor(musicService: MusicService) {
    this.musicService = musicService;
  }


  handlePageEvent(event: PageEvent){
    this.searchResultDisplay = this.searchResult.search.data.tracks.slice(event.pageIndex * this.pageSize, (event.pageIndex + 1) * (this.pageSize - 1))
  }

  search(query : string) : void {
    this.musicService.getNapsterSearchResult(query).subscribe({
      next: (result) => {
        this.searchResult = result;
        this.searchResultDisplay = this.searchResult.search.data.tracks.slice(0, this.pageSize);
        this.itemCount = this.searchResult.search.data.tracks.length;
        console.log(this.searchResult);
        console.log(this.searchResult.search.data.tracks);
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

  ngOnInit(): void {
    // searchResult = new NapsterSearchResult();
    // searchResultDisplay =
  }
}
