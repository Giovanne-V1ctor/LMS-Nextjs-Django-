import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";


export default function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
      return <div className="min-h-screen flex">
        {/* LEFT */}
        <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] min-w-[50px] bg-[#F7F8FA] p-4">
          <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block">LMS Django Nextjs</span>
          </Link>
            
              <Menu/>
            
        </div>
        {/* RIGHT */}
        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] min-w-[300px] bg-[#F7F8FA] flex flex-col">
          <Navbar/>
          {children}
        </div>
      </div>
  }