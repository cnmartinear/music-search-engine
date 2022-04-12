export interface NapsterSearchResult {
  search: {
    data: {
      albums: NapsterAlbums[];
      artists: NapsterArtists[];
      tracks: NapsterTracks[];
    };
  };
}

export interface NapsterAlbums {
  id: string;
  name: string;
  released: Date;
}

export interface NapsterArtists {}

export interface NapsterTracks {
  playbackSeconds: number;
  name: string;
  href: string;
  artistName: string;
  albumName: string;
  albumID: string;
  previewURL: string;

}
