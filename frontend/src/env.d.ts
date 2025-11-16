/* pour que TypeScript détecte REACT_APP_API_URL */
declare const process: {
  env: {
    REACT_APP_API_URL?: string;
  };
};
