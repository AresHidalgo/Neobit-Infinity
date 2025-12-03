import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/core/hooks/useAuth";
import { BrutalCard } from "@/shared/components/brutal/BrutalCard";
import { BrutalButton } from "@/shared/components/brutal/BrutalButton";
import { BrutalBadge } from "@/shared/components/brutal/BrutalBadge";
import { BrutalInput } from "@/shared/components/brutal/BrutalInput";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/Avatar";
import {
  Trophy,
  Package,
  Heart,
  Settings,
  LogOut,
  Star,
  Zap,
} from "lucide-react";

export function Profile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Trophy },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Mock Gamification Data
  const stats = {
    level: 42,
    xp: 8450,
    nextLevelXp: 10000,
    rank: "Cyber Warlord",
    badges: ["Early Adopter", "Big Spender", "Review King", "Beta Tester"],
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BrutalCard
                variant="neon"
                className="relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Zap className="w-24 h-24" />
                </div>
                <h3 className="font-mono font-bold uppercase text-sm mb-2">
                  Level
                </h3>
                <p className="font-heading text-6xl">{stats.level}</p>
                <div className="mt-4 w-full bg-black/20 h-4 border-2 border-black">
                  <div
                    className="h-full bg-black transition-all duration-1000"
                    style={{
                      width: `${(stats.xp / stats.nextLevelXp) * 100}%`,
                    }}
                  />
                </div>
                <p className="font-mono text-xs mt-2 font-bold">
                  {stats.xp} / {stats.nextLevelXp} XP
                </p>
              </BrutalCard>

              <BrutalCard className="bg-neon-pink text-white border-white shadow-[4px_4px_0px_0px_#ffffff]">
                <h3 className="font-mono font-bold uppercase text-sm mb-2">
                  Rank
                </h3>
                <p className="font-heading text-4xl leading-tight">
                  {stats.rank}
                </p>
                <div className="mt-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
              </BrutalCard>

              <BrutalCard variant="dark">
                <h3 className="font-mono font-bold uppercase text-sm mb-2 text-neon-green">
                  Balance
                </h3>
                <p className="font-heading text-5xl text-white">$1,337.00</p>
                <BrutalButton
                  size="sm"
                  variant="outline"
                  className="mt-4 w-full border-white text-white hover:bg-white hover:text-black"
                >
                  Top Up
                </BrutalButton>
              </BrutalCard>
            </div>

            {/* Badges Section */}
            <BrutalCard>
              <h3 className="font-heading text-2xl uppercase mb-6 border-b-4 border-black inline-block">
                Badges Collection
              </h3>
              <div className="flex flex-wrap gap-4">
                {stats.badges.map((badge, i) => (
                  <BrutalBadge
                    key={i}
                    variant="neon"
                    size="md"
                    className="text-lg py-2 px-4 border-3"
                  >
                    {badge}
                  </BrutalBadge>
                ))}
                <BrutalBadge
                  variant="outline"
                  size="md"
                  className="text-lg py-2 px-4 border-3 border-dashed opacity-50"
                >
                  ??? Locked
                </BrutalBadge>
              </div>
            </BrutalCard>

            {/* Recent Activity Mock */}
            <BrutalCard>
              <h3 className="font-heading text-2xl uppercase mb-6 border-b-4 border-black inline-block">
                Recent Activity
              </h3>
              <div className="space-y-4 font-mono">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b-2 border-gray-200 pb-4 last:border-0"
                  >
                    <div>
                      <p className="font-bold">Order #882{i}</p>
                      <p className="text-sm text-gray-500">
                        Purchased Cyber Deck v2
                      </p>
                    </div>
                    <BrutalBadge variant="outline">Delivered</BrutalBadge>
                  </div>
                ))}
              </div>
            </BrutalCard>
          </div>
        );

      case "settings":
        return (
          <BrutalCard>
            <h3 className="font-heading text-2xl uppercase mb-8">
              Account Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BrutalInput
                label="Display Name"
                defaultValue={user?.firstName}
              />
              <BrutalInput label="Email" defaultValue={user?.email} disabled />
              <BrutalInput label="Cyber Handle" defaultValue="@neobit_user" />
              <BrutalInput
                label="Location"
                defaultValue="Neo Tokyo, Sector 7"
              />
            </div>
            <div className="mt-8 flex justify-end gap-4">
              <BrutalButton variant="ghost">Cancel</BrutalButton>
              <BrutalButton>Save Changes</BrutalButton>
            </div>
          </BrutalCard>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <h3 className="font-heading text-4xl mb-4">Coming Soon</h3>
            <p className="font-mono text-lg max-w-md">
              This module is currently being compiled by our nanobots. Check
              back later.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <BrutalCard className="text-center">
            <div className="relative inline-block mb-4">
              <Avatar className="h-32 w-32 rounded-none border-4 border-black">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback className="rounded-none text-4xl font-heading bg-neon-yellow">
                  {user?.firstName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-neon-green border-3 border-black px-2 py-1 font-mono font-bold text-xs">
                LVL {stats.level}
              </div>
            </div>
            <h2 className="font-heading text-2xl uppercase">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="font-mono text-sm text-gray-500 mt-1">
              Member since 2077
            </p>
          </BrutalCard>

          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 font-mono font-bold uppercase border-3 transition-all duration-200 ${
                    isActive
                      ? "bg-black text-white border-black translate-x-2 shadow-brutal"
                      : "bg-white text-black border-transparent hover:border-black hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
            <button
              onClick={() => logout()}
              className="w-full flex items-center gap-3 px-6 py-4 font-mono font-bold uppercase border-3 border-transparent text-red-600 hover:bg-red-50 hover:border-red-600 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Profile;
