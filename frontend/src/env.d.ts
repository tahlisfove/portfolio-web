/* pour que TypeScript détecte VITE_API_URL */
declare const process: {
  env: {
    VITE_API_URL?: string;
  };
};
