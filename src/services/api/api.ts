import { ApisauceInstance, create, ApiResponse } from "apisauce"
import Config from "../../config"
import type { ApiConfig, ITag } from "./api.types"

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        "X-Country-Id": "TR",
        "X-Language-Id": "TR",
      },
    })
  }

  async getTagsList(): Promise<ITag[]> {
    const response: ApiResponse<ITag[]> = await this.apisauce.get("/tags/list")

    if (!response.ok || !response.data) {
      throw new Error(response.problem || "API Error")
    }

    return response.data
  }

  
}

export const api = new Api()
