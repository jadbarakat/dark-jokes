import axios from "axios";

export const getDarkJoke = async (blacklist) => {
  const blacklistText = blacklist.join(",");

  const URL = `https://v2.jokeapi.dev/joke/Dark/Any?blacklistFlags=${blacklistText}`;

  const options = {
    method: "GET",
    url: URL,
  };

  try {
    const response = await axios.request(options);

    if (response.data.type === "single") {
      const delivery = response.data.joke;
      return { delivery, JOKE_FLAGS };
    }
    if (response.data.type === "twopart") {
      const setup = response.data.setup;
      const delivery = response.data.delivery;
      return { setup, delivery };
    }
  } catch (error) {
    let errorMessage = "Something went wrong. Please try again.";
    return errorMessage;
  }
};

export const JOKE_FLAGS = [
  "nsfw",
  "religious",
  "political",
  "racist",
  "sexist",
  "explicit",
];
