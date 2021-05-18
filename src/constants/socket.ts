if (!process.env.REACT_APP_API_URL) {
  throw new Error('No url in .env file');
}

export const Url = process.env.REACT_APP_API_URL!;
