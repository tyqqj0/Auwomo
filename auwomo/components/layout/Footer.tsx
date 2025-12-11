import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            {/* <div className="w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm rounded-sm">
                A
            </div> */}
            <span className="font-bold text-lg">Auwomo</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-sm">
            Building the Generative Data Loop for Next-Gen Autonomous Intelligence.
            Bridging simulation and reality with World Models.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-sm">Navigation</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link href="/team" className="hover:text-primary">Team</Link></li>
            <li><Link href="/research" className="hover:text-primary">Research</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-sm">Contact</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Westlake University</li>
            <li>Hangzhou, China</li>
            <li>contact@auwomo.ai</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Auwomo / Westlake Intelligence. All rights reserved.
      </div>
    </footer>
  );
}

