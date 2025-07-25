import { getImageProps } from "next/image";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getBackgroundImage } from "@/lib/utils";
import type { NodewaveServiceAuthzResponseBody } from "@/services/nodewave-service.types";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession<NodewaveServiceAuthzResponseBody>();
  if (session && session.user.role === "USER") {
    redirect("/");
  }

  if (session && session.user.role === "ADMIN") {
    redirect("/admin");
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
      className='tw:w-full tw:h-dvh tw:pt-28 tw:px-4 tw:pb-4 tw:bg-neutral-50 tw:bg-no-repeat tw:bg-size-[100%_50%] tw:lg:pt-[170px]'
    >
      <div className='tw:max-w-[560px] tw:mx-auto'>{children}</div>
    </div>
  );
}
