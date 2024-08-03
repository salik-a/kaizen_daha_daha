export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

export interface ITag {
  IconUrl: string
  Id: number
  Name: string
  Rank: number
}
