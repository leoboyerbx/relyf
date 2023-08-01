import type { LngLatLike } from 'mapbox-gl'

export interface ToiletData {
  coordinates: LngLatLike
  acceshandi?: boolean
  adresse: string
  codinsee: '69384'
  gid: number
  payant?: boolean
  provenance: string
  unisexe?: boolean
  web: string

}
