import { GetStaticProps } from "next";
import { useRouter } from "next/navigation";
import { getProviders, signIn, useSession } from "next-auth/react";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

interface SignInProps {
  providers: { [key: string]: Provider };
}


export async function GetStaticProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

const SignIn: React.FC<SignInProps> = ({ providers }) => {
  const router = useRouter();

  const { session } = useSession();

  if (session) {
    router.push("/");
    return null;
  }

  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export default SignIn;