import './globals.css'
import type { Metadata } from 'next'
import TopMenu from '@/components/TopMenu'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import NextAuthProvider from '@/providers/NextAuthProvider'
import ReduxProvider from '@/redux/ReduxProvider'

export const metadata: Metadata = {
  title: 'Massage with Girl',
  description: 'Massage Reservation',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className='bg-[#fff8e9]'>
        <ReduxProvider>
          <NextAuthProvider session={nextAuthSession} >
            <TopMenu />
            {children}
          </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}