export const BACKEND_URL = typeof window === 'undefined' ? process.env.MONGODB_BACKEND_URI : process.env.NEXT_PUBLIC_SERVER_URI

export const FRONTEND_URL = process.env.NEXT_PUBLIC_SERVER_URI
