// Incoming
export type Conflict = {
  id: number,
  name: string,
  start: Date
  end: Date | null
  events: Event[]
}

export type Event = {
  name: string,
  date: Date
}

export type CommoditiesInMonth = {
  date: Date
} & {
  [key: string]: number;
};

// Outgoing
export type ConflictQuery = {
  from: Date
  to: Date
  regions: string[];
}