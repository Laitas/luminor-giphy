import styled from "styled-components";
import Header from "./components/Header";
import Image from "./components/Image";
import { DARK_GRAY } from "./styles";
import { ContextProvider, useImagesContext } from "./useImagesContext";

function App() {
  const { images } = useImagesContext();

  return (
    <>
      <Header />
      <Main>
        {images.map((img, idx) => (
          <Image key={img.id} img={img} idx={idx} />
        ))}
      </Main>
    </>
  );
}

const AppWrapper = () => (
  <ContextProvider>
    <App />
  </ContextProvider>
);

export default AppWrapper;

const Main = styled.main`
  background: ${DARK_GRAY};
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 2fr));
  gap: 1.25rem;
  padding: 1.25rem;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 3fr));
  }

  @media only screen and (min-width: 992px) {
    grid-template-columns: repeat(4, minmax(0, 4fr));
  }
`;
