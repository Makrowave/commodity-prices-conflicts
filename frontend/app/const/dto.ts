export type Conflict = {
  name: string,
  start: Date
  end: Date | null
  events: Event[]
}

export type Event = {
  name: string,
  date: Date
}