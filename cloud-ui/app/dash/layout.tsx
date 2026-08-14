import { UserButton } from "@clerk/nextjs";
import { Cloud, FileText, FolderSync, Settings, Star, Trash, Search, Bell } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      {/* Sidebar */}
      {/* <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dash" className="flex items-center gap-2 font-bold text-xl">
            <Cloud className="h-6 w-6 text-primary" />
            <span>CloudUI</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-4 text-sm font-medium space-y-1">
            <Link href="/dash" className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all">
              <FileText className="h-4 w-4" />
              My Files
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground">
              <FolderSync className="h-4 w-4" />
              Shared
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground">
              <Star className="h-4 w-4" />
              Starred
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground">
              <Trash className="h-4 w-4" />
              Trash
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <nav className="grid items-start text-sm font-medium">
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </aside> */}

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search files, folders..."
                  className="w-full bg-background appearance-none pl-9 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive"></span>
            </button>
            <UserButton />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
