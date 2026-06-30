export interface IEnvironment {
  apiHost: string;
  strapiHost: string;
  externalServices: {
    cloudinary: {
      name: string;
      apiKey: string;
      apiSecret: string;
    };
  };
  contactPhone: string;
  siteUrl: string;
}
