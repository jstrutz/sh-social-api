import axios from 'axios';

interface ClearbitEnv {
  CLEARBIT_API_KEY?: string
}

interface ClearbitProfile {
  name: {
    fullName: string
  },
  location: string,
  avatar: string
}
// interface ClearbitError {
//   error: {
//     message: string,

//   }
// }

export function buildClearbitClient({ CLEARBIT_API_KEY }: ClearbitEnv) {
  if (!CLEARBIT_API_KEY) {
    throw "Missing CLEARBIT_API_KEY";
  }

  return {
    async search(email: string): Promise<ClearbitProfile | undefined> {
      try {
        const response = await axios.get("https://person.clearbit.com/v2/people/find", {
          headers: { Authorization: `Bearer ${CLEARBIT_API_KEY}` },
          params: { email },
        });
        return response.data as ClearbitProfile;
      } catch (err) {
        // Error from clearbit; implicit undefined return
      }
    }
  };
}
