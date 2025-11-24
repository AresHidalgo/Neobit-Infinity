import { Link } from "react-router-dom";
import { routesConfig } from "../../config/app.config";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  Twitch,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/shared/utils/cn";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://facebook.com/neobitinfinity",
    color: "hover:text-blue-500 hover:neon-text",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/neobitinfinity",
    color: "hover:text-sky-500 hover:neon-text",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/neobitinfinity",
    color: "hover:text-pink-500 hover:neon-text",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/@neobitinfinity",
    color: "hover:text-red-500 hover:neon-text",
  },
  {
    name: "Discord",
    icon: MessageCircle,
    href: "https://discord.gg/neobitinfinity",
    color: "hover:text-indigo-500 hover:neon-text",
  },
  {
    name: "Twitch",
    icon: Twitch,
    href: "https://twitch.tv/neobitinfinity",
    color: "hover:text-purple-500 hover:neon-text",
  },
];

export function Footer() {
  return (
    <footer className="border-t-[4px] bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6">Neobit Infinity</h3>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              Your trusted e-commerce platform with AI-powered assistance.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Shop</h4>
            <ul className="space-y-3 text-base">
              <li>
                <Link
                  to={routesConfig.products.search}
                  className="text-muted-foreground hover:text-foreground"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to={routesConfig.products.search}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Featured
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Account</h4>
            <ul className="space-y-3 text-base">
              <li>
                <Link
                  to={routesConfig.profile}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to={routesConfig.orders.list}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to={routesConfig.wishlist}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Support</h4>
            <ul className="space-y-3 text-base">
              <li>
                <Link
                  to="/help"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to={routesConfig.contact.index}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Section - Refined Minimalist */}
        <div className="mt-12 pt-12 border-t-[4px] border-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="text-lg font-bold uppercase tracking-wide mb-6">
                Síguenos
              </h4>
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-3 brutal-border border-[4px] border-foreground/30 bg-background/50 hover:bg-background transition-all duration-300 ease-out group",
                        social.color
                      )}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, ease: "easeOut" }}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -3, 3, -3, 0],
                        borderWidth: "6px",
                        borderColor: "currentColor",
                        boxShadow: "0 0 12px currentColor",
                      }}
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5 lg:h-6 lg:w-6" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-base text-muted-foreground">
                &copy; {new Date().getFullYear()} Neobit Infinity. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
