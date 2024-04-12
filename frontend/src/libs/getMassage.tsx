export default async function getMassage(id: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/massages/${id}`);
    
    if (!response.ok) {
        throw new Error("Failed to fetch massage")
    }

    return await response.json();
}