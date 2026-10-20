import FolderNav from "@/components/folder-nav";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main id="top" className="page-atmosphere min-h-dvh pb-44">
      <div className="mx-auto w-full max-w-6xl px-6 pt-14 sm:px-10 sm:pt-16 lg:px-14">
        <div className="flex flex-col gap-12 sm:gap-14">{children}</div>
      </div>
      <FolderNav />
    </main>
  );
}
