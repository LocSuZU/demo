
import SignIn from "@/components/auth/SignIn";
import { getUserAuth } from "@/lib/auth/utils";
import Link from 'next/link'
export default async function Home() {
  const { session } = await getUserAuth();

  return (
    <main className="space-y-4 pt-2">
      <div>
        <Link href="/posts"> Posts </Link>
      </div>
      <div>
        <Link href="/feeds"> Feeds </Link>
      </div>
      <div>
        <Link href="/users"> Users </Link>
      </div>
      <div>
        <Link href="https://github.com/LocSuZU/demo"> GithHub </Link>
      </div>
      <div>
        <Link href="https://demo-98.vercel.app/"> Vercel App </Link>
      </div>
      <SignIn />
    </main>
  );
}
