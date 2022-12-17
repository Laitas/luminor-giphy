import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getGifs } from "./api/getGifs";
import { Image } from "./types";
export type ImagesContent = {
  images: Image[];
  setImages: Dispatch<SetStateAction<Image[]>>;
  shuffleImages: () => Promise<void>;
};
export const ImagesContext = createContext<ImagesContent>({
  images: [],
  setImages: () => {},
  shuffleImages: () => {
    throw new Error("missing context");
  },
});
export const useImagesContext = () => useContext(ImagesContext);

const localStorageImages =
  localStorage.getItem("images") &&
  JSON.parse(localStorage.getItem("images") || "");

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<Image[]>(localStorageImages ?? []);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);

  const shuffleImages = useCallback(async () => {
    const res = await getGifs();

    const sortedImages = res.sort((a, b) =>
      a.import_datetime > b.import_datetime ? 1 : -1
    );
    const filteredLocked = images.filter((img) => img.locked);
    filteredLocked?.map(
      (img) => typeof img.idx !== "undefined" && (sortedImages[img.idx] = img)
    );

    setImages(sortedImages);
  }, [images]);

  useEffect(() => {
    if (!hasInitialLoad) {
      shuffleImages();
      setHasInitialLoad(true);
    }
  }, [hasInitialLoad, shuffleImages]);

  return (
    <ImagesContext.Provider value={{ images, setImages, shuffleImages }}>
      {children}
    </ImagesContext.Provider>
  );
};
