import SiteFooter from "../../components/next/SiteFooter";
import SiteHeader from "../../components/next/SiteHeader";

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
    </>
  );
}
