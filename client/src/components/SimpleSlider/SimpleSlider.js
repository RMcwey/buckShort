import React from "react";
import Slider from "react-slick";
import pictureArray from "./pictureArray";

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      slickNext: true,
      slickPrevious: true,
      swipe: true,
    };
    return (
      <Slider {...settings}>
        {pictureArray.map((step) => (
          <div key={step.label}>
            <img
              src={step.photo}
              alt={step.label}
              style={{
                borderRadius: "15px",
                height: "300px",
                display: "block",
                overflow: "hidden",
                width: "100%",
              }}
            />
          </div>
        ))}
      </Slider>
    );
  }
}

export default SimpleSlider;
