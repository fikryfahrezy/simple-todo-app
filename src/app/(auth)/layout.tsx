import { getImageProps } from "next/image";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { getBackgroundImage } from "@/lib/utils";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();
  if (session?.isValid && session.value.user.role === "USER") {
    redirect("/");
  }

  if (session?.isValid && session.value.user.role === "ADMIN") {
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
