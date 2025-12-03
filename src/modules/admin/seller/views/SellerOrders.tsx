import { BrutalCard } from "@/shared/components/brutal/BrutalCard";
import { BrutalButton } from "@/shared/components/brutal/BrutalButton";
import { BrutalBadge } from "@/shared/components/brutal/BrutalBadge";
import { BrutalInput } from "@/shared/components/brutal/BrutalInput";
import { Search, Filter, Eye, Truck, CheckCircle, Clock } from "lucide-react";

export function SellerOrders() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-heading text-4xl uppercase">Orders</h1>
          <p className="font-mono text-gray-500">Track and manage shipments</p>
        </div>
        <BrutalButton variant="outline">Export CSV</BrutalButton>
      </div>

      <BrutalCard>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <BrutalInput
              icon={<Search className="w-5 h-5" />}
              placeholder="Search orders..."
            />
          </div>
          <div className="flex gap-2">
            <BrutalButton
              variant="outline"
              className="bg-neon-yellow border-black"
            >
              Pending
            </BrutalButton>
            <BrutalButton variant="outline">Completed</BrutalButton>
            <BrutalButton variant="outline" className="flex items-center gap-2">
              <Filter className="w-5 h-5" /> More
            </BrutalButton>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-sm border-collapse">
            <thead>
              <tr className="border-b-4 border-black">
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">
                  Order ID
                </th>
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">
                  Date
                </th>
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">
                  Customer
                </th>
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">
                  Items
                </th>
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">
                  Total
                </th>
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">
                  Status
                </th>
                <th className="text-right py-4 px-4 uppercase font-bold bg-gray-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr
                  key={i}
                  className="border-b-2 border-gray-200 hover:bg-neon-pink/10 transition-colors"
                >
                  <td className="py-4 px-4 font-bold">#ORD-2025-{880 + i}</td>
                  <td className="py-4 px-4 text-gray-500">
                    Oct {12 + i}, 2025
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold">Cyber User {i}</div>
                    <div className="text-xs text-gray-500">
                      user{i}@neobit.com
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold">{i + 1} items</span>
                  </td>
                  <td className="py-4 px-4 font-bold">$1,299.00</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {i === 1 ? (
                        <BrutalBadge
                          variant="outline"
                          className="bg-yellow-100 border-yellow-600 text-yellow-800"
                        >
                          <Clock className="w-3 h-3 mr-1" /> Processing
                        </BrutalBadge>
                      ) : i === 2 ? (
                        <BrutalBadge
                          variant="outline"
                          className="bg-blue-100 border-blue-600 text-blue-800"
                        >
                          <Truck className="w-3 h-3 mr-1" /> Shipped
                        </BrutalBadge>
                      ) : (
                        <BrutalBadge
                          variant="neon"
                          className="bg-green-100 border-green-600 text-green-800"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" /> Delivered
                        </BrutalBadge>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <BrutalButton
                      size="sm"
                      variant="ghost"
                      className="hover:bg-black hover:text-white"
                    >
                      <Eye className="w-4 h-4" /> Details
                    </BrutalButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BrutalCard>
    </div>
  );
}

export default SellerOrders;
