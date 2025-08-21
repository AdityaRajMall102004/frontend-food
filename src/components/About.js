import { Link } from "react-router-dom";
const linkedinUrl = process.env.REACT_APP_LINKEDIN_URL;
 const thaliImg = process.env.REACT_APP_THALI_IMG;
const About = () =>{
    return (
        <>
          <div className="flex items-center justify-center border h-[630px]">
            <div className="w-[800px]">
            <div>
              <img src={thaliImg} alt="Thali" className="rounded-full h-2/4 w-3/4" />
            </div>
            </div>
            <div>
            <h1 className="font-bold text-4xl text-gray-600 border mr-5 w-[600px] p-5 bg-blue-100 rounded-md">
              "Food is a rich cultural journey. Savor each bite, respect every ingredient, and minimize waste."
              </h1>
  
              <div className="flex ml-60  items-center flex-col w-72 justify-evenly">
                <div className="flex mt-10">
                  <h2 className="font-semibold">Created By :-</h2>
                  <Link to={linkedinUrl} className=" ml-2 font-bold text-blue-900">
                    Aditya Raj Mall
                  </Link>
                </div>
              </div>
            </div>        
          </div>
          
        </>
      );
};

export default About;