import { getImageProps } from "next/image";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { getBackgroundImage } from "@/lib/utils";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { SessionProvider } from "@/providers/session-provider";
import type { NodewaveServiceAuthzResponseBody } from "@/services/nodewave-service.types";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await verifySession()) as NodewaveServiceAuthzResponseBody;
  if (!session || session.user.role !== "USER") {
    redirect("/login");
  }

  const backgroundShapeImageProps = getImageProps({
    alt: "",
    width: 500,
    height: 128,
    src: "/images/background-shape.png",
  });
  const backgroundShapeImageSrc = getBackgroundImage(
    backgroundShapeImageProps.props.srcSet,
  );
  return (
    <div
      style={{ backgroundImage: backgroundShapeImageSrc }}
      className='tw:w-full tw:h-dvh tw:bg-neutral-200 tw:bg-no-repeat tw:bg-size-[100%_50%]'
    >
      <SessionProvider value={session}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </SessionProvider>
    </div>
  );
}
