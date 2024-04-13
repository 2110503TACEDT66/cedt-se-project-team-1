import { RegisterJson, Role } from "../../interface";

export default async function userRegister(userRegisterData: RegisterJson, role: Role) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userRegisterData.name, 
            telephone: userRegisterData.telephone,
            email: userRegisterData.email,
            password: userRegisterData.password,
            role: role.toString()
         })
    });

    if (!response.ok) {
        throw new Error("Failed to register")
    }

    // return success:boolean and token
    return await response.json();
}