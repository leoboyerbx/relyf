import type { LngLatLike } from 'mapbox-gl'

export interface ToiletData {
  coordinates: LngLatLike
  acceshandi?: boolean
  infoloc?: string
  adresse: string
  codinsee: '69384'
  gid: number
  payant?: boolean
  provenance: string
  unisexe?: boolean
  hommes?: boolean
  web: string

}
