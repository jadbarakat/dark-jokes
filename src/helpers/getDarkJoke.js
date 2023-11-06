import axios from "axios";

export const getDarkJoke = async (categories, isSafe) => {
  // const blacklistText = blacklist.join(",");
  const chosenCategories = categories.join(",");

  const baseURL = "https://v2.jokeapi.dev/joke/";
  const safeURL = isSafe ? "?safe-mode" : "";

  // const URL =
  //   blacklist.length !== 0
  //     ? `https://v2.jokeapi.dev/joke/Dark?blacklistFlags=${blacklistText}`
  //     : `https://v2.jokeapi.dev/joke/Dark`;

  const URL =
    categories.length === 0
      ? `${baseURL}Any${safeURL}`
      : `${baseURL}${chosenCategories}`;

  const options = {
    method: "GET",
    url: URL,
  };

  try {
    const response = await axios.request(options);

    if (response.data.type === "single") {
      const delivery = response.data.joke;
      const jokeId = response.data.id;
      return { delivery, jokeId };
    }
    if (response.data.type === "twopart") {
      const setup = response.data.setup;
      const jokeId = response.data.id;
      const delivery = response.data.delivery;
      return { setup, delivery, jokeId };
    }
  } catch (error) {
    console.error(error);
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

export const JOKE_CATEGORIES = [
  "programming",
  "misc",
  "dark",
  "pun",
  "spooky",
  "christmas",
];
