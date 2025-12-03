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
    <footer className="border-t-4 border-black bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-5xl lg:text-7xl font-heading uppercase leading-none mb-6">Neobit<br/><span className="text-neon-green text-stroke-black">Infinity</span></h3>
            <p className="text-lg lg:text-xl font-mono text-black leading-relaxed max-w-md border-l-4 border-neon-pink pl-6">
              Tu plataforma de comercio electrónico de confianza con asistencia de IA. Redefiniendo la experiencia de compra.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-2xl uppercase mb-8 border-b-4 border-black inline-block pb-2">Tienda</h4>
            <ul className="space-y-4 text-lg font-mono font-bold">
              <li>
                <Link
                  to={routesConfig.products.search}
                  className="text-black hover:text-neon-pink hover:translate-x-2 transition-transform inline-block"
                >
                  Todos los Productos
                </Link>
              </li>
              <li>
                <Link
                  to={routesConfig.products.search}
                  className="text-black hover:text-neon-blue hover:translate-x-2 transition-transform inline-block"
                >
                  Destacados
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-2xl uppercase mb-8 border-b-4 border-black inline-block pb-2">Soporte</h4>
            <ul className="space-y-4 text-lg font-mono font-bold">
              <li>
                <Link
                  to="/help"
                  className="text-black hover:text-neon-green hover:translate-x-2 transition-transform inline-block"
                >
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link
                  to={routesConfig.contact.index}
                  className="text-black hover:text-neon-yellow hover:translate-x-2 transition-transform inline-block"
                >
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Section - Brutalist */}
        <div className="mt-20 pt-12 border-t-4 border-black">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <h4 className="text-2xl font-heading uppercase tracking-wide mb-8">
                Síguenos
              </h4>
              <div className="flex items-center gap-6">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-4 border-3 border-black bg-white shadow-brutal hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200",
                        social.color.replace('hover:neon-text', '')
                      )}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      aria-label={social.name}
                    >
                      <IconComponent className="h-6 w-6 text-black" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-base font-mono font-bold text-black uppercase">
                &copy; {new Date().getFullYear()} DevsCode.<br/>Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
