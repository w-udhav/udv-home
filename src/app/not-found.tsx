import Link from "next/link";
import SiteShell from "@/components/site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <h1 className="type-heading">Not found</h1>
      <p className="type-body">That page is not here.</p>
      <Link href="/" className="type-caption hover:text-foreground">
        ← Home
      </Link>
    </SiteShell>
  );
}
