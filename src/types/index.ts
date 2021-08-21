export interface IRadius {
  /** The Radius of all the Three Geometry */
  radius: number
}

export type City = string
export type LatLng = number
export type Country = string
export type CountryCode = string
export type Count = number
export type Radius = number

export interface ILocation {
  /** City name */
  city: City
  /** City Latitute */
  lat: LatLng
  /** City Longitude */
  lng: LatLng
  /** Country  name*/
  country: Country
  /** Country code */
  country_code: CountryCode
  /** Page Views count */
  count: Count
}

export type CommentData = string[]

export interface CommentResponse {
  data: CommentData[]
}

export interface CommentResult {
  /** Fauna Ref -- not used */
  ref: string
  /** Twitter Userrs name */
  user: string
  /** Comment left by user */
  comment: string
  /** Date comment submitted */
  date: string
  /** Moderated value */
  approved?: boolean
}
