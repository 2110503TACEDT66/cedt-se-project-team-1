export { default } from 'next-auth/middleware';

export const config = {
    matcher: ["/myreservation",
        "/massage",
        "/mypoint",
    ]
}