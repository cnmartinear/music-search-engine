import { Injectable, ElementRef, ViewChild } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs";
import { YouTubeSearchResult } from "./youtube";
import { SpotifySearchResult } from "./spotify";
import { NapsterSearchResult } from "./napster";

@Injectable({
  providedIn: 'root'
})
export class MusicService{

  private youtubeAPI_Url : string = "";
  private spotifyAPI_Url : string = "";
  private napsterAPI_Url : string= "";
  private spotifyBearerToken : string = "BQBK3TZ8s6a_ynAxk-rZArmFhx8ThufWlVEglg9_nlEaiGDK2OUA70SwUR-p4dBW-3qCfp12dcGYgwxxEA7P9u-7ketSO64eLUCKCLN3TNom1bFkja9xHI-WPVK4Iw-TyPTyH_dLo1SPn9If2R2kN25krgkZ6cOF748";
  constructor(private http:HttpClient){

  }

   getYouTubeSearchResult(query:string) : Observable<YouTubeSearchResult> {
    this.youtubeAPI_Url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q='
    + query
    + '&key=AIzaSyBiBRp_0KPVTOXPzuqNfVXDSYvOCFFbTnU';
     return this.http.get<YouTubeSearchResult>(this.youtubeAPI_Url).pipe(
       tap(data => console.log('All', JSON.stringify(data))),
       catchError(this.handleError));
   }

   getSpotifySearchResult(query:string) : Observable<SpotifySearchResult> {
    this.spotifyAPI_Url = 'https://api.spotify.com/v1/search?q='+query+'&type=track&limit=25';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.spotifyBearerToken
    })
     return this.http.get<SpotifySearchResult>(this.spotifyAPI_Url, {headers: headers}).pipe(
       tap(data => console.log('All', JSON.stringify(data))),
       catchError(this.handleError));
   }

   getNapsterSearchResult(query:string) : Observable<NapsterSearchResult> {
    this.napsterAPI_Url = 'https://api.napster.com/v2.2/search?query='+query;
    const headers = new HttpHeaders({
      'apikey': 'NDVlZWVlMWYtNTQzMC00NGNkLWI5MWQtNzk1YmIzZmFmYjY4'
    })
     return this.http.get<NapsterSearchResult>(this.napsterAPI_Url, {headers: headers}).pipe(
       tap(data => console.log('All', JSON.stringify(data))),
       catchError(this.handleError));
   }

   private handleError(err : HttpErrorResponse){
      let errorMessage = '';
      if (err.error instanceof ErrorEvent){
        errorMessage = `An error occurred: ${err.error.message}`;
      }
      else{
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }

      console.error(errorMessage);
      return throwError(errorMessage);
   }

   private checkSpotifyAccessToken() : boolean{
      return false;
   }

}
