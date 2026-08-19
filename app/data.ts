export type EventItem = {
  slug: string;
  title: string;
  artist: string;
  start: number;
  duration: number;
  image: string;
  shortDescription: string;
  description: string;
  address: string;
  mapsUrl: string;
};

export type Venue = {
  name: string;
  color: string;
  events: EventItem[];
};

export const venues: Venue[] = [
  {
    name: "Workshops",
    color: "bg-pink-500",
    events: [
      {
        slug: "sing-woods",
        title: "Woodsong",
        artist: "Sarah McCaskey",
        start: 11 * 60,
        duration: 60,
        image: "/artists/sarah.png",
        shortDescription: "Participatory song circle in the woods.",
        description: "Participatory song circle in the woods. Fun warm-ups for body and voice. Learn simple rounds and harmony songs. No previous experience necessary. All ages and voices welcome.",
        address: "Rosabelle Avenue Carpark",
        mapsUrl: "https://maps.app.goo.gl/aJDac7oJrcwKUFU89"
      },
            {
        slug: "indie-set",
        title: "Wivenhoe Gospel Choir Experience",
        artist: "Dirk Paterson",
        start: 13 * 60,
        duration: 120,
        image: "/artists/dirk.jpeg",
        shortDescription: "Wivenhoe Gospel Choir Experience",
        description: "Try a vocal workout in the Wivenhoe Gospel Choir experience. Participants will access their voices through this fun, exhilarating, and simple music. We’ll get you singing in parts and exploring a range of vocal colours and techniques. No prior choral experience necessary.",
        address: "Rosabelle Avenue Carpark",
        mapsUrl: "https://maps.app.goo.gl/aJDac7oJrcwKUFU89"
      },
    ],
  },
  {
    name: "Open Studios",
    color: "bg-green-500",
    events: [
      {
        slug: "poetry-jam",
        title: "Open Studios",
        artist: "Many Artists",
        start: 11 * 60,
        duration: 280,
        image: "/artists/poetry-jam.svg",
        shortDescription: "Open houses, garages, studios ",
        description: "Musicians open their spaces to share with you their music and creative process.",
      
        address: "Rosabelle Avenue Carpark",
        mapsUrl: "https://maps.app.goo.gl/aJDac7oJrcwKUFU89"},
    ],
  },
  {
    name: "Barrells",
    color: "bg-orange-500",
    events: [
      {
        slug: "morning-dj",
        title: "Coffee DJ",
        artist: "The Maghreban",
        start: 8 * 60,
        duration: 60,
        image: "/artists/ayman.jpg",
        shortDescription: "The Maghreban will be DJing in the morning for a bit of coffee and music.", 
        description: "The Maghreban will be DJing in the morning for a bit of coffee and music.",
        address: "Barrells of Wivenhoe",
        mapsUrl: "https://maps.app.goo.gl/jNm9xgjLfpka6G4U8"
      },
    ],
  },
  
  {
    name: "St Mary's Church Yard",
    color: "bg-blue-500",
    events: [
      {
        slug: "choir",
        title: "Millfields Primary Choir",
        artist: "Millfields Primary Choir",
        start: 11.5 * 60,
        duration: 30,
        image: "/artists/choir.svg",
        shortDescription: "Millfields Primary Choir",
        description: "A joyful primary choir performance featuring a mix of contemporary and traditional repertoire.",
        address: "St Mary's Church Yard",
        mapsUrl: "https://maps.app.goo.gl/zCCpyZksPshdSmJH7"
      },
      {
        slug: "folk-duo",
        title: "Wivenhoe Youth Choir",
        artist: "Ben & Sarah",
        start: 15 * 60,
        duration: 40,
        image: "/artists/folk-duo.svg",
        shortDescription: "Songs, fiddle and acoustic folk traditions.",
        description: "River & Reed perform folk songs and instrumentals with fiddle, guitar and close vocal harmonies.",
        address: "St Mary's Church Yard",
        mapsUrl: "https://maps.app.goo.gl/zCCpyZksPshdSmJH7"
      },
    ],
  },
  
  
  {
    name: "Black Buoy",
    color: "bg-purple-500",
    events: [
      {
        slug: "dj-set",
        title: "The Black Buoy Buskers",
        artist: "The Black Buoy Buskers",
        start: 12 * 60,
        duration: 150,
        image: "/artists/dj-set.svg",
        shortDescription: "Acoustic session by The Black Buoy Buskers",
        description: "An entirely acoustic performance by a group that varies from 5-8 musicians, mostly performing pop and rock songs from the 60s & 70s.",
        address: "The Black Buoy",
        mapsUrl: "https://maps.app.goo.gl/5WawfkteFfTUo6Bk7"
      },
      {
        slug: "folk",
        title: "Folk Session",
        artist: "Various Artists",
        start: 15.5 * 60,
        duration: 120,
        image: "/artists/dj-set.svg",
        shortDescription: "Acoustic session by The Black Buoy Buskers",
        description: "An acoustic performance by a group of folk makers",
        address: "The Black Buoy",
        mapsUrl: "https://maps.app.goo.gl/5WawfkteFfTUo6Bk7"
        },
    ],
  },
  {
    name: "West Street",
    color: "bg-yellow-500",
    events: [
      {
        slug: "west-street",
        title: "West Street",
        artist: "Many Artists",
        start: 15 * 60,
        duration: 150,
        image: "/artists/poetry-jam.svg",
        shortDescription: "An open garden concert featuring The Good Badgers folllwed by The Glowsticks",
        description: "An open garden concert featuring The Good Badgers folllwed by The Glowsticks",
        address: "21 West Street",
        mapsUrl: "https://maps.app.goo.gl/kysiu8kTwy1PExnDA"
      },
    ],
  },

  {
    name: "Old Grocery",
    color: "bg-red-300",
    events: [
      {
        slug: "old-grocery",
        title: "Old Grocery Jammers",
        artist: "Many Artists",
        start: 13 * 60,
        duration: 150,
        image: "/artists/poetry-jam.svg",
        shortDescription: "The Old Grocery Jammers playing live at the driveway of this classic artspace",
        description: "The Old Grocery Jammers playing live at the driveway of this classic artspace",
        address: "The Old Grocery",
        mapsUrl: "https://maps.app.goo.gl/sTozYXY4EJRV8VGUA"
      },
    ],
  },
   {
    name: "Rose & Crown",
    color: "bg-yellow-700",
    events: [
      {
        slug: "roseandcrown",
        title: "Songwriters",
        artist: "Many Artists",
        start: 17 * 60,
        duration: 150,
        image: "/artists/poetry-jam.svg",
        shortDescription: "By the quay, five different singers and songwriters will set the mood for the evening",
        description: "By the quay, five different singers and songwriters will set the mood for the evening",
        address: "Rose and Crown",
        mapsUrl: "https://maps.app.goo.gl/YTwdm1QgZ9LTce7w5"
      },
    ],
  },

   {
    name: "Jetty",
    color: "bg-red-900",
    events: [
      {
        slug: "jetty",
        title: "Sunset Supper",
        artist: "Many Artists",
        start: 18 * 60,
        duration: 120,
        image: "/artists/poetry-jam.svg",
        shortDescription: "Bring your own food to share and enjoy lovely Wivenhoe local classical musicians.",
        description: "Bring your own food to share and enjoy lovely Wivenhoe local classical musicians.",
        address: "The Jetty",
        mapsUrl: "https://maps.app.goo.gl/BEY6nDpmPkQCP2Sp7"
      },
    ],
  },
  {
    name: "Station Pub",
    color: "bg-green-900",
    events: [
      {
        slug: "station",
        title: "Station Music",
        artist: "Many Artists",
        start: 19 * 60,
        duration: 120,
        image: "/artists/poetry-jam.svg",
        shortDescription: "Live music with a Polish guest band in the evening ",
        description: "Live music with a Polish guest band in the evening ",
        address: "Station Pub",
        mapsUrl: "https://maps.app.goo.gl/6ZuE469kGWVoUjs7A"
      },
    ],
  },
  {
    name: "The Horse and Groom",
    color: "bg-blue-900",
    events: [
      {
        slug: "h&g",
        title: "Horse & Groom Bands",
        artist: "Many Artists",
        start: 20 * 60,
        duration: 120,
        image: "/artists/poetry-jam.svg",
        shortDescription: "Four different bands will wrap up the evening at the H&G ",
        description: "Four different bands will wrap up the evening at the H&G ",
        address: "The Horse and Groom",
        mapsUrl: "https://maps.app.goo.gl/p9UahUkUCiqqLdhB8"
      },
    ],
  },
];

export const allEvents = venues.flatMap((venue) =>
  venue.events.map((event) => ({ ...event, venue: venue.name }))
);
