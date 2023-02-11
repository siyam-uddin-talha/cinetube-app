export interface IMovie {
  _id: string;
  name: string;
  subTitle: string;
  company: string;
  movieUrl: string;
  trailerUrl: string;
  thumbnail: string;
  language: string;
  description: string;
  released: number;
  duration: number;
  star: number;
  country: string;
  adult: Boolean;
  quality: string;
  tags: [string];
  comment: {
    _id: string;
    createdAt: string;
    userId: string;
    comment: string;
    star: number;
    userName: string;
    profilePhoto: string | undefined;
  };
  commentsCount: number;
  inputDisable: boolean;
}

export interface IUser {
  _id: string;
  userName: string;
  email: string;
  information: {
    firstName: string;
    lastName: string;
    profilePhoto: string;
    gender: string;
    dateOfBirth: string;
  };
  watchList: [];
  verify: boolean;
}

export interface ICommentType {
  _id: string;
  createdAt: string;
  comment: string;
  star: number;
  userName: string;
  userId: string;
  profilePhoto: string | undefined;
}

export type MovieContentsType = {
  name: string;
  movies: IMovie[];
};

export type ContentType = {
  _id: string;
  movieId: string;
  thumbnail: string;
  collectionName: string;
  movieName: string;
};

export interface IHistoryMovie {
  _id: string;
  collectionName: string;
  uid: string;
  name: string;
  subTitle: string;
  company: string;
  movieUrl: string;
  trailerUrl: string;
  thumbnail: string;
  description: string;
  released: number;
  duration: number;
  star: number;
  country: string;
  adult: Boolean;
  quality: string;
  tags: [string];
  comment: {
    _id: string;
    createdAt: string;
    userId: string;

    comment: string;
    star: number;
    userName: string;
    profilePhoto: string | undefined;
  };
  commentsCount: number;
}

export function calculateAge(birthday: { getTime: () => number }) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function uid() {
  var h = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  var k = [
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "-",
    "x",
    "x",
    "x",
    "x",
    "-",
    "4",
    "x",
    "x",
    "x",
    "-",
    "y",
    "x",
    "x",
    "x",
    "-",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
    "x",
  ];
  var u = "",
    i = 0,
    rb = (Math.random() * 0xffffffff) | 0;
  while (i++ < 36) {
    var c = k[i - 1],
      r = rb & 0xf,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    u += c == "-" || c == "4" ? c : h[v];
    rb = i % 8 == 0 ? (Math.random() * 0xffffffff) | 0 : rb >> 4;
  }
  return u;
}

export type SelectorType = {
  user: IUser;
};
