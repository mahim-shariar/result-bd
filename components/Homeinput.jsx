"use client";
import React, { useState, useEffect } from "react";
import bdlogo from "../public/images/bdlogo.png";
import banner_flag from "../public/images/banner_flag.jpg";
import telitok from "../public/images/pngegg.png";
import Image from "next/image";
import "./style.css";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Homeinput = () => {
  const [num1, setNum1] = useState(1); // Initial value set to 0 to avoid server-client mismatch
  const [num2, setNum2] = useState(1); // Initial value set to 0
  const [captchaInput, setCaptchaInput] = useState(""); // Captcha input state
  const [formValues, setFormValues] = useState({
    exam: "hsc",
    year: "2024",
    board: "",
    roll: "",
    reg: "",
  });
  const [resultData, setResultData] = useState(null);

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

  console.log(formValues);

  const handleSubmit = async (e) => {
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

    let captchaSum = num1 + num2;

    if (parseInt(captchaInput) !== captchaSum) {
      alert(""); // Alert on wrong captcha
      window.location.reload(); // Reload page if captcha is wrong
    }

    try {
      const response = await axios.get(
        "https://result-bd-server-snowy.vercel.app/check",
        {
          params: {
            roll: formValues.roll,
            reg: formValues.reg,
            board: formValues.board,
            exam: formValues.exam,
            year: formValues.year,
          },
        }
      );

      console.log("Data fetched:", response.data);
      if (response.status === 200) {
        // Handle success: update formValues with fetched data
        setResultData(response.data);
      } else {
        console.error("Error fetching data:", response.statusText);
        window.location.reload();
      }
      // Handle the response data here
    } catch (error) {
      console.error("Error fetching data:", error);
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
    window.location.reload();
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

  const tableStyle = {
    borderCollapse: "collapse",
    width: "550px",
    margin: "0 auto",
    backgroundColor: "#FFFFFF",
    border: "1px solid white",
  };

  const cellStyle = {
    border: "1px solid white",
    padding: "2px",
    fontSize: "12px",
  };

  const handlePrint = (event) => {
    event.preventDefault();
    const printContents = document.getElementById("resultTable").innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
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
                    /* Remove the &:hover code block */
                    cursor: "pointer",
                    /* Add the &:hover code block */
                  }}
                  className="btn-hover"
                  href="/"
                >
                  Result Archive
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
                        <option value="hsc">HSC/Alim/Equivalent</option>
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
                        <option value="2024">2024</option>
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
                        <option value="Dhaka">Dhaka</option>
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
                        backgroundColor: "#ff0000 ",
                        fontSize: "11px",
                        height: "38px",
                        padding: "0 25px",
                        marginRight: "5px",
                        border: "1px solid #999",
                        borderRadius: "4px",
                        textTransform: "uppercase",
                        color: "white",
                        cursor: "pointer",
                        border: "1px solid #bbb",
                        lineHeight: "38px",
                        letterSpacing: ".1rem",
                        fontWeight: "600",
                        display: "inline-block",
                        boxSizing: "border-box",
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
                        backgroundColor: "#51ae22",
                        fontSize: "11px",
                        height: "38px",
                        padding: "0 25px",

                        border: "1px solid #999",
                        borderRadius: "4px",
                        textTransform: "uppercase",
                        color: "white",
                        cursor: "pointer",
                        border: "1px solid #bbb",
                        lineHeight: "38px",
                        letterSpacing: ".1rem",
                        fontWeight: "600",
                        display: "inline-block",
                        boxSizing: "border-box",
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

          {resultData && (
            <div className="pt-10">
              <table style={tableStyle}>
                <tbody id="resultTable">
                  <tr>
                    <td valign="top">
                      <table style={{ ...tableStyle, width: "100%" }}>
                        <tbody>
                          <tr className="bg-[#51ae22]">
                            <td
                              height="40"
                              align="center"
                              valign="middle"
                              style={{
                                ...cellStyle,
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "white",
                              }}
                            >
                              HSC/Alim/Equivalent Result 2024
                            </td>
                          </tr>
                          <tr>
                            <td align="center" valign="middle">
                              <table style={{ ...tableStyle, width: "100%" }}>
                                <tbody>
                                  <tr>
                                    <td align="center" valign="middle">
                                      <table
                                        style={{ ...tableStyle, width: "100%" }}
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              Roll No
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              {resultData.roll}
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              Name
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              {resultData.name}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              Board
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              {resultData.board}
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              Father's Name
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              {resultData.fatherName}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              Group
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              {resultData.group}
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              Mother's Name
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              {resultData.motherName}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              Type
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              IRREGULAR
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              Date of Birth
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              {resultData.dob || "N/A"}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              Result
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                              className="font-bold"
                                            >
                                              {resultData.result}
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              Institute
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                              colSpan="3"
                                            >
                                              {resultData.institute}
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                            >
                                              GPA
                                            </td>
                                            <td
                                              style={cellStyle}
                                              bgcolor="#EEEEEE"
                                              colSpan="3"
                                              className="font-bold"
                                            >
                                              {resultData.gpa}.00
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      height="40"
                                      align="center"
                                      valign="middle"
                                    >
                                      <span
                                        style={{
                                          ...cellStyle,
                                          fontSize: "18px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Grade Sheet
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center" valign="middle">
                                      <table
                                        style={{ ...tableStyle, width: "100%" }}
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style={cellStyle}
                                              width="19%"
                                              bgcolor="#AFB7BE"
                                            >
                                              Code
                                            </td>
                                            <td
                                              style={cellStyle}
                                              width="66%"
                                              bgcolor="#AFB7BE"
                                            >
                                              Subject
                                            </td>
                                            <td
                                              style={cellStyle}
                                              width="15%"
                                              bgcolor="#AFB7BE"
                                            >
                                              Grade
                                            </td>
                                          </tr>

                                          {resultData && resultData.grades ? (
                                            Object.entries(
                                              resultData.grades
                                            ).map(
                                              ([subject, gradeData], index) => {
                                                // Create a mapping for specific subject names
                                                const subjectMappings = {
                                                  math: "HIGHER MATHEMATICS",
                                                  ict: "INFORMATION & COMMUNICATION TECHNOLOGY",
                                                };

                                                return (
                                                  <tr key={index}>
                                                    <td
                                                      style={cellStyle}
                                                      bgcolor={
                                                        index % 2 === 0
                                                          ? "#EEEEEE"
                                                          : "#DEE1E4"
                                                      }
                                                    >
                                                      {gradeData?.code || "N/A"}{" "}
                                                      {/* Safely access code */}
                                                    </td>
                                                    <td
                                                      style={cellStyle}
                                                      bgcolor={
                                                        index % 2 === 0
                                                          ? "#EEEEEE"
                                                          : "#DEE1E4"
                                                      }
                                                    >
                                                      {/* Check if the subject is "math" or "ict", otherwise default to uppercase */}
                                                      {subjectMappings[
                                                        subject
                                                      ] ||
                                                        subject.toUpperCase()}
                                                    </td>
                                                    <td
                                                      style={cellStyle}
                                                      bgcolor={
                                                        index % 2 === 0
                                                          ? "#EEEEEE"
                                                          : "#DEE1E4"
                                                      }
                                                    >
                                                      {gradeData?.grade ||
                                                        "N/A"}{" "}
                                                      {/* Safely access grade */}
                                                    </td>
                                                  </tr>
                                                );
                                              }
                                            )
                                          ) : (
                                            <tr>
                                              <td
                                                colSpan="3"
                                                style={cellStyle}
                                                align="center"
                                              >
                                                No grades available
                                              </td>
                                            </tr>
                                          )}
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
                <div className="mt-5">
                  <td align="left" valign="middle" height="40">
                    <a
                      style={{
                        backgroundColor: "#51ae22",
                        fontSize: "11px",
                        height: "38px",
                        padding: "0 25px",

                        border: "1px solid #999",
                        borderRadius: "4px",
                        textTransform: "uppercase",
                        color: "white",
                        cursor: "pointer",
                        border: "1px solid #bbb",
                        lineHeight: "38px",
                        letterSpacing: ".1rem",
                        fontWeight: "600",
                        display: "inline-block",
                        boxSizing: "border-box",
                      }}
                      // href="index.php"
                      className="links"
                      onClick={handlePrint}
                    >
                      print
                    </a>
                  </td>
                </div>
              </table>
            </div>
          )}

          <div
            className="px-4 py-2 mt-5 bg-[#EEEEEE]"
            style={{
              borderBottomRightRadius: "8px",
              borderBottomLeftRadius: "8px",
              borderTop: "5px solid #86c775",
            }}
          >
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              <div style={{ fontSize: "10px" }} className="text-gray-800 ">
                &copy; 2005-2023 Ministry of Education, All rights reserved.
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
