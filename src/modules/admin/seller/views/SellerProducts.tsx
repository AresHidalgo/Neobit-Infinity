import { BrutalCard } from '@/shared/components/brutal/BrutalCard';
import { BrutalButton } from '@/shared/components/brutal/BrutalButton';
import { BrutalBadge } from '@/shared/components/brutal/BrutalBadge';
import { BrutalInput } from '@/shared/components/brutal/BrutalInput';
import { Edit, Trash2, Plus, Search, Filter } from 'lucide-react';

export function SellerProducts() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-heading text-4xl uppercase">My Products</h1>
          <p className="font-mono text-gray-500">Manage your inventory</p>
        </div>
        <BrutalButton className="flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add Product
        </BrutalButton>
      </div>

      <BrutalCard>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <BrutalInput icon={<Search className="w-5 h-5" />} placeholder="Search products..." />
          </div>
          <BrutalButton variant="outline" className="flex items-center gap-2">
            <Filter className="w-5 h-5" /> Filters
          </BrutalButton>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-sm border-collapse">
            <thead>
              <tr className="border-b-4 border-black">
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100 w-20">Image</th>
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">Product Name</th>
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">Category</th>
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">Price</th>
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">Stock</th>
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">Status</th>
                <th className="text-right py-4 px-4 uppercase font-bold bg-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b-2 border-gray-200 hover:bg-neon-blue/10 transition-colors group">
                  <td className="py-4 px-4">
                    <div className="w-12 h-12 bg-gray-200 border-2 border-black group-hover:border-neon-blue transition-colors" />
                  </td>
                  <td className="py-4 px-4 font-bold">Cyber Deck v{i}.0 Pro</td>
                  <td className="py-4 px-4 text-gray-500">Hardware</td>
                  <td className="py-4 px-4 font-bold">$1,299.00</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-red-500' : 'bg-green-500'}`} />
                      {i === 2 ? '2' : '45'}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <BrutalBadge variant={i === 2 ? 'outline' : 'neon'}>
                      {i === 2 ? 'Low Stock' : 'Active'}
                    </BrutalBadge>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-red-600 hover:text-white border-2 border-transparent hover:border-black transition-all text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t-2 border-gray-200">
          <p className="font-mono text-sm text-gray-500">Showing 1-5 of 45 products</p>
          <div className="flex gap-2">
            <BrutalButton size="sm" variant="outline" disabled>Previous</BrutalButton>
            <BrutalButton size="sm" variant="outline">Next</BrutalButton>
          </div>
        </div>
      </BrutalCard>
    </div>
  );
}

export default SellerProducts;
