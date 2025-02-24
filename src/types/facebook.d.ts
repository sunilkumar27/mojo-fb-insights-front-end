/**
 * Types for facebook auth response.
 */
interface FacebookAuthResponse {
  accessToken: string;
  userID: string;
  expiresIn: number;
  signedRequest: string;
  graphDomain: string;
  data_access_expiration_time: number;
}

interface FacebookStatusResponse {
  status: 'connected' | 'not_authorized' | 'unknown';
  authResponse: FacebookAuthResponse | null;
}

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: FacebookSDK;
  }
}

export type { FacebookAuthResponse, FacebookStatusResponse };