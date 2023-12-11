import axios from "axios";

export const getJoke = async (categories, isSafe) => {
  const chosenCategories = categories.join(",");

  const baseURL = "https://v2.jokeapi.dev/joke/";
  const safeURL = isSafe ? "?safe-mode" : "";

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

export const JOKE_CATEGORIES_ANDROID = [
  "programming",
  "misc",
  "dark",
  "pun",
  "spooky",
  "christmas",
];

export const JOKE_CATEGORIES_IOS = [
  "programming",
  "misc",
  "pun",
  "spooky",
  "christmas",
];
