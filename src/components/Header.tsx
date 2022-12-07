import { useEffect } from "react";
import styled from "styled-components";
import { DarkGray, Pink } from "../styles";
import { useImagesContext } from "../useImagesContext";

const Header = () => {
  const { shuffleImages } = useImagesContext();

  useEffect(() => {
    const listener = (key: KeyboardEvent) => {
      if (key.code === "Space") {
        shuffleImages();
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [shuffleImages]);

  return (
    <Wrapper>
      <img src="/luminor-giphy/TESTHY.svg" alt="" />
      <section>
        <img src="/luminor-giphy/info.svg" alt="" />
        <p>
          Press <span>spacebar</span> to shuffle or{" "}
          <button onClick={shuffleImages}>Click here</button>
        </p>
        <button className="mobile-button" onClick={shuffleImages}>
          Click to shuffle
        </button>
      </section>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  background: ${DarkGray};
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 1.25rem;
  color: rgb(99, 100, 101);
  z-index: 1;
  position: sticky;
  top: 0;

  section {
    display: flex;
    flex: 1;
    justify-content: end;
  }

  section img {
    margin-right: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
    margin-top: auto;
    margin-bottom: auto;
    @media (max-width: 768px) {
      display: none;
    }
  }

  section p {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .mobile-button {
    @media (min-width: 768px) {
      display: none;
    }
  }

  section button {
    color: white;
    border: none;
    cursor: pointer;
    background: ${Pink};
    border-radius: 4px;
    padding: 0.5rem 1rem;
    margin-left: 0.25rem;
    font-family: inherit;
    font-size: 0.75rem;
  }

  section span {
    color: white;
    text-decoration: underline;
    font-weight: 500;
  }
`;
