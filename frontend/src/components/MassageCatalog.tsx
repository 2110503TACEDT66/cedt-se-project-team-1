import { useState } from "react";
import Link from "next/link";
import Card from "./Card";
import { MassageItem } from "../../interface";

export default function MassageCatalog({ massages }: { massages: MassageItem[] }) {
    const [sortOrder, setSortOrder] = useState<"lowToHigh" | "highToLow" | "AtoZ" | "ZtoA" >("lowToHigh");
    const [searchTerm, setSearchTerm] = useState("");

    // Filter and sort the massages based on the search term and sort order
    const filteredMassages = massages.filter((massage) =>
        massage.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedMassages = [...filteredMassages].sort((a, b) => {
        if (sortOrder === "lowToHigh") {
            return a.overallRating - b.overallRating;
        } else if (sortOrder === "highToLow") {
            return b.overallRating - a.overallRating;
        } else if (sortOrder === "AtoZ") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    return (
        <>                
            <div className="flex flex-row justify-center gap-4 my-10">                
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                />
                <select
                    title="Sort Order"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "lowToHigh" | "highToLow" | "AtoZ" | "ZtoA")}
                    className="border border-gray-300 rounded-md px-2 py-1"
                >
                    <option value="lowToHigh">Rating Low to High</option>
                    <option value="highToLow">Rating High to Low</option>
                    <option value="AtoZ">Name A to Z</option>
                    <option value="ZtoA">Name: Z to A</option>
                </select>

            </div>
            <div className="flex flex-row content-around flex-wrap gap-20 justify-center mt-8">

                {sortedMassages.map((massage: MassageItem) => (
                    <Link href={`/massage/${massage.id}`} key={massage.id} className="w-1/5">
                        <Card
                            key={massage.id}
                            massageName={massage.name}
                            imgSrc={massage.picture === "no-photo" ? "/img/massage-default.jpg" : massage.picture}
                            massageId={massage.id}
                            masssageDescription={massage.description}
                            massageDistricts={massage.district}
                            massageRating={massage.overallRating}
                        />
                    </Link>
                ))}
            </div>
        </>
    );
}