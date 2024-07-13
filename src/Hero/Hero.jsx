import Carousel from "../Carousel/Carousel";
import { images } from "../constants/index";
import Content from "../Content/Content";

export default function Hero() {
  return (
    <>
      <Carousel>
        {images.map((image) => (
          <div className="relative w-full h-full" key={image.id}>
            <img
              width={1000}
              height={Math.floor((1000 * 9) / 16)}
              className="min-w-[100vw] h-full object-cover snap-center"
              src={image.download_url}
              alt="carousel image"
            />
          </div>
        ))}
      </Carousel>
      <Content />
    </>
  );
}
