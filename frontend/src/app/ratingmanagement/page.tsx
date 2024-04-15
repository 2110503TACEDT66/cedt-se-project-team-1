'use client'
import { useState, useEffect } from "react";
import deleteRating from '@/libs/deleteRating'
import getRatings from "@/libs/getRatings";
import { Rating } from "@mui/material";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UpdateRatingModal from "@/components/modal/updateRatingModal";

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
  const [selectedRatingId, setSelectedRatingId] = useState(""); // State to manage the selected rating ID
  const [updateModalOpen,setUpdateModalOpen] = useState(false);
  const [initialRatingData, setInitialRatingData] = useState<Rating | null>(null);

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

  const handleUpdateRating = async (id: string) => {
    setSelectedRatingId(id)
    setUpdateModalOpen(true)

    const ratingToUpdate = ratings.find(rating => rating._id === id);
    if (ratingToUpdate) {
      setInitialRatingData(ratingToUpdate);
    }
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"lowToHigh" | "highToLow" | "Newest" | "Oldest" >("highToLow");

  const filteredRating = ratings.filter((ratings) =>
      ratings._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRating = [...filteredRating].sort((a, b) => {
    if (sortOrder === "lowToHigh") {
        return a.overallRating - b.overallRating;
    } else if (sortOrder === "highToLow") {
        return b.overallRating - a.overallRating;
    } else if (sortOrder === "Newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  return (
    <main className="p-5 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold">Rating Management</h1>
      <div className="relative mt-5 flex">
        <div>
          <input 
        type="text" 
        className="w-[600px] h-12 border-[1px] rounded-lg pl-5" 
        placeholder="Search rating by id..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute top-4 right-48 text-gray-400 pointer-events-none" size={20}/>
        </div>
        <select
          title="Sort Order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "lowToHigh" | "highToLow" | "Newest" | "Oldest")}
          className="border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="lowToHigh">Rating Low to High</option>
          <option value="highToLow">Rating High to Low</option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
        </select>       
        
      </div>
      <div>
        
      </div>
      <section className="grid grid-cols-3 gap-5 w-8/12 mt-5">
        {sortedRating.map((rating) => (
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
                  <button title="update" onClick={() => handleUpdateRating(rating._id)}><FaEdit size={20} color="#B1B1B1"/></button>
                  <button title="delete" onClick={() => handleDeleteRating(rating._id)}><MdDelete size={22} color="#B1B1B1"/></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      {updateModalOpen && selectedRatingId && 
        <UpdateRatingModal 
          id={selectedRatingId} 
          onClose={() => setUpdateModalOpen(false)} 
          open={updateModalOpen}
          initialRatingData={initialRatingData}
          />
      }    
    </main>
  );
}

export default RatingManagement;
