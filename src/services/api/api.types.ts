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

export interface IPromotions {
  BrandIconColor: string
  BrandIconUrl: string
  BrandPromotionCardParticipationText: string
  CardType: string
  ExternalLoginGate: any
  ExternalRedirectType: any
  ExternalType: any
  ExternalUrl: any
  ExternalWebviewType: any
  Id: number
  ImageUrl: string
  IsLuckyDay: boolean
  ListButtonText: string
  ListButtonTextBackGroudColor: string
  LuckyDayBackgroundColor: string
  LuckyDayText: string
  LuckyDayTextColor: string
  PromotionCardColor: string
  RemainingText: string
  ScenarioType: string
  SeoName: string
  Title: string
  Unavailable: boolean
  Unvisible: boolean
}

export interface IPromotionDetail {
  DetailButtonText: string | undefined
  BrandIconColor: string
  Description: string
  BrandIconUrl: string
  BrandPromotionCardParticipationText: string
  CardType: string
  ExternalLoginGate: any
  ExternalRedirectType: any
  ExternalType: any
  ExternalUrl: any
  ExternalWebviewType: any
  Id: number
  ImageUrl: string
  IsLuckyDay: boolean
  ListButtonText: string
  ListButtonTextBackGroudColor: string
  LuckyDayBackgroundColor: string
  LuckyDayText: string
  LuckyDayTextColor: string
  PromotionCardColor: string
  RemainingText: string
  ScenarioType: string
  SeoName: string
  Title: string
  Unavailable: boolean
  Unvisible: boolean
}

