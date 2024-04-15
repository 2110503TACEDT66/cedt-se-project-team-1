'use client'
import { useState, useEffect } from "react";
import deleteRating from '@/libs/deleteRating'
import getRatings from "@/libs/getRatings";
import { Rating } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface Rating {
  _id: string;
  serviceRating: number;
  transportRating: number;
  priceRating: number;
  hygieneRating: number;
  overallRating: number;
  comment: string;
  user: string; // Assuming user is represented by ID
  massageShop: string; // Assuming massageShop is represented by ID
  createdAt: Date;
}

function RatingManagement() {
  // Specify the type of the state variable using the Rating interface
  const [ratings, setRatings] = useState<Rating[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRatings = await getRatings();
        setRatings(allRatings.data);
      } catch (error) {
        console.log('Error fetching ratings ' + error);
      }
    }

    fetchData();
  }, [])

  const handleDeleteRating = async (id: string) => {
    try {
      // await deleteRating(id)
      setRatings(prevRatings => prevRatings.filter(rating => rating._id !== id))
    } catch (error) {
      console.log('Error deleteing rating: ', error);
    }
  }

  return (
    <main className="p-2 flex flex-col justify-center items-center p-5">
      <h1 className="text-2xl font-semibold">Rating Management</h1>
      <section className="grid grid-cols-3 gap-5 w-8/12">
        {ratings.map((rating) => (
          <div key={rating._id} className="bg-white border-[1px] border-[#B1B1B1] rounded-lg h-full overflow-hidden">
            <div className="bg-[#B1B1B1] flex flex-col justify-center w-full h-[30px]">
                <h3 className="font-light text-sm text-white text-center">Id : {rating._id}</h3>
            </div>
            <div className="flex flex-col px-4 pt-2 flex-grow">
              <div className="flex flex-col flex-grow">
                <p className="text-xl font-medium">Overall: {rating.overallRating}/5</p>
                <Rating name="half-rating-read" sx={{ fontSize: 20 }} precision={0.25} value={rating.overallRating} readOnly />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col items-left">
                  <p>Service: <span className="text-[#838383] font-light">{rating.serviceRating}/5</span></p>
                  <p>Price: <span className="text-[#838383] font-light">{rating.priceRating}/5</span></p>
                  <p>Transportation: <span className="text-[#838383] font-light">{rating.transportRating}</span></p>
                  <p>Hygiene: <span className="text-[#838383] font-light">{rating.hygieneRating}</span></p>
                  <p>Comment: <span className="text-[#838383] font-light">{rating.comment}</span></p>
                  <p>Date: <span className="text-[#838383] font-light">{new Date(rating.createdAt).toLocaleDateString('en-US')}</span></p>
                  {/* User กับ Massage Store ไม่ได้เอามาแสดงเพราะเป็น id ไม่ได้เป็นชื่อจริงๆ */}
                </div>
                
                <div className="flex flex-row gap-x-2 items-center justify-center py-2">
                  <FaEdit size={20} color="#B1B1B1"/>
                  <MdDelete size={22} color="#B1B1B1" onClick={() => handleDeleteRating(rating._id)}/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default RatingManagement;
