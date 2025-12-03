import { useState } from "react";
import { BrutalCard } from "@/shared/components/brutal/BrutalCard";
import { BrutalButton } from "@/shared/components/brutal/BrutalButton";
import { BrutalBadge } from "@/shared/components/brutal/BrutalBadge";
import { Container } from "@/shared/components/ui/Container";
import { motion } from "framer-motion";
import {
  Users,
  ShoppingBag,
  Package,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState<
    "overview" | "sellers" | "products"
  >("overview");

  // Mock Data
  const kpiData = [
    {
      label: "Total Usuarios",
      value: "12,847",
      icon: Users,
      color: "bg-neon-green",
      change: "+12%",
    },
    {
      label: "Total Vendedores",
      value: "487",
      icon: ShoppingBag,
      color: "bg-neon-blue",
      change: "+8%",
    },
    {
      label: "Total Productos",
      value: "3,291",
      icon: Package,
      color: "bg-neon-pink",
      change: "+15%",
    },
    {
      label: "Ingresos Totales",
      value: "$847,291",
      icon: DollarSign,
      color: "bg-neon-yellow",
      change: "+22%",
    },
  ];

  const pendingSellers = [
    {
      id: 1,
      name: "TechStore Pro",
      email: "tech@store.com",
      date: "Hace 2 días",
      products: 15,
    },
    {
      id: 2,
      name: "Neon Electronics",
      email: "neon@elec.com",
      date: "Hace 5 días",
      products: 8,
    },
  ];

  const pendingProducts = [
    {
      id: 1,
      name: "Gaming Keyboard RGB",
      seller: "TechStore Pro",
      price: 89.99,
      date: "Hace 1 día",
    },
    {
      id: 2,
      name: "Wireless Mouse Pro",
      seller: "Neon Electronics",
      price: 49.99,
      date: "Hace 3 días",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "CyberPunk_99",
      email: "cyber@punk.com",
      date: "Hace 1 hora",
      orders: 5,
    },
    {
      id: 2,
      name: "NeonRider",
      email: "neon@rider.com",
      date: "Hace 3 horas",
      orders: 12,
    },
    {
      id: 3,
      name: "GlitchMaster",
      email: "glitch@master.com",
      date: "Hace 1 día",
      orders: 3,
    },
  ];

  return (
    <Container className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-5xl uppercase mb-2">
            Panel de Administración
          </h1>
          <p className="font-mono text-lg text-gray-600">
            Control total del sistema
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BrutalCard
                className={`${kpi.color} border-4 border-black p-6 hover:shadow-brutal-lg transition-all`}
              >
                <div className="flex items-center justify-between mb-4">
                  <kpi.icon className="w-12 h-12 text-black" />
                  <div className="flex items-center gap-1 bg-black text-white px-2 py-1 font-mono text-sm font-bold">
                    <TrendingUp className="w-3 h-3" />
                    {kpi.change}
                  </div>
                </div>
                <p className="font-mono text-sm uppercase mb-1 text-black">
                  {kpi.label}
                </p>
                <p className="font-heading text-4xl text-black">{kpi.value}</p>
              </BrutalCard>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b-4 border-black">
          <button
            onClick={() => setSelectedTab("overview")}
            className={`px-6 py-3 font-heading text-lg uppercase transition-all ${
              selectedTab === "overview"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setSelectedTab("sellers")}
            className={`px-6 py-3 font-heading text-lg uppercase transition-all ${
              selectedTab === "sellers"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Vendedores Pendientes
          </button>
          <button
            onClick={() => setSelectedTab("products")}
            className={`px-6 py-3 font-heading text-lg uppercase transition-all ${
              selectedTab === "products"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Productos Pendientes
          </button>
        </div>

        {/* Tab Content */}
        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Users */}
            <BrutalCard className="bg-white border-4 border-black p-6">
              <h3 className="font-heading text-2xl uppercase mb-6 border-b-4 border-neon-green inline-block pb-2">
                Usuarios Recientes
              </h3>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between border-2 border-black p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-heading text-lg uppercase">
                        {user.name}
                      </p>
                      <p className="font-mono text-sm text-gray-600">
                        {user.email}
                      </p>
                      <p className="font-mono text-xs text-gray-500">
                        {user.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm font-bold">
                        {user.orders} pedidos
                      </p>
                      <button className="text-neon-blue hover:underline font-mono text-xs mt-1">
                        Ver perfil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </BrutalCard>

            {/* Activity Chart Placeholder */}
            <BrutalCard className="bg-white border-4 border-black p-6">
              <h3 className="font-heading text-2xl uppercase mb-6 border-b-4 border-neon-pink inline-block pb-2">
                Actividad del Sistema
              </h3>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-black">
                <p className="font-mono text-gray-400 text-center">
                  [Gráfico de Actividad]
                  <br />
                  Implementar con Recharts
                </p>
              </div>
            </BrutalCard>
          </div>
        )}

        {selectedTab === "sellers" && (
          <BrutalCard className="bg-white border-4 border-black p-6">
            <h3 className="font-heading text-2xl uppercase mb-6 border-b-4 border-neon-blue inline-block pb-2">
              Vendedores Pendientes de Aprobación
            </h3>
            <div className="space-y-4">
              {pendingSellers.map((seller) => (
                <div
                  key={seller.id}
                  className="border-4 border-black p-6 bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-heading text-xl uppercase">
                        {seller.name}
                      </h4>
                      <p className="font-mono text-sm text-gray-600">
                        {seller.email}
                      </p>
                      <p className="font-mono text-xs text-gray-500">
                        Solicitado {seller.date}
                      </p>
                    </div>
                    <BrutalBadge variant="outline" size="sm">
                      {seller.products} Productos
                    </BrutalBadge>
                  </div>
                  <div className="flex gap-3">
                    <BrutalButton
                      size="sm"
                      className="bg-neon-green text-black hover:bg-green-400"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aprobar
                    </BrutalButton>
                    <BrutalButton
                      size="sm"
                      variant="outline"
                      className="hover:bg-red-500 hover:text-white hover:border-black"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rechazar
                    </BrutalButton>
                    <BrutalButton size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Revisar
                    </BrutalButton>
                  </div>
                </div>
              ))}
            </div>
          </BrutalCard>
        )}

        {selectedTab === "products" && (
          <BrutalCard className="bg-white border-4 border-black p-6">
            <h3 className="font-heading text-2xl uppercase mb-6 border-b-4 border-neon-pink inline-block pb-2">
              Productos Pendientes de Aprobación
            </h3>
            <div className="space-y-4">
              {pendingProducts.map((product) => (
                <div
                  key={product.id}
                  className="border-4 border-black p-6 bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-heading text-xl uppercase">
                        {product.name}
                      </h4>
                      <p className="font-mono text-sm text-gray-600">
                        Vendedor: {product.seller}
                      </p>
                      <p className="font-mono text-xs text-gray-500">
                        Enviado {product.date}
                      </p>
                    </div>
                    <p className="font-heading text-2xl text-neon-green">
                      ${product.price}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <BrutalButton
                      size="sm"
                      className="bg-neon-blue text-white hover:bg-blue-400"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aprobar
                    </BrutalButton>
                    <BrutalButton
                      size="sm"
                      variant="outline"
                      className="hover:bg-red-500 hover:text-white hover:border-black"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rechazar
                    </BrutalButton>
                    <BrutalButton size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalles
                    </BrutalButton>
                  </div>
                </div>
              ))}
            </div>
          </BrutalCard>
        )}
      </motion.div>
    </Container>
  );
}

export default AdminDashboard;
