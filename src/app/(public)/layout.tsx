import SiteFooter from "../../components/next/SiteFooter";
import SiteHeader from "../../components/next/SiteHeader";
import SocialMediaToggle from "../../components/next/SocialMediaToggle";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <SocialMediaToggle />
    </>
  );
}
