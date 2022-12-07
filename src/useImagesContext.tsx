import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
export type ImagesContent = {
  images: Image[];
  toggleImageLock: (id: string, idx: number) => void;
  shuffleImages: () => void;
};
export const ImagesContext = createContext<ImagesContent>({
  images: [],
  toggleImageLock: () => {},
  shuffleImages: () => {},
});
export const useImagesContext = () => useContext(ImagesContext);

const localStorageImages =
  localStorage.getItem("images") &&
  JSON.parse(localStorage.getItem("images") || "");

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<Image[]>(localStorageImages ?? []);

  const fetchGifs = async () => {
    const data = await axios.get(`https://api.giphy.com/v1/gifs/trending`, {
      params: {
        api_key: process.env.REACT_APP_GIPHY_KEY,
        limit: 12,
        offset: Math.floor(Math.random() * 100),
      },
    });
    return data.data.data as Image[];
  };

  const shuffleImages = () => {
    fetchGifs().then((data) => {
      const sortedImages = data.sort((a, b) =>
        a.import_datetime > b.import_datetime ? 1 : -1
      );
      const filteredLocked = images.filter((img) => img.locked);
      filteredLocked?.map((img) => (sortedImages[img.idx as number] = img));

      setImages(sortedImages);
    });
  };

  useEffect(() => {
    shuffleImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleImageLock = (id: string, idx: number) => {
    const updatedImages = images.map((img) =>
      img.id === id ? { ...img, locked: !img.locked, idx } : img
    );
    setImages(updatedImages);
    localStorage.setItem("images", JSON.stringify(updatedImages));
  };

  return (
    <ImagesContext.Provider value={{ images, toggleImageLock, shuffleImages }}>
      {children}
    </ImagesContext.Provider>
  );
};

export interface Image {
  id: string;
  images: {
    downsized: {
      url: string;
    };
    downsized_medium: {
      url: string;
    };
  };
  import_datetime: string;
  locked?: boolean;
  idx?: number;
}
