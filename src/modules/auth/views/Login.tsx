import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { BrutalButton } from "@/shared/components/brutal/BrutalButton";
import { BrutalInput } from "@/shared/components/brutal/BrutalInput";
import { BrutalCard } from "@/shared/components/brutal/BrutalCard";
import { routesConfig } from "@/config/app.config";
import { brutalToast } from "@/shared/utils/brutalToast";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: handleLogin, isLoading } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      brutalToast.error("Por favor completa todos los campos");
      return;
    }

    await handleLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full"
      >
        <BrutalCard className="bg-white border-4 border-black shadow-brutal-lg p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto w-16 h-16 bg-neon-green border-4 border-black flex items-center justify-center mb-4 shadow-brutal"
            >
              <LogIn className="h-8 w-8 text-black" />
            </motion.div>
            <h1 className="font-heading text-4xl uppercase mb-2">Bienvenido</h1>
            <p className="font-mono text-gray-600">
              Ingresa tus credenciales para acceder
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <BrutalInput
                label="Correo Electrónico"
                icon={<Mail className="w-5 h-5" />}
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <BrutalInput
                label="Contraseña"
                icon={<Lock className="w-5 h-5" />}
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <BrutalButton 
                type="submit" 
                fullWidth 
                size="lg" 
                disabled={isLoading}
                className="bg-black text-white hover:bg-neon-pink hover:text-white hover:border-black"
              >
                {isLoading ? "Iniciando..." : "Iniciar Sesión"}
              </BrutalButton>
            </motion.div>

            <div className="text-center font-mono text-sm">
              <span className="text-gray-600">¿No tienes una cuenta? </span>
              <Link
                to={routesConfig.auth.register}
                className="font-bold text-black hover:text-neon-blue hover:underline decoration-2 underline-offset-2"
              >
                Regístrate
              </Link>
            </div>
          </form>
        </BrutalCard>
      </motion.div>
    </div>
  );
}
