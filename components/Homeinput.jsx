"use client";
import React, { useState, useEffect } from "react";
import bdlogo from "../public/images/bdlogo.png";
import banner_flag from "../public/images/banner_flag.jpg";
import telitok from "../public/images/pngegg.png";
import Image from "next/image";
import "./style.css";

const Homeinput = () => {
  const [num1, setNum1] = useState(1); // Initial value set to 0 to avoid server-client mismatch
  const [num2, setNum2] = useState(1); // Initial value set to 0
  const [captchaInput, setCaptchaInput] = useState(""); // Captcha input state
  const [formValues, setFormValues] = useState({
    exam: "ssc",
    year: "0000",
    board: "",
    roll: "",
    reg: "",
  });

  const onlyNumbers = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  const refreshMathProblem = () => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
  };

  useEffect(() => {
    refreshMathProblem(); // Generate captcha on mount
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!formValues.board) {
      alert("Please select the board.");
      return;
    }
    if (!formValues.roll) {
      alert("Please enter the roll.");
      return;
    }
    if (!formValues.reg) {
      alert("Please enter the registration number.");
      return;
    }
    if (!captchaInput) {
      alert("Please enter the value.");
      return;
    }

    // Captcha validation

    if (parseInt(captchaInput) !== captchaSum) {
      alert(""); // Alert on wrong captcha
      window.location.reload(); // Reload page if captcha is wrong
    } else {
      // Add your form submission logic here
      alert(""); // Example success message
    }
  };

  const handleReset = () => {
    setFormValues({
      exam: "ssc",
      year: "0000",
      board: "",
      roll: "",
      reg: "",
    });
    setCaptchaInput(""); // Clear captcha input
    refreshMathProblem(); // Reset the captcha
  };

  const inputStyle = {
    backgroundColor: "#F4F0F2",
    border: "1px solid #999",
    width: "200px",
    padding: "4px",
    borderRadius: "5px",
    fontSize: "12px",
    fontFamily: "Verdana, Arial, Helvetica, sans-serif",
  };

  return (
    <div className="my-2 container-lg">
      <div className="flex justify-center">
        <div className="px-2 pt-2 pb-2 bg-white rounded-lg shadow-md">
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
                      fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                      margin: "0px 0px 5px 5px",
                    }}
                    className="font-bold text-left text-[#95e17d]"
                  >
                    Ministry of Education
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
                    fontFamily: "Verdana, Arial, Helvetica, sans-serif",
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
                  textAlign: "right",
                }}
              >
                <a
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "11px",
                    fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                    paddingRight: "5px",
                  }}
                  href="http://www.educationboard.gov.bd"
                >
                  Official Website of Education Board
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <div
              className="flex items-center"
              style={{ border: "1px solid black", width: "74%" }}
            >
              <div className="flex flex-col items-center justify-between px-16 py-8">
                <form onSubmit={handleSubmit}>
                  {/* Examination Field */}
                  <div className="flex items-center w-full">
                    <p
                      className="font-bold"
                      style={{
                        fontSize: "12px",
                        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                        flex: "1",
                        textAlign: "left",
                      }}
                    >
                      Examination
                    </p>
                    <p
                      className="mx-2 font-bold"
                      style={{
                        fontSize: "12px",
                        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                      }}
                    >
                      :
                    </p>
                    <div style={{ flex: "2" }}>
                      <select
                        style={inputStyle}
                        name="exam"
                        value={formValues.exam}
                        onChange={handleInputChange}
                      >
                        <option value="ssc">SSC/Dakhil/Equivalent</option>
                        <option value="jsc">JSC/JDC</option>
                        <option value="ssc">SSC/Dakhil</option>
                        <option value="ssc_voc">SSC(Vocational)</option>
                        <option value="hsc">HSC/Alim</option>
                        <option value="hsc_voc">HSC(Vocational)</option>
                        <option value="hsc_hbm">HSC(BM)</option>
                        <option value="hsc_dic">Diploma in Commerce</option>
                        <option value="hsc">Diploma in Business Studies</option>
                      </select>
                    </div>
                  </div>

                  {/* Year Field */}
                  <div className="flex items-center w-full my-2">
                    <p
                      className="font-bold"
                      style={{
                        fontSize: "12px",
                        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                        flex: "1",
                        textAlign: "left",
                      }}
                    >
                      Year
                    </p>
                    <p
                      className="mx-2 font-bold"
                      style={{
                        fontSize: "12px",
                        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                      }}
                    >
                      :
                    </p>
                    <div style={{ flex: "2" }}>
                      <select
                        style={inputStyle}
                        name="year"
                        value={formValues.year}
                        onChange={handleInputChange}
                      >
                        <option value="0000">Select One</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                        <option value="2011">2011</option>
                        <option value="2010">2010</option>
                        <option value="2009">2009</option>
                        <option value="2008">2008</option>
                        <option value="2007">2007</option>
                        <option value="2006">2006</option>
                        <option value="2005">2005</option>
                        <option value="2004">2004</option>
                        <option value="2003">2003</option>
                        <option value="2002">2002</option>
                        <option value="2001">2001</option>
                        <option value="2000">2000</option>
                        <option value="1999">1999</option>
                        <option value="1998">1998</option>
                        <option value="1997">1997</option>
                        <option value="1996">1996</option>
                      </select>
                    </div>
                  </div>

                  {/* Board Field */}
                  <div className="flex items-center w-full">
                    <p
                      className="font-bold"
                      style={{
                        fontSize: "12px",
                        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                        flex: "1",
                        textAlign: "left",
                      }}
                    >
                      Board
                    </p>
                    <p
                      className="mx-2 font-bold"
                      style={{
                        fontSize: "12px",
                        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                      }}
                    >
                      :
                    </p>
                    <div style={{ flex: "2" }}>
                      <select
                        style={inputStyle}
                        name="board"
                        value={formValues.board}
                        onChange={handleInputChange}
                      >
                        <option value="">Select One</option>
                        <option value="barisal">Barisal</option>
                        <option value="chittagong">Chittagong</option>
                        <option value="comilla">Comilla</option>
                        <option value="dhaka">Dhaka</option>
                        <option value="dinajpur">Dinajpur</option>
                        <option value="jessore">Jessore</option>
                        <option value="mymensingh">Mymensingh</option>
                        <option value="rajshahi">Rajshahi</option>
                        <option value="sylhet">Sylhet</option>
                        <option value="madrasah">Madrasah</option>
                        <option value="tec">Technical</option>
                        <option value="dibs">DIBS(Dhaka)</option>
                      </select>
                    </div>
                  </div>

                  {/* Roll Field */}
                  <div className="flex items-center w-full my-2">
                    <p
                      className="font-bold"
                      style={{
                        fontSize: "12px",
                        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                        flex: "1",
                        textAlign: "left",
                      }}
                    >
                      Roll
                    </p>
                    <p
                      className="mx-2 font-bold"
                      style={{
                        fontSize: "12px",
                        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                      }}
                    >
                      :
                    </p>
                    <div style={{ flex: "2" }}>
                      <input
                        style={inputStyle}
                        type="text"
                        id="roll"
                        name="roll"
                        value={formValues.roll}
                        onChange={handleInputChange}
                        maxLength="6"
                        onKeyPress={onlyNumbers}
                      />
                    </div>
                  </div>

                  {/* Reg No Field */}
                  <div className="flex items-center w-full my-2">
                    <p
                      className="font-bold"
                      style={{
                        fontSize: "12px",
                        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                        flex: "1",
                        textAlign: "left",
                      }}
                    >
                      Reg No
                    </p>
                    <p
                      className="mx-2 font-bold"
                      style={{
                        fontSize: "12px",
                        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                      }}
                    >
                      :
                    </p>
                    <div style={{ flex: "2" }}>
                      <input
                        style={inputStyle}
                        type="text"
                        id="reg"
                        name="reg"
                        value={formValues.reg}
                        onChange={handleInputChange}
                        maxLength="10"
                        onKeyPress={onlyNumbers}
                        width="200px"
                      />
                    </div>
                  </div>

                  {/* Captcha Field */}
                  <div className="flex items-center w-full">
                    <p
                      className="font-bold"
                      style={{
                        fontSize: "12px",
                        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                        flex: "1",
                        textAlign: "left",
                      }}
                    >
                      {num1} + {num2}
                    </p>
                    <p
                      className="mx-2 font-bold"
                      style={{
                        fontSize: "12px",
                        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
                      }}
                    >
                      =
                    </p>
                    <div style={{ flex: "2" }}>
                      <input
                        style={inputStyle}
                        type="text"
                        id="captcha"
                        name="captcha"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        maxLength="2"
                        onKeyPress={onlyNumbers}
                        width="200px"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end my-2">
                    <button
                      className=""
                      style={{
                        backgroundColor: "#f4f0f2",
                        fontSize: "14px",
                        marginRight: "5px",
                        padding: "2px 5px",
                        border: "1px solid #999",
                        borderRadius: "2px",
                      }}
                      type="button"
                      onClick={handleReset}
                    >
                      Reset
                    </button>

                    {/* Submit Button */}
                    <button
                      className=""
                      style={{
                        backgroundColor: "#f4f0f2",
                        fontSize: "14px",
                        padding: "2px 5px",
                        border: "1px solid #999",
                        borderRadius: "2px",
                      }}
                      type="submit"
                    >
                      Submit
                    </button>

                    {/* Reset Button */}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div
            className="px-4 py-5 mt-10 bg-[#EEEEEE]"
            style={{
              borderBottomRightRadius: "8px",
              borderBottomLeftRadius: "8px",
              borderTop: "5px solid #86c775",
            }}
          >
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              <div style={{ fontSize: "10px" }} className="text-gray-800 ">
                &copy; 2005-2024 Ministry of Education, All rights reserved.
              </div>
              <div className="flex items-center">
                <p style={{ fontSize: "10px" }} className="mr-2 text-gray-800">
                  Powered by
                </p>
                <Image
                  className="bg-white"
                  style={{ border: "1px solid #999", borderRadius: "4px" }}
                  src={telitok}
                  width={83}
                  height={44}
                  alt="Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homeinput;
