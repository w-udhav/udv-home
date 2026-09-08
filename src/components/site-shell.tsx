import FolderNav from "@/components/folder-nav";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main id="top" className="page-atmosphere min-h-dvh pb-44">
      <div className="mx-auto w-full max-w-screen-2xl px-6 pt-14 sm:px-10 sm:pt-16 lg:px-14">
        <div className="flex max-w-3xl flex-col gap-10 sm:gap-12">
          {children}
        </div>
      </div>
      <FolderNav />
    </main>
  );
}
