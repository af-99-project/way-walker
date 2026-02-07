/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NAVER_MAPS_KEY_ID?: string;
  readonly VITE_APP_APIKEY?: string;
  readonly VITE_APP_AUTHDOMAIN?: string;
  readonly VITE_APP_PROJECTID?: string;
  readonly VITE_APP_STORAGEBUCKET?: string;
  readonly VITE_APP_MESSAGINGSENDERID?: string;
  readonly VITE_APP_APPID?: string;
  readonly VITE_APP_MEASUREMENTID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
