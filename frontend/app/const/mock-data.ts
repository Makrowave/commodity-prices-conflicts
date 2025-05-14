import type {Conflict} from "~/const/dto";

export const conflicts: Conflict[] = [
  {
    id: 1,
    name: "War on Terror",
    start: new Date('2001-09-11'),
    end: null,
    events: [
      {
        name: "9/11 Attacks",
        date: new Date('2001-09-11')
      },
      {
        name: "Invasion of Afghanistan",
        date: new Date('2001-10-07')
      },
      {
        name: "Invasion of Iraq",
        date: new Date('2003-03-20')
      }
    ]
  },
  {
    id: 2,
    name: "Syrian Civil War",
    start: new Date('2011-03-15'),
    end: null,
    events: [
      {
        name: "Protests begin in Syria",
        date: new Date('2011-03-15')
      },
      {
        name: "Syria begins crackdown on protesters",
        date: new Date('2011-04-04')
      },
      {
        name: "The battle of Aleppo begins",
        date: new Date('2012-07-08')
      },
      {
        name: "Russian intervention in Syria",
        date: new Date('2015-09-30')
      }
    ]
  },
  {
    id: 3,
    name: "Yemeni Civil War",
    start: new Date('2014-09-21'),
    end: null,
    events: [
      {
        name: "Houthi rebels seize control of Sana'a",
        date: new Date('2014-09-21')
      },
      {
        name: "Saudi-led coalition intervenes in Yemen",
        date: new Date('2015-03-26')
      },
      {
        name: "UN-brokered peace talks collapse",
        date: new Date('2016-08-06')
      }
    ]
  },
  {
    id: 4,
    name: "Russian Invasion of Ukraine",
    start: new Date('2022-02-24'),
    end: null,
    events: [
      {
        name: "Invasion of Ukraine by Russian forces",
        date: new Date('2022-02-24')
      },
      {
        name: "Siege of Mariupol begins",
        date: new Date('2022-03-01')
      },
      {
        name: "Russian withdrawal from Kyiv region",
        date: new Date('2022-04-03')
      }
    ]
  },
  {
    id: 5,
    name: "Tigray War",
    start: new Date('2020-11-04'),
    end: new Date('2022-11-02'),
    events: [
      {
        name: "Tigray People's Liberation Front clashes with Ethiopian Army",
        date: new Date('2020-11-04')
      },
      {
        name: "Eritrean forces intervene",
        date: new Date('2020-11-09')
      },
      {
        name: "Tigray ceasefire agreement signed",
        date: new Date('2022-11-02')
      }
    ]
  },
  {
    id: 6,
    name: "First Russo-Ukrainian War",
    start: new Date('2014-02-20'),
    end: new Date('2015-02-12'),
    events: [
      {
        name: "Euromaidan protests in Ukraine",
        date: new Date('2013-11-21')
      },
      {
        name: "Annexation of Crimea by Russia",
        date: new Date('2014-03-18')
      },
      {
        name: "Pro-Russian unrest in Eastern Ukraine begins",
        date: new Date('2014-04-06')
      },
      {
        name: "Battle of Donetsk Airport",
        date: new Date('2014-05-26')
      },
      {
        name: "MH17 plane shot down",
        date: new Date('2014-07-17')
      },
      {
        name: "Minsk I ceasefire agreement",
        date: new Date('2014-09-05')
      },
      {
        name: "Minsk II ceasefire agreement",
        date: new Date('2015-02-12')
      }
    ]
  },
  {
    id: 7,
    name: "Nagorno-Karabakh Conflict (2020)",
    start: new Date('2020-09-27'),
    end: new Date('2020-11-10'),
    events: [
      {
        name: "Armenian and Azerbaijani forces clash",
        date: new Date('2020-09-27')
      },
      {
        name: "Ceasefire agreement signed",
        date: new Date('2020-11-10')
      }
    ]
  }
];
