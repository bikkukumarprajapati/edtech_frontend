import React, { useState } from 'react';
import logo from "../../public/logo.webp";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BACKEND_URL } from '../../utils/utils.js';
const AdminSignup = () => {
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
     const response = await axios.post(`${BACKEND_URL}/admin/signup`,{
        firstName,
        lastName,
        email,
        password,
      },{
        withCredentials:true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log("AdminSignup successful: ", response.data)
      toast.success(response.data.message);
      navigate("/admin/login");
    } catch (error) {
      if (error.response) {
        // alert(error.response.data.errors);
        setErrorMessage(error.response.data.errors || "AdminSignup failed!!!");
      }
    }

    // try {
    // const response = await axios.post("http://localhost:4001/api/v1/user/AdminSignup",{
    //     fistName,
    //     lastName,
    //     email,
    //     password,
    //   },{
    //     withCredentials:true,
    //     headers:{
    //       "Content-Type":"'application/json",
    //     },
    //   })
    //   console.log("AdminSignup successful: " , response.data)
    //   alert(response.data.message)
    // } catch (error) {
    //   if(error.response){
    //     setErrorMessage(error.response.data.errors || "AdminSignup failed!!!")
    //     alert(error.response.data.errors)
    //   }
    // }
  };
  return (
    <div className="bg-gradient-to-r from-black to-blue-950">
      <div className=" text-white mx-20 ">
        {/* Header */}
        <header className="flex items-center justify-between ">
          <div className="flex items-center space-x-2 pt-4">
            <img
              src={logo}
              alt="logo"
              className="w-7 h-7 md:w-10 md:h-10 rounded-full"
            />
            <h1 className="md:text-2xl text-orange-500 font-bold">
              CourseHaven
            </h1>
          </div>
          <div className="space-x-4">
            <Link
              to={"/admin/login"}
              className="bg-transparent text-white py-2 px-4 border border-white rounded  "
            >
              Login
            </Link>
            <Link
              to={"/courses"}
              className="bg-orange-500 text-white py-2 px-4 border border-white rounded "
            >
              Join now
            </Link>
          </div>
        </header>

        {/* AdminSignup */}
        <div className='flex justify-center items-center'>
        <div className='bg-gray-900  p-8 rounded-lg w-[500px] mt-20'>
          <h2 className='text-2xl font-bold mb-4 text-center'>
            Welcome to <span className='text-orange-500'> CourseHaven</span>
          </h2>
         <p className='text-center text-gray-400 mb-6'>
          Just signup to mess with dashboard!
         </p>

         <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstname" className='text-gray-400 mb-2'>
              Firstname
            </label>
            <input 
            type="text"
            id='fistname'
            value={firstName}
            onChange={(e) =>setFirstName(e.target.value)}
            className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-blue-500'
            placeholder='Type your fistname'
             />
          </div>
          <div>
            <label htmlFor="lastname" className='text-gray-400 mb-2'>
              Lastname
            </label>
            <input 
            type="text"
            id='lastname'
            value={lastName}
            onChange={(e) =>setLastName(e.target.value)}
            className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-blue-500'
            placeholder='Type your lastname'
             />
          </div>
          <div className='mb-4'>
            <label htmlFor="email" className='text-gray-400 mb-2'>
              Email
            </label>
            <input 
            type="email"
            id='email'
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-blue-500'
            placeholder='name@gmail.com'
            required
             />
          </div>
          <div  className='mb-4'>
            <label htmlFor="password" className='text-gray-400 mb-2'>
              Password
            </label>
            <div className='relative'> 
            <input 
            type="password"
            id='password'
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
            className='w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-blue-500'
            placeholder='**********'
            required
             />
             <span className='absolute right-3 text-gray-500 cursor-pointer'></span>
            </div>
          </div>
          {errorMessage && (
            <div className='mb-4 text-red-500 text-center'>
              {errorMessage}
            </div>
          )}
          <button
          type='submit'
          className='w-full bg-orange-500 hover:bg-blue-600 text-white px-6 p-2 rounded-md transition cursor-pointer'
          >
            Signup
          </button>
         </form>
        </div>
         </div>
      </div>
    </div>
  );
}

export default AdminSignup;

//4:30 hours