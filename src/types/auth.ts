export interface FacebookUser {
    id: string;
    name: string;
    email?: string;
    picture?: {
      data: {
        url: string;
        width: number;
        height: number;
      };
    };
  }
  
  export interface FacebookAuthResponse {
    accessToken: string;
    userID: string;
    expiresIn: number;
    signedRequest: string;
    graphDomain: string;
    data_access_expiration_time: number;
  }
  
  export interface FacebookLoginStatus {
    status: 'connected' | 'not_authorized' | 'unknown';
    authResponse: FacebookAuthResponse | null;
  }