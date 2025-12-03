import { Link } from "react-router-dom";
import { categories } from "@/data/categories.mock";
import { routesConfig } from "@/config/app.config";
import { BrutalCard } from "@/shared/components/brutal/BrutalCard";
import { ArrowRight } from "lucide-react";

export function CategoryQuick() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`${routesConfig.products.search}?category=${category.id}`}
        >
          <BrutalCard
            hoverable
            className="h-full flex flex-col justify-between group bg-white hover:bg-neon-yellow transition-colors"
          >
            <div>
              <h3 className="font-heading text-2xl uppercase mb-2 group-hover:translate-x-2 transition-transform">
                {category.name}
              </h3>
              <p className="font-mono text-sm text-gray-500 group-hover:text-black">
                Explore collection
              </p>
            </div>
            <div className="mt-8 flex justify-end">
              <div className="p-2 border-2 border-black bg-white group-hover:bg-black group-hover:text-white transition-colors">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </BrutalCard>
        </Link>
      ))}
    </div>
  );
}
