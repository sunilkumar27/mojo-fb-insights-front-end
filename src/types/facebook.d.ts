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

/*interface FacebookLoginOptions {
  scope: string;
}

interface FacebookSDK {
  init(params: {
      appId: string;
      cookie?: boolean;
      xfbml?: boolean;
      version: string;
  }): void;

  login(
      callback: (response: FacebookStatusResponse) => void,
      options?: FacebookLoginOptions
  ): void;

  logout(callback: (response: any) => void): void;

  getLoginStatus(callback: (response: FacebookStatusResponse) => void): void;

  api(
      path: string,
      method?: string,
      params?: object,
      callback?: (response: any) => void
  ): void;
}

declare global {
  interface Window {
      FB: FacebookSDK;
      fbAsyncInit: () => void;
  }
}*/

export type { FacebookAuthResponse, FacebookStatusResponse };