import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SongListComponent } from './songs/song-list/song-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SongListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
