export default function updateUserPoint(point: number, token: string) {
    fetch(`${process.env.BACKEND_URL}/api/auth/me`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ point })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update user point")
            }
        })
        .catch(error => {
            throw new Error(error.message)
        })
}
