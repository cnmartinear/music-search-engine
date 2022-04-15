export interface SpotifySearchResult
{
  tracks : {
    href: string,
    items : SpotifyItem[]
  }
}

export interface SpotifyItem
{
  album: SpotifyAlbum,
  artists: SpotifyArtist[],
  duration_ms: number,
  href: string,
  name: string,
  preview_url: string,
  external_urls: {
    spotify: string
  }

}

export interface SpotifyAlbum
{
  album_type: string,
  artists: SpotifyArtist[]
  release_date: Date
  name: string
  images: SpotifyImage[]
}

export interface SpotifyArtist
{
  href: string,
  id: string,
  name: string
}

export interface SpotifyImage
{
  url : string;
  height: string;
  width: string;
}
