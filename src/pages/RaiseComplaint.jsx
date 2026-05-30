import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

export default function RaiseComplaint() {

  const [users, setUsers] =
    useState([]);

  const [formData, setFormData] =
    useState({

      title: "",

      description: "",

      reportedBy: "",

      against: "",

    });

  // ================= FETCH USERS =================
  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/admin/users"
        );

      setUsers(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };


  // ================= HANDLE CHANGE =================
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };


  // ================= SUBMIT =================
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "http://localhost:5000/api/complaints/create",

          formData
        );

        alert(
          "Complaint submitted successfully"
        );

        setFormData({

          title: "",

          description: "",

          reportedBy: "",

          against: "",

        });

      } catch (error) {

        console.log(error);

      }

    };


  return (

    <div className="min-h-screen bg-[#f5f7fb]">

      <Navbar />

      <div className="max-w-[800px] mx-auto py-12 px-6">

        <div className="bg-white rounded-[32px] border border-[#e2e8f0] p-10">

          <h1 className="text-3xl font-bold text-[#1e293b] mb-8">

            Raise Complaint

          </h1>


          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* TITLE */}
            <div>

              <label className="block mb-2 font-semibold text-[#1e293b]">

                Complaint Title

              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter complaint title"
                className="w-full border border-[#e2e8f0] rounded-2xl px-5 py-4 outline-none"
                required
              />

            </div>


            {/* DESCRIPTION */}
            <div>

              <label className="block mb-2 font-semibold text-[#1e293b]">

                Description

              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter complaint description"
                rows="5"
                className="w-full border border-[#e2e8f0] rounded-2xl px-5 py-4 outline-none resize-none"
                required
              />

            </div>


            {/* REPORTED BY */}
            <div>

              <label className="block mb-2 font-semibold text-[#1e293b]">

                Reported By

              </label>

              <select
                name="reportedBy"
                value={formData.reportedBy}
                onChange={handleChange}
                className="w-full border border-[#e2e8f0] rounded-2xl px-5 py-4 outline-none"
                required
              >

                <option value="">
                  Select User
                </option>

                {users.map((user) => (

                  <option
                    key={user._id}
                    value={user._id}
                  >

                    {user.name}

                  </option>

                ))}

              </select>

            </div>


            {/* AGAINST */}
            <div>

              <label className="block mb-2 font-semibold text-[#1e293b]">

                Complaint Against

              </label>

              <select
                name="against"
                value={formData.against}
                onChange={handleChange}
                className="w-full border border-[#e2e8f0] rounded-2xl px-5 py-4 outline-none"
                required
              >

                <option value="">
                  Select User
                </option>

                {users.map((user) => (

                  <option
                    key={user._id}
                    value={user._id}
                  >

                    {user.name}

                  </option>

                ))}

              </select>

            </div>


            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white py-4 rounded-2xl font-semibold text-lg"
            >

              Submit Complaint

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}