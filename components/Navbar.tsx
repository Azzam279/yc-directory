'use client'

import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"

interface Provider {
  id: string;
  name: string;
}

interface User {
  name: string
  email: string
  image: string
}

interface Session {
  id: string
  user: User
  expires: string
}

const Navbar = () => {
  const { data: session } = useSession() as { data: Session | null }
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }

    setUpProviders()
  }, [])

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
              </Link>

              <button type='button' onClick={() => signOut()} className='outline_btn'>
                Logout
              </button>

              <Link href={`/user/${session?.id ?? ''}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Login
                </button>
              ))}
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
