/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_FACEBOOK_APP_ID: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
  declare global {
    interface Window {
      fbAsyncInit: () => void;
      FB: import('./facebook').FacebookSDK;
    }
  }
  
  export {};