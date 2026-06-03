import { Link } from "@remix-run/react";
import { RabbyKitConnectButton } from "@rabby-wallet/rabbykit";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 border-b bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-12">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tighter text-primary"
        >
          DESTAT
        </Link>
        <div className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link
            to="/dashboard"
            className="transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link to="/survey" className="transition-colors hover:text-primary">
            Survey
          </Link>
          <Link to="/archive" className="transition-colors hover:text-primary">
            Archive
          </Link>
          <Link to="/profile" className="transition-colors hover:text-primary">
            Profile
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <RabbyKitConnectButton />
      </div>
    </nav>
  );
};
