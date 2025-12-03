import { useState } from "react";
import { Link } from "react-router-dom";
import { useOrders } from "@/core/query/queries/orders.queries";
import { BrutalCard } from "@/shared/components/brutal/BrutalCard";
import { BrutalBadge } from "@/shared/components/brutal/BrutalBadge";
import { BrutalButton } from "@/shared/components/brutal/BrutalButton";
import { LoadingSpinner } from "@/shared/components/ui/LoadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import { routesConfig } from "@/config/app.config";
import { Order } from "@/types/order.type";
import {
  Package,
  Calendar,
  DollarSign,
  Truck,
  ShoppingBag,
} from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

function OrderCard({ order }: { order: Order }) {
  const statusColors: Record<Order["status"], string> = {
    pending: "bg-neon-yellow text-black",
    confirmed: "bg-neon-blue text-white",
    processing: "bg-purple-500 text-white",
    shipped: "bg-neon-green text-black",
    delivered: "bg-green-600 text-white",
    cancelled: "bg-red-600 text-white",
  };

  const statusLabels: Record<Order["status"], string> = {
    pending: "Pendiente",
    confirmed: "Confirmado",
    processing: "Procesando",
    shipped: "Enviado",
    delivered: "Entregado",
    cancelled: "Cancelado",
  };

  return (
    <Link to={routesConfig.orders.detail(order.id)}>
      <BrutalCard className="hover:shadow-brutal-lg transition-all cursor-pointer p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading text-2xl uppercase">
              Pedido #{order.id.split("-")[1]}
            </h3>
            <p className="font-mono text-sm text-gray-600 mt-1">
              {order.createdAt
                ? format(new Date(order.createdAt), "dd MMM yyyy")
                : "N/A"}
            </p>
          </div>
          <BrutalBadge className={statusColors[order.status]}>
            {statusLabels[order.status]}
          </BrutalBadge>
        </div>
        <div className="space-y-3 border-t-2 border-gray-100 pt-4">
          <div className="flex items-center gap-3 font-mono text-sm">
            <Package className="h-4 w-4" />
            <span>
              {order.items.length} producto{order.items.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-lg font-bold">
            <DollarSign className="h-5 w-5" />
            <span>${order.total.toFixed(2)}</span>
          </div>
          {order.trackingNumber && (
            <div className="flex items-center gap-3 font-mono text-sm">
              <Truck className="h-4 w-4" />
              <span>Seguimiento: {order.trackingNumber}</span>
            </div>
          )}
          {order.shippedAt && (
            <div className="flex items-center gap-3 font-mono text-xs text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>
                Enviado el {format(new Date(order.shippedAt), "dd MMM yyyy")}
              </span>
            </div>
          )}
        </div>
      </BrutalCard>
    </Link>
  );
}

export function Orders() {
  const [page] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data, isLoading, error } = useOrders({ page, limit: 10 });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !data?.success || !data.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BrutalCard className="py-12 text-center">
          <p className="font-mono text-red-600 font-bold uppercase">
            Error al cargar pedidos
          </p>
        </BrutalCard>
      </div>
    );
  }

  const orders = data.data;

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  if (filteredOrders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-4xl uppercase border-b-4 border-black inline-block">
            Mis Pedidos
          </h1>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px] border-3 border-black rounded-none font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-3 border-black rounded-none">
              <SelectItem value="all" className="font-mono">
                Todos
              </SelectItem>
              <SelectItem value="pending" className="font-mono">
                Pendiente
              </SelectItem>
              <SelectItem value="confirmed" className="font-mono">
                Confirmado
              </SelectItem>
              <SelectItem value="processing" className="font-mono">
                Procesando
              </SelectItem>
              <SelectItem value="shipped" className="font-mono">
                Enviado
              </SelectItem>
              <SelectItem value="delivered" className="font-mono">
                Entregado
              </SelectItem>
              <SelectItem value="cancelled" className="font-mono">
                Cancelado
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <BrutalCard className="py-20 text-center bg-gray-50">
          <div className="mb-8 inline-block p-8 border-4 border-black bg-neon-yellow">
            <ShoppingBag className="h-16 w-16" />
          </div>
          <h2 className="font-heading text-3xl uppercase mb-4">
            No se encontraron pedidos
          </h2>
          <p className="font-mono text-lg text-gray-600 mb-8">
            {statusFilter !== "all"
              ? "No hay pedidos con este estado"
              : "Aún no has realizado ningún pedido"}
          </p>
          {statusFilter === "all" && (
            <Link to={routesConfig.products.search}>
              <BrutalButton size="lg">Comenzar a Comprar</BrutalButton>
            </Link>
          )}
        </BrutalCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h1 className="font-heading text-4xl uppercase border-b-4 border-black inline-block">
          Mis Pedidos ({filteredOrders.length})
        </h1>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px] border-3 border-black rounded-none font-mono">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-3 border-black rounded-none">
            <SelectItem value="all" className="font-mono">
              Todos
            </SelectItem>
            <SelectItem value="pending" className="font-mono">
              Pendiente
            </SelectItem>
            <SelectItem value="confirmed" className="font-mono">
              Confirmado
            </SelectItem>
            <SelectItem value="processing" className="font-mono">
              Procesando
            </SelectItem>
            <SelectItem value="shipped" className="font-mono">
              Enviado
            </SelectItem>
            <SelectItem value="delivered" className="font-mono">
              Entregado
            </SelectItem>
            <SelectItem value="cancelled" className="font-mono">
              Cancelado
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <OrderCard order={order} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
