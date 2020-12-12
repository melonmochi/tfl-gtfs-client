export default {
  tlfApi: (endpoint: string): string =>
    `https://api.tfl.gov.uk${endpoint}?app_id=${process.env.TLF_APP_ID}&app_key=${process.env.TLF_APP_KEY}`,
};
