import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "@/core/query/queries/products.queries";
import { BrutalCard } from "@/shared/components/brutal/BrutalCard";
import { BrutalButton } from "@/shared/components/brutal/BrutalButton";
import { BrutalBadge } from "@/shared/components/brutal/BrutalBadge";
import { BrutalInput } from "@/shared/components/brutal/BrutalInput";
import { LoadingSpinner } from "@/shared/components/ui/LoadingSpinner";
import {
  Star,
  Truck,
  Shield,
  RotateCcw,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = useProduct(id || "");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  if (error || !data?.success || !data.data)
    return (
      <div className="text-center py-20 font-mono">
        Producto no encontrado. Error del Sistema.
      </div>
    );

  const product = data.data;

  const tabs = [
    { id: "description", label: "Especificaciones" },
    { id: "reviews", label: `Reseñas (${product.reviewCount})` },
    { id: "comments", label: "Comentarios" },
    { id: "shipping", label: "Envío" },
  ];

  // Mock Comments Data
  const comments = [
    {
      id: 1,
      user: "CyberPunk_99",
      text: "¡Este producto es increíble! La calidad es superior.",
      date: "Hace 2 días",
    },
    {
      id: 2,
      user: "NeonRider",
      text: "Me encanta el diseño, combina perfecto con mi setup.",
      date: "Hace 1 semana",
    },
    {
      id: 3,
      user: "GlitchMaster",
      text: "El envío fue súper rápido. Recomendado.",
      date: "Hace 2 semanas",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <BrutalCard className="p-0 overflow-hidden border-4 border-black bg-white relative">
            <div className="aspect-square relative">
              <img
                src={
                  product.images?.[selectedImage] ||
                  "https://via.placeholder.com/600"
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discountPercent && (
                <div className="absolute top-4 left-4">
                  <BrutalBadge
                    variant="neon"
                    size="md"
                    className="text-xl px-4 py-2"
                  >
                    -{product.discountPercent}% OFF
                  </BrutalBadge>
                </div>
              )}
            </div>
          </BrutalCard>

          <div className="grid grid-cols-4 gap-4">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square border-3 transition-all ${
                  selectedImage === idx
                    ? "border-neon-pink shadow-[4px_4px_0px_0px_#FF0099]"
                    : "border-black hover:border-neon-blue"
                }`}
              >
                <img
                  src={img}
                  alt={`Ver ${idx}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Info & Actions */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="font-heading text-4xl lg:text-5xl uppercase leading-none">
                {product.name}
              </h1>
              <button className="p-3 border-2 border-black hover:bg-neon-pink hover:text-white transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-black text-white px-3 py-1 font-mono font-bold">
                <Star className="w-4 h-4 fill-white" />
                {product.rating.toFixed(1)}
              </div>
              <span className="font-mono text-gray-500 underline decoration-2 decoration-neon-green">
                {product.reviewCount} Reseñas Verificadas
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-heading text-6xl text-neon-blue">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="font-mono text-xl text-gray-400 line-through decoration-4 decoration-red-500">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
            </div>

            <p className="font-mono text-lg leading-relaxed mb-8 border-l-4 border-neon-yellow pl-4">
              {product.description}
            </p>

            {/* Actions */}
            <div className="space-y-4 p-6 border-4 border-black bg-gray-50 shadow-brutal">
              <div className="flex gap-4">
                <BrutalInput
                  type="number"
                  defaultValue="1"
                  min="1"
                  className="w-24 text-center font-heading text-xl"
                />
                <BrutalButton
                  fullWidth
                  className="text-xl py-6 bg-black text-white hover:bg-neon-green hover:text-black hover:border-black"
                >
                  <ShoppingCart className="w-6 h-6 mr-2" /> Agregar al Carrito
                </BrutalButton>
              </div>
              <BrutalButton fullWidth variant="outline" className="py-4">
                Comprar Ahora - Un Clic
              </BrutalButton>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: Truck, text: "Envío Rápido" },
                { icon: Shield, text: "Pago Seguro" },
                { icon: RotateCcw, text: "30 Días Devolución" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-4 border-2 border-gray-200 hover:border-black transition-colors"
                >
                  <badge.icon className="w-8 h-8 mb-2" />
                  <span className="font-mono text-xs font-bold uppercase">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-20">
        <div className="flex flex-wrap border-b-4 border-black">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 font-heading text-xl uppercase transition-all ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <BrutalCard className="border-t-0 rounded-none p-8 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "description" && (
                <div className="prose prose-lg max-w-none font-mono">
                  <h3 className="font-heading uppercase text-2xl mb-4">
                    Especificaciones Técnicas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {Object.entries(product.specifications || {}).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between border-b-2 border-gray-200 py-2"
                        >
                          <span className="font-bold uppercase text-gray-500">
                            {key}
                          </span>
                          <span>{value as string}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="text-center py-12">
                  <p className="font-heading text-2xl text-gray-400">
                    Módulo de Reseñas Cargando...
                  </p>
                </div>
              )}
              {activeTab === "comments" && (
                <div className="space-y-6">
                  <h3 className="font-heading uppercase text-2xl mb-6">
                    Comentarios de la Comunidad
                  </h3>
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="border-2 border-black p-4 bg-gray-50 hover:bg-white hover:shadow-brutal transition-all"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-neon-pink rounded-none flex items-center justify-center border-2 border-black">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-heading uppercase text-lg">
                            {comment.user}
                          </span>
                          <span className="font-mono text-xs text-gray-500 ml-auto">
                            {comment.date}
                          </span>
                        </div>
                        <p className="font-mono pl-11">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t-2 border-gray-200">
                    <h4 className="font-heading uppercase text-lg mb-4">
                      Deja un comentario
                    </h4>
                    <div className="flex gap-4">
                      <BrutalInput
                        placeholder="Escribe tu comentario..."
                        className="flex-1"
                      />
                      <BrutalButton>Enviar</BrutalButton>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "shipping" && (
                <div className="font-mono space-y-4">
                  <p>
                    <strong>Envío Estándar:</strong> 3-5 Días Hábiles
                  </p>
                  <p>
                    <strong>Envío Exprés:</strong> 1-2 Días Hábiles
                  </p>
                  <p>
                    <strong>Internacional:</strong> 7-14 Días Hábiles
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </BrutalCard>
      </div>
    </div>
  );
}

export default ProductDetail;
