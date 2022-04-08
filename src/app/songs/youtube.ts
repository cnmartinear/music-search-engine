export interface YouTubeSearchResult
 {
  kind: string,
  etag: string,

  nextPageToken: string,
  regionCode: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items: YouTubeItems[]
 }

 export interface YouTubeItems{
  id : YoutubeID
  snippet: YouTubeSnippet
 }

 export interface YoutubeID{
    videoId: string
 }

 export interface YouTubeSnippet{
    channelId:string,
    channelTitle:string,
    description:string,
    liveBroadcastContent:string,
    publishTime:Date,
    publishedAt:Date,
    title: string
 }
