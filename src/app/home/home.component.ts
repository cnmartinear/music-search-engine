import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusicService } from '../songs/song.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() item = "light";
  query: string=""


  constructor(private router : Router) {
  }

  ngOnInit(): void {
  }

  search(): void {
    this.router.navigate(
      ['/search'],
      { queryParams: { query: this.query } }
    );
  }

}
