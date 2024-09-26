import React from "react";
import bdlogo from "../public/images/bdlogo.png";
import banner_flag from "../public/images/banner_flag.jpg";
import pngegg from "../public/images/pngegg.png";
import Image from "next/image";
import bar_bk from "../public/images/bar_bk.jpg";
import "./style.css";

const Homeinput = () => {
  return (
    <div className="my-2 container-lg">
      <div className="flex justify-center">
        <div className="px-2 pt-2 pb-8 mb-4 bg-white rounded-lg shadow-md ">
          <div className="flex gap-1">
            <div
              className="bg-[#EEEEEE] p-3 w-[142px] h-[121px] flex justify-center items-center"
              style={{
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            >
              <Image src={bdlogo} alt="pngegg" width={82} height={82} />
            </div>
            <div className="">
              <div
                className="grid items-end grid-cols-2 gap-8 bg-[#007814]"
                style={{ borderBottom: "1px solid #95e17d" }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontFamily: " Verdana, Arial, Helvetica, sans-serif; ",
                      margin: " 0px 0px 5px 5px",
                    }}
                    className="font-bold text-left text-[#95e17d]"
                  >
                    {" "}
                    Ministry of Education{" "}
                  </h3>
                </div>
                <div>
                  <Image
                    src={banner_flag}
                    alt="pngegg"
                    className="w-full h-[41px]"
                  />
                </div>
              </div>
              <div className="bg-[#007814] h-[55px]">
                <p
                  style={{
                    fontSize: "17px",
                    fontFamily: " Verdana, Arial, Helvetica, sans-serif; ",
                  }}
                  className="font-bold text-left text-white ps-2"
                >
                  Intermediate and Secondary Education Boards <br /> Bangladesh
                </p>
              </div>
              <div
                className="h-[23px] bk_bar"
                style={{
                  backgroundRepeat: "repeat-x",
                  backgroundColor: "#95e17d",
                  borderTop: "1px solid white",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeinput;
