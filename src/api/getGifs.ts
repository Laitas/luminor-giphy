import { Image } from "../types";

export const getGifs = async () => {
  const data = await fetch(
    `https://api.giphy.com/v1/gifs/trending?${new URLSearchParams({
      api_key: process.env.REACT_APP_GIPHY_KEY as string,
      limit: "12",
      offset: Math.floor(Math.random() * 100).toString(),
    })}`
  );
  const res = await data.json();
  return res.data as Image[];
};
