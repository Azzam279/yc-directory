import StartupForm from "@/components/StartupForm"
import { getServerSession } from "next-auth"
import { config } from "@/auth"
import { redirect } from "next/navigation"

const Page = async () => {
  const session = await getServerSession(config)

  if (!session) redirect("/")

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>

      <StartupForm />
    </>
  )
}

export default Page
