export type UserContextInterface =
  | {
      loggedIn: true;
      id: number;
      avatar: string | undefined;
      discord_id: string | undefined;
    }
  | {
      loggedIn: false;
      avatar?: undefined;
    };
