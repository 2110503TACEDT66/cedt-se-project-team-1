import NextAuth from 'next-auth'
import { Role } from '../interface'

declare module "next-auth" {
    interface Session {
        user: {
            data: {
                _id: string,
                name: string,
                email: string,
                role: Role,
                token: string
            }
            token: string
        }
    }
}