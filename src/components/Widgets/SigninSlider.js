/**
 ** Signin Slider
 **/
import React from "react";
import Slider from "react-slick";

// app config
import AppConfig from "../../constants/AppConfig";

export default class SigninSlider extends React.PureComponent {
  state = {
    sessionUsersData: [
      {
        id: 1,
        name: "INFORMED",
        avatar: "https://randomuser.me/api/portraits/women/66.jpg",
        profile: AppConfig.crlImage1,
        designation: "Stay up to date",
        body: "Your data, now available anywhere."
      },
      {
        id: 2,
        name: "Control",
        avatar: "https://randomuser.me/api/portraits/women/66.jpg",
        profile: AppConfig.crlImage2,
        designation: "Take back control",
        body:
          "Become proactive, with your own dashboards of data that means something to you."
      },
      {
        id: 3,
        name: "Power",
        avatar: "https://randomuser.me/api/portraits/women/66.jpg",
        profile: AppConfig.crlImage3,
        designation: "Empower your team",
        body:
          "Analyze your business with meaningful data available at your fingertips"
      }
    ]
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      swipe: true,
      touchMove: true,
      swipeToSlide: true,
      draggable: true
    };
    const { sessionUsersData } = this.state;
    return (
      <div className="session-slider">
        <Slider {...settings}>
          {sessionUsersData &&
            sessionUsersData !== null &&
            sessionUsersData.map((data, key) => (
              <div key={key}>
                <img
                  src={data.profile}
                  alt="session-slider"
                  className="img-fluid"
                  width="377"
                  height="588"
                />
                <div className="rct-img-overlay">
                  <h5 className="client-name">{data.name}</h5>
                  <span>{data.designation}</span>
                  <p className="mb-0 fs-14">{data.body}</p>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    );
  }
}
