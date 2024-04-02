import ReservationList from "@/components/ReservationList";
import ReservationForm from "@/components/ReservationForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function MyBook() {

    const session = await getServerSession(authOptions)

    return (
        <div className="p-2 flex flex-row justify-between items-center px-24 ">
            <ReservationList />
            {
                session?.user.data.role !== "admin" ?
                <ReservationForm isUpdate={false} id={null} />
                : null
            }
        </div>
    )
}