import { SignupInput } from "@abhilash_26/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";



export const Auth = ({type}:{type:"signup"| "signin"}) => {
  const navigate =useNavigate();
  const [postInputs,setPostInputs] =useState<SignupInput>({
      name:"",
      email:"",
      password:""
  })

  async function sendRequest(){
      try {
          const response =await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs)
          const {jwt}=response.data;
          localStorage.setItem("token",jwt);
          navigate("/blogs")
      } catch (e) {
          alert("Error while signing up")
      }

  }
  

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {type === "signup" ? "Create an Account" : "Sign In"}
          </h1>
          <p className="text-gray-600">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
             <Link
    className="pl-2 text-blue-600 font-medium hover:font-bold hover:underline hover:scale-105 transition-transform duration-300 ease-in-out"
    to={type === "signin" ? "/" : "/signin"}
  >
    {type === "signin" ? "Sign Up" : "Sign In"}
  </Link>
          </p>
        </div>
        <div className="mt-6">
          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="Abhilash Nayak..."
              onChange={(e) =>
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                })
              }
            />
          )}
          <LabelledInput
            label="Email"
            placeholder="abhilash@gmail.com"
            onChange={(e) =>
              setPostInputs({
                ...postInputs,
                email: e.target.value,
              })
            }
          />
          <LabelledInput
            label="Password"
            type="password"
            placeholder="••••••••"
            onChange={(e) =>
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              })
            }
          />
          <button
            onClick={sendRequest}
           className="mt-6 w-full py-2.5 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
          >
            {type === "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
    label,
    placeholder,
    onChange,
    type,
  }: LabelledInputType) {
    return (
      <div className="mb-4">
        {/* Label */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
  
        {/* Input Container */}
        <div className="relative group">
          {/* Input */}
          <input
            type={type || "text"}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white group-hover:shadow-lg focus:shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500 transition-all duration-300 ease-in-out"
          />
  
          {/* Box "Pop-Out" Style */}
          <style>
            {`
            .group:hover input,
            .group:focus-within input {
              transform: translateY(-2px); /* Slight lift effect */
            }
            `}
          </style>
        </div>
      </div>
    );
  }
  