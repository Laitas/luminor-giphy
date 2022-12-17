import { useImagesContext } from "../useImagesContext";
import styled from "styled-components";
import { PINK } from "../styles";
import type { Image as ImageType } from "../types";

interface Types {
  img: ImageType;
  idx: number;
}

const Image = ({ img, idx }: Types) => {
  const { images, setImages } = useImagesContext();

  const toggleImageLock = (id: string, idx: number) => {
    const updatedImages = images.map((img) =>
      img.id === id ? { ...img, locked: !img.locked, idx } : img
    );
    setImages(updatedImages);
    localStorage.setItem("images", JSON.stringify(updatedImages));
  };

  return (
    <Wrapper onClick={() => toggleImageLock(img.id, idx)}>
      <picture>
        <source media="(min-width:992px)" srcSet={img.images.downsized.url} />
        <img alt="" src={img.images.downsized_medium.url} className="gif" />
      </picture>

      {img.locked ? (
        <span>
          <img src="/luminor-giphy/unlocked.svg" alt="" />
          Click to unlock
        </span>
      ) : (
        <span>
          <img src="/luminor-giphy/locked.svg" alt="" />
          Click to lock
        </span>
      )}
    </Wrapper>
  );
};

export default Image;

const Wrapper = styled.div`
  cursor: pointer;
  position: relative;
  &:hover {
    border: 4px solid ${PINK};
    span {
      opacity: 100;
    }
  }

  .gif {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 16 / 9;
  }

  span {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    opacity: 0;
    transition: opacity 0.3s;
    font-weight: 500;
    color: white;
  }
`;
