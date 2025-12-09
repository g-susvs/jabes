export interface IEnvironment {
  mongoUri: string;
  apiHost: string;
  externalServices: {
    cloudinary: {
      name: string;
      apiKey: string;
      apiSecret: string;
    };
  };
  contactPhone: string;
  jwt: {
    secret: string;
  }
}
