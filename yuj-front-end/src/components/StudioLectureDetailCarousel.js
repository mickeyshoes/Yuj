import React, { useEffect } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from "styled-components";

const StudioLectureDetailCarousel = (props) => {
  const lecture = props.thisLecture;
  // const [carouselImages, setCarouselImages] = useState([]);
  const carouselImages = lecture.images;
  console.log("carousel :: " , carouselImages);

  const carousel = carouselImages.map((img, index) => {
    // let left = '';
    // let right = '';
    // if(index === 0) {
    //     left = `#${carouselImages[carouselImages.length-1].origFileName}`;
    //     right = `#${carouselImages[index+1].origFileName}`
    // } else if(index === carouselImages.length-1) {
    //     left = `#${carouselImages[index-1].origFileName}`
    //     right = `#${carouselImages[0].origFileName}`
    // } else {
    //     left = `#${carouselImages[index-1].origFileName}`
    //     right = `#${carouselImages[index+1].origFileName}`
    // }

    return (
    <div key={index} id={`${img.origFileName}`} className="carousel-item relative justify-center w-full">
      <div className="self-center px-28">
        <img
          src={`${process.env.REACT_APP_IMAGE_URL}/${img.filePath}`}
          alt={img.origFileName}
          className="w-full"
        />
      </div>
      {/* <div className="absolute flex justify-between transform -translate-y-1/2 left-0 right-0 top-1/2">
        <a href={left} className="btn btn-circle btn-sm btn-ghost">
          ❮
        </a>
        <a href={right} className="btn btn-circle btn-sm btn-ghost">
          ❯
        </a>
      </div> */}
    </div>
    );
  });

  const carouselNav = carouselImages.map((img, index) => {
    return (
        <a key={index} href={`#${img.origFileName}`} className="px-1">
          <CircleIcon style={{ fontSize: "0.4rem" }} />
        </a>
    )
  })

  // 리액트 슬릭
  const SimpleSlider = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
    };
    
    return (
    	<StyledSlider {...settings}>
                {carousel}
        </StyledSlider>  
    );
    }

  return (
    <div className="mb-14">
        {/* <div>
            <div className="carousel w-full">
                {carousel}
            </div>
            <div className="flex justify-center w-full py-3 gap-2">
                {carouselNav}
            </div>
        </div> */}
        {SimpleSlider()}
    </div>
  );
};

export default StudioLectureDetailCarousel;



const StyledSlider = styled(Slider)`

  .slick-prev {
    z-index: 1;
    left: 30px;
  }

  .slick-next {
    right: 40px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    // opacity: 0.5;
    color: lightgray;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    color: gray;

    li button:before {
      color: gray;
    }

    li.slick-active button:before {
      color: gray;
    }
  }
`;