import React, { useEffect ,useState } from "react";
import logo from "../../public/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slick from 'react-slick'
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/utils.js";


const Home = () => {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
   const token = localStorage.getItem("user")
   if(token){
    setIsLoggedIn(true)
   }else{
    setIsLoggedIn(false)
   }
  },[]);
  const handleLogout = async() =>{
   try {
  const response = axios.get(`${BACKEND_URL}/user/logout`,{
      withCredentials:true,
    })
    toast.success((await response).data.message)   
    setIsLoggedIn(false)
      }catch (error) {
     console.log("Error in loggin out", error);
     toast.error(error.response.data.errors || "Error in logging out");
   }
  };
  useEffect(() => {
    const fetchCourses = async()=>{
      try {
        const response = await axios.get(
          `${BACKEND_URL}/course/courses`,
          {
            withCredentials:true,
          }
        );
        console.log(response.data.courses);
        setCourses(response.data.courses)
      } catch (error) {
        console.log("Error in fetchCourses", error)
      }
    }
    fetchCourses();
  }, []);
  
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
              CourseHeaven
            </h1>
          </div>
          <div className="space-x-4">
            { isLoggedIn ? (
               <button onClick={handleLogout}
              to={"/Login"}
              className="bg-transparent text-white py-2 px-4 cursor-pointer border border-white rounded  "
            >
              Logout
            </button>
            ):( <>
                   <Link
              to={"/Login"}
              className="bg-transparent text-white py-2 px-4 border border-white rounded  "
            >
              Login
            </Link>
             <Link
              to={"/Signup"}
              className="bg-transparent text-white py-2 px-4 border border-white rounded "
            >
              Signup
            </Link>
            </>)}
           
           
          </div>
        </header>

        {/* Main section */}
        <section className="text-center pt-5 pb-10 ">
          <h1 className="text-4xl font-semibold text-orange-500">
            CourseHeaven
          </h1>
          <br />
          <p className="text-gray-500 ">
            Sharpen your skills with courses crafted by experts.
          </p>
          <div className="space-x-4 mt-8 ">
            <Link to={"/courses"} className="bg-green-500 py-3 px-6 text-white rounded font-semibold hover:bg-white duration-500 hover:text-black">
              Explore courses
            </Link>
            <Link to={"https://www.youtube.com/"} className="bg-white py-3 px-6 text-black rounded font-semibold hover:bg-green-500 duration-500 hover:text-white">
              Courses Videos
            </Link>
          </div>
        </section>
       <section className="mr-10">
        <Slider{...settings}>
          {
            courses.map((course)=>(
              <div key={course._id} className="p-4" >

                <div className=" relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
                  <div className=" bg-gray-900 rounded-lg overflow-hidden ml-30">
                    <img className="h-32 w-full object-contain" src={course?.image?.url} alt="image"/>
                    <div className="p-6 text-center">
                       <h2 className="taxt-xl pb-6 font-bold text-white">{course.title}</h2>
                       <Link to={"/courses"} className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 duration-300 cursor-pointer" >Enroll Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </Slider>
       </section>

        {/* footer */}
        <hr />
        <footer className="my-2">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-2">
                <img
                  src={logo}
                  alt="logo"
                  className="w-7 h-7 md:w-10 md:h-10 rounded-full"
                />
                <h1 className="md:text-2xl text-orange-500 font-bold">
                  CourseHaven
                </h1>
              </div>

              <div className="mt-3 ml-2 md:ml-8">
                <p className="mb-2">Follow us</p>
                <div className="flex space-x-4">
                  <a href="">
                    <FaFacebook  className="text-2xl hover:text-blue-600 duration-300"/>
                  </a>
                  <a href="">
                    <FaInstagram className="text-2xl hover:text-pink-500 duration-300" />
                  </a>
                  <a href="">
                    <FaTwitter className="text-2xl hover:text-blue-600 duration-300" />
                  </a>
                </div>
              </div>
            </div>
            <div className="items-center flex flex-col">
              <h3 className="text-lg font-semibold mb-4">connects</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">YouTube</li>
                <li className="hover:text-white cursor-pointer duration-300">Telegram</li>
                <li className="hover:text-white cursor-pointer duration-300">Github</li>
              </ul>
            </div>
            <div className="items-center flex flex-col">
              <h3 className="text-lg font-semibold mb-4">copyrights &#169; 2025</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white cursor-pointer duration-300">Term & Conditions</li>
                <li className="hover:text-white cursor-pointer duration-300">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer duration-300">Refund & Cancellation</li>
              </ul>
            </div>
            
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;


//4:51 time

