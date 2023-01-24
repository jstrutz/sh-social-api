declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_FILE: string;
      CLEARBIT_API_KEY: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
    }
  }
}

export {}
