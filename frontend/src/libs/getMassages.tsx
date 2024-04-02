export default async function getMassages() {
    // Optional loading delay simulation (uncomment if needed)
    // await new Promise((resolve) => setTimeout(resolve, 1000));
  
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/v1/massages`);
  
      if (!response.ok) {
        throw new Error("Failed to fetch massages");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching massages:", error);
      // Handle the error gracefully (e.g., display an error message to the user)
      return null; // Or throw a specific error for further handling
    }
}
  