export interface IEnvironment {
  mongoUri: string;
  externalServices: {
    cloudinary: {
      name: string;
      apiKey: string;
      apiSecret: string;
    };
  };
}
