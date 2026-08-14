import Dashboard from "@/components/pages/Dashboard";
import Marketing from "@/components/pages/Marketing";
import { Button } from "@/components/ui/button";
import { Show } from "@clerk/nextjs";
import { ArrowRight, HardDrive, Lock, Zap } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="flex flex-col items-center w-full h-full ">
      <Show when="signed-out">
        <Marketing />
      </Show>
      <Show when="signed-in">
        <Dashboard />
      </Show>
    </div>
  );
}
