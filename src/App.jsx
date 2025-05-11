import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const App = () => {
  let [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.6,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });
  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    // gsap.to(".character", {
    //   scale: 1.4,
    //   x: "-50%",
    //   bottom: "-25%",
    //   rotate: 0,
    //   duration: 2,
    //   delay: "-.8",
    //   ease: "Expo.easeInOut",
    // });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });
    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", (e) => {
      const move = (e.clientX/window.innerWidth - 0.5) * 40;
      gsap.to(".main .text",{
        x:`${move * 0.4}%`
      })
      gsap.to(".sky",{
        x:move
      })
      gsap.to(".bg",{
        x:move*1.7
      })
    })
  },[showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && 
        <div className="main w-full">
          <div className="landing w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 w-full py-10 px-10 z-[10]">
              <div className="logo flex gap-8">
                <div className="lines">
                  <div className="line1 w-10 h-1.5 bg-white mb-2"></div>
                  <div className="line2 w-8 h-1.5 bg-white mb-2"></div>
                  <div className="line3 w-6 h-1.5 bg-white mb-2"></div>
                </div>
                <h3 className="text-white text-2xl -mt-[6px] leading-none" >ROCKSTAR</h3>
              </div>
              </div>
              <div className="imageclass relative w-full h-screen overflow-hidden">
              <img
                className="sky absolute scale-[1.1] left-0 top-0 w-full h-full object-cover"
                src="./sky.png"
                alt="sky"
              />
              <img 
                className="bg absolute scale-[1.1] left-0 top-0 w-full h-full object-cover" 
                src="./bg.png" 
                alt="bg" 
              />
              <div className="text absolute top-10 left-1/2 -translate-x-1/2 flex flex-col gap-2 leading-none">
                <h1 className="text text-white text-9xl -ml-40 -my-10">grand</h1>
                <h1 className="text text-white text-9xl ml-5 my-5">theft</h1>
                <h1 className="text text-white text-9xl -ml-40 -my-15">auto</h1>
              </div>
              <img
                className="character absolute left-1/2 -translate-x-1/2 -bottom-[80%] scale-[0.6] object-cover"
                src="./girlbg.png"
                alt="girlbg"

              />
              <div className="btm-part absolute bottom-0 left-0 w-full py-10 bg-gradient-to-t from-black to-transparent z-10">
                <div className="icon flex text-white items-center" >
                  <i className="ri-arrow-down-line text-3xl"></i>
                  <h3 className="font-[Helvitica-now-display] text-xl">Scroll Down</h3>
                </div>
              <img className="absolute top-1/1.9 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[45px] "
              src="./ps5.png" alt="ps5 image"/>
              </div>
            </div>
          </div>
          
        </div>
      }
    </>
  );
};

export default App;
