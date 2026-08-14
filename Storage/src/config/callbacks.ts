import axios from "axios";

// const ax = axios({
//     baseURL:"/"
// });
export const subscriptionConfirmedFn = async (subscriptionUrl: string) => {
  await axios.get(subscriptionUrl);
  console.log(`Subscription configmed at ${subscriptionUrl}`);
};


