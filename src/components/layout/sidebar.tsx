import NavLink from "@/components/shared/sidebar-nav-link";
import { Button } from "@/components/ui/button";
import { Settings, User, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  PRIMARY_SIDEBAR_LINKS,
  SECONDARY_SIDEBAR_LINKS
} from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        "w-full h-full min-h-full shrink-0 bg-zinc-200/75 border-r border-zinc-300 flex flex-col relative *:w-full",
        className
      )}>
      <header className="h-(--layout-header-height) flex items-center gap-2 bg-white border-b border-zinc-300  px-2 py-4">
        <div className="flex justify-center items-center w-6 h-6 p-1.5 rounded bg-blue-100">
          <img src="/logo.png" alt="AMPtitude Logo" />
        </div>

        <h2 className="text-lg font-semibold">AMPtitude</h2>
      </header>

      <div className="px-2 py-4 mb-2">
        <div className="relative w-full">
          <Search className="w-9 h-9 p-2.5 absolute left-0 flex items-center justify-center text-sm text-zinc-500" />
          <Input
            aria-label="Search Menu"
            type="text"
            placeholder="Search Menu"
            className="pl-9 bg-white cursor-not-allowed"
            disabled
          />
        </div>
      </div>

      <nav className="h-full flex flex-col justify-between px-2 py-2">
        <ul className="space-y-2">
          {PRIMARY_SIDEBAR_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink
                link={link}
                className="w-full justify-start flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-100 rounded-md text-zinc-700 hover:text-zinc-900 transition-colors"
              />
            </li>
          ))}
        </ul>

        <ul className="space-y-2 pb-4">
          {SECONDARY_SIDEBAR_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink
                link={link}
                className="w-full justify-start flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-100 rounded-md text-zinc-700 hover:text-zinc-900 transition-colors"
              />
            </li>
          ))}
        </ul>
      </nav>

      <footer className="border-t border-zinc-300 bg-white px-4 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex justify-center items-center gap-x-2">
            <User className="size-6 p-1 rounded-full bg-zinc-200 text-zinc-500" />
            <p className="text-sm font-semibold">Kelly Kapoor</p>
          </div>
          <Button
            aria-label="Settings"
            className="size-8 bg-transparent hover:bg-zinc-200 text-foreground">
            <Settings />
          </Button>
        </div>
      </footer>
    </aside>
  );
};

export default Sidebar;
