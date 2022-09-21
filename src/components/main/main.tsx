import { FC } from "react";
import { Banner } from "../banner/banner";
import { Carousel } from "../carousel";
import { MainInfo } from "../main-info";

const Main: FC = () => {
  return (
    <>
      <Banner />
      <MainInfo />
    </>
  );
};

export { Main };
