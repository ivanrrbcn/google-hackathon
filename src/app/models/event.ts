import { Place } from "./place";

export interface Evento {
  id: number,
  day: Date,
  title: string,
  place: string,
  url: string, 
  available: boolean,
  hour?: string,
  phone?: number,
  description?: string,
}