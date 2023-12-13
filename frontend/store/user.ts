import * as React from "react";
import {atom} from "jotai";

export type User = {
  admin_id: number;
  artist_id: number;
  bio: string;
  collector_id: number;
  created_at: string;
  email: string;
  first_name: string;
  last_name: string; 
  link: string;
  password_hash: string;
  phone: string;
  price: number;
  privileges: string;
  profile_image: string;
  rank: number;
  user_id: number;
  username: string;
}


export const userAtom = atom<User|null>(null);