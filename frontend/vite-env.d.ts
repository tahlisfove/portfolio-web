/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;

  /* informations personnelles */
  readonly VITE_EMAIL: string;
  readonly VITE_PHONE?: string;
  readonly VITE_LINKEDIN: string;
  readonly VITE_INSTAGRAM?: string;
  readonly VITE_GITHUB?: string;
  readonly VITE_SPOTIFY?: string;

  /* photo de profil */
  readonly REACT_APP_PROFILE_PHOTO?: string;

  /* CV */
  readonly VITE_CV_FR?: string;
  readonly VITE_CV_EN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
