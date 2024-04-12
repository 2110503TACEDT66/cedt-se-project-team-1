import Link from "next/link";
import Card from "./Card";
import { MassageItem } from "../../interface";

export default async function MassageCatalog({ massages }: { massages: MassageItem[]} ) {

    return (
        <>
            <div className="flex flex-col content-around flex-wrap gap-20 justify-center mt-8">
                {
                    massages.map((massage: MassageItem) => (
                        <Link href={`/massage/${massage.id}`} key={massage.id} className="w-1/5">
                            <Card key={massage.id} massageName={massage.name} imgSrc={massage.picture == "no-photo" ? "/img/massage-default.jpg" : massage.picture} massageId={massage.id} masssageDescription={massage.description} massageDistricts={massage.district} massageRating={massage.rating}/>
                        </Link>
                    ))
                }
            </div>
        </>
    )

}