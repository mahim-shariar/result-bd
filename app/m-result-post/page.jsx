"use client";
import axios from "axios";
import React, { useState } from "react";

const page = () => {
  const [formValues, setFormValues] = useState({
    roll: "",
    reg: "",
    name: "",
    board: "",
    fatherName: "",
    motherName: "",
    group: "",
    type: "",
    dob: "",
    result: "",
    institute: "",
    gpa: "",
    exam: "hsc",
    year: "2024",
    grades: {
      bangla: { code: "", grade: "" },
      english: { code: "", grade: "" },
      ict: { code: "", grade: "" },
      physics: { code: "", grade: "" },
      chemistry: { code: "", grade: "" },
      biology: { code: "", grade: "" },
      math: { code: "", grade: "" },
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleGradesChange = (subject, field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      grades: {
        ...prevValues.grades,
        [subject]: {
          ...prevValues.grades[subject],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://result-bd-server-snowy.vercel.app/submit",
        formValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Record submitted successfully:", response.data);
        // Handle success: reset form or display success message
      } else {
        console.error("Failed to submit the record:", response.statusText);
      }
    } catch (err) {
      console.error("Error occurred during submission:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md"
    >
      <h2 className="mb-6 text-2xl font-bold text-center">
        HSC/Alim/Equivalent Result 2023
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Roll No */}
        <div>
          <label className="block text-gray-700">Roll No</label>
          <input
            type="text"
            name="roll"
            value={formValues.roll}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Registration No</label>
          <input
            type="text"
            name="reg"
            value={formValues.reg}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Exam */}
        <div>
          <label className="block text-gray-700">Examination</label>
          <select
            name="exam"
            value={formValues.exam}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="ssc">SSC/Dakhil/Equivalent</option>
            <option value="jsc">JSC/JDC</option>
            <option value="ssc_voc">SSC(Vocational)</option>
            <option value="hsc_alim">HSC/Alim</option>
            <option value="hsc">HSC(Vocational)</option>
            <option value="hsc_hbm">HSC(BM)</option>
            <option value="hsc_dic">Diploma in Commerce</option>
            <option value="hsc_dbs">Diploma in Business Studies</option>
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="block text-gray-700">Year</label>
          <select
            name="year"
            value={formValues.year}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
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
            {/* Add other years as needed */}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Board */}
        <div>
          <label className="block text-gray-700">Board</label>
          <input
            type="text"
            name="board"
            value={formValues.board}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Father's Name */}
        <div>
          <label className="block text-gray-700">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            value={formValues.fatherName}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block text-gray-700">Mother's Name</label>
          <input
            type="text"
            name="motherName"
            value={formValues.motherName}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Group */}
        <div>
          <label className="block text-gray-700">Group</label>
          <input
            type="text"
            name="group"
            value={formValues.group}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-gray-700">Type</label>
          <input
            type="text"
            name="type"
            value={formValues.type}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formValues.dob}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Result */}
        <div>
          <label className="block text-gray-700">Result</label>
          <input
            type="text"
            name="result"
            value={formValues.result}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Institute */}
        <div className="col-span-2">
          <label className="block text-gray-700">Institute</label>
          <input
            type="text"
            name="institute"
            value={formValues.institute}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* GPA */}
        <div className="col-span-2">
          <label className="block text-gray-700">GPA</label>
          <input
            type="text"
            name="gpa"
            value={formValues.gpa}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Grade Sheet */}
      <h3 className="mt-6 mb-4 text-xl font-semibold">Grade Sheet</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Bangla */}
        <div>
          <label className="block text-gray-700">Bangla</label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Code"
              value={formValues.grades.bangla.code}
              onChange={(e) =>
                handleGradesChange("bangla", "code", e.target.value)
              }
              required
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Grade"
              value={formValues.grades.bangla.grade}
              onChange={(e) =>
                handleGradesChange("bangla", "grade", e.target.value)
              }
              required
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* English */}
        <div>
          <label className="block text-gray-700">English</label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Code"
              value={formValues.grades.english.code}
              onChange={(e) =>
                handleGradesChange("english", "code", e.target.value)
              }
              required
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Grade"
              value={formValues.grades.english.grade}
              onChange={(e) =>
                handleGradesChange("english", "grade", e.target.value)
              }
              required
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* ICT */}
        <div>
          <label className="block text-gray-700">ICT</label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Code"
              value={formValues.grades.ict.code}
              onChange={(e) =>
                handleGradesChange("ict", "code", e.target.value)
              }
              required
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Grade"
              value={formValues.grades.ict.grade}
              onChange={(e) =>
                handleGradesChange("ict", "grade", e.target.value)
              }
              required
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Physics */}
        <div>
          <label className="block text-gray-700">Physics</label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Code"
              value={formValues.grades.physics.code}
              onChange={(e) =>
                handleGradesChange("physics", "code", e.target.value)
              }
              required
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Grade"
              value={formValues.grades.physics.grade}
              onChange={(e) =>
                handleGradesChange("physics", "grade", e.target.value)
              }
              required
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Chemistry */}
        <div>
          <label className="block text-gray-700">Chemistry</label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Code"
              value={formValues.grades.chemistry.code}
              onChange={(e) =>
                handleGradesChange("chemistry", "code", e.target.value)
              }
              required
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Grade"
              value={formValues.grades.chemistry.grade}
              onChange={(e) =>
                handleGradesChange("chemistry", "grade", e.target.value)
              }
              required
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Biology */}
        <div>
          <label className="block text-gray-700">Biology</label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Code"
              value={formValues.grades.biology.code}
              onChange={(e) =>
                handleGradesChange("biology", "code", e.target.value)
              }
              required
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Grade"
              value={formValues.grades.biology.grade}
              onChange={(e) =>
                handleGradesChange("biology", "grade", e.target.value)
              }
              required
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Math */}
        <div>
          <label className="block text-gray-700">Math</label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Code"
              value={formValues.grades.math.code}
              onChange={(e) =>
                handleGradesChange("math", "code", e.target.value)
              }
              required
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Grade"
              value={formValues.grades.math.grade}
              onChange={(e) =>
                handleGradesChange("math", "grade", e.target.value)
              }
              required
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 mt-6 font-bold text-white transition duration-300 bg-blue-500 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default page;
