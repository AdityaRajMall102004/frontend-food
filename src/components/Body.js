import ResturantCard from "./ResturantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = ()=>{
    const [listOfResturants, setListOfResturant] = useState([]);
    const [filteredResturant, setFilteredResturant] = useState([]);
    const [searchText, setSearchText] = useState("");
    useEffect(()=>{
        fetchData();
    },[]);


    const fetchData = async () => {
  try {
    // 🔹 Call your backend proxy instead of Swiggy directly
    const res = await fetch("http://localhost:3000/api/restaurants");
    const json = await res.json();
    console.log(json);

    // 🔹 Extract restaurants safely using optional chaining
    const restaurants =
      json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    setListOfResturant(restaurants || []);
    setFilteredResturant(restaurants || []);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
};

    const onlineStatus = useOnlineStatus();
    if(onlineStatus==false){
        return <h1>Looks like you're not offline!! Please check your internet connection.</h1>
    }
    return listOfResturants.length ===0? <Shimmer/>: (
        
        <div className="body">
            <div className="filter p-3 py-4 flex flex-col justify-center items-center md:flex-row">
                <div className="search m-0 md:m-4 p-0 md:p-4">
                    <input type="text"  placeholder="Search resturants..." className="hover search-input border px-2 py-2 w-56 md:w-80 rounded-md text-sm placeholder:text-gray-700" value={searchText} onChange={(e)=>{setSearchText(e.target.value);}}/>
                    <button className = "px-4 py-2 bg-green-100 m-4 rounded-lg" onClick={()=>{
                        // console.log(searchText);
                        const temp = listOfResturants;
                        const filteredResturants =  temp.filter((res) =>
                        res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                        setFilteredResturant(filteredResturants);
                    }}>Search</button>

                </div>
                <div className="search m-0 md:m-4  p-0 md:p-4 flex items-center">
                <button className = "px-4 py-2 m-0 md:m-4 rounded-lg bg-green-100" onClick={()=>{
                     const filteredList = listOfResturants.filter((res)=> res.info.avgRating>4);
                     setFilteredResturant(filteredList);
                }
                }>Top Rated Resturants</button>
                </div>
            </div>
            
            <div className="flex flex-wrap justify-center items-center">
                {
                    filteredResturant.map(restaurant => (
                    <Link key = {restaurant.info.id} to = {"/restaurant/"+restaurant.info.id}>
                         <ResturantCard  resData = {restaurant}/>  
                    </Link>
                    ))
                }
                
            </div>
        </div>
  
    );
  };

  export default Body;