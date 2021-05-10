import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuthCheck = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
) => {
  const ComponentWithAuth = (props: T) => {
    const [session, loading] = useSession();
    const router = useRouter();
    useEffect(() => {
      if (!loading && !session?.user.id) {
        router.push("/api/auth/signin");
      }
    }, [loading]);

    if (!session) return null;
    return <WrappedComponent {...props} />;
  };
  ComponentWithAuth.hasAuth = true;
  ComponentWithAuth.layout = null;
  return ComponentWithAuth;
};
export default withAuthCheck;
