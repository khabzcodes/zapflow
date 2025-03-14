import { google } from 'googleapis';

export const oauthClient = (callback: string) => {
  const oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.BETTER_AUTH_URL}/${callback}`,
  );

  return oauthClient;
};
