import { BrutalCard } from '@/shared/components/brutal/BrutalCard';
import { BrutalButton } from '@/shared/components/brutal/BrutalButton';
import { BrutalBadge } from '@/shared/components/brutal/BrutalBadge';
import { DollarSign, Package, ShoppingBag, TrendingUp, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

export function SellerDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-heading text-4xl uppercase">Seller Dashboard</h1>
          <p className="font-mono text-gray-500">Welcome back, Cyber Merchant</p>
        </div>
        <BrutalButton>
          + New Product
        </BrutalButton>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BrutalCard variant="neon" className="relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-black text-neon-green border-2 border-black">
              <DollarSign className="w-6 h-6" />
            </div>
            <BrutalBadge variant="outline" className="bg-white">+12%</BrutalBadge>
          </div>
          <p className="font-mono text-sm font-bold uppercase">Total Revenue</p>
          <h3 className="font-heading text-4xl">$45,231</h3>
        </BrutalCard>

        <BrutalCard className="bg-neon-pink text-white border-black">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white text-black border-2 border-black">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <BrutalBadge variant="outline" className="bg-black text-white">+5%</BrutalBadge>
          </div>
          <p className="font-mono text-sm font-bold uppercase">Total Orders</p>
          <h3 className="font-heading text-4xl">1,205</h3>
        </BrutalCard>

        <BrutalCard variant="dark">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-neon-blue text-black border-2 border-white">
              <Package className="w-6 h-6" />
            </div>
            <BrutalBadge variant="outline" className="bg-neon-blue text-black border-white">Low Stock</BrutalBadge>
          </div>
          <p className="font-mono text-sm font-bold uppercase text-gray-400">Products</p>
          <h3 className="font-heading text-4xl text-white">85</h3>
        </BrutalCard>

        <BrutalCard>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-neon-yellow text-black border-2 border-black">
              <TrendingUp className="w-6 h-6" />
            </div>
            <BrutalBadge variant="outline">+24%</BrutalBadge>
          </div>
          <p className="font-mono text-sm font-bold uppercase">Conversion</p>
          <h3 className="font-heading text-4xl">3.2%</h3>
        </BrutalCard>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <BrutalCard className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading text-2xl uppercase border-b-4 border-black inline-block">Revenue Overview</h3>
            <select className="font-mono font-bold border-3 border-black p-2 bg-white outline-none focus:ring-4 ring-neon-green/50">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#000" opacity={0.1} />
                <XAxis dataKey="name" stroke="#000" tick={{ fontFamily: 'Space Mono' }} />
                <YAxis stroke="#000" tick={{ fontFamily: 'Space Mono' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: 'none', 
                    borderRadius: 0,
                    color: '#fff',
                    fontFamily: 'Space Mono'
                  }}
                  itemStyle={{ color: '#CCFF00' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#000" 
                  strokeWidth={3}
                  fill="#CCFF00" 
                  fillOpacity={0.8} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </BrutalCard>

        <BrutalCard className="bg-black text-white border-black">
          <h3 className="font-heading text-2xl uppercase mb-6 text-neon-pink border-b-4 border-neon-pink inline-block">Top Products</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 border-2 border-white/20 hover:border-neon-pink transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-white/10 border-2 border-white/20 group-hover:border-neon-pink" />
                <div className="flex-1">
                  <p className="font-mono font-bold text-sm truncate">Cyber Deck v{i}.0</p>
                  <p className="text-xs text-gray-400">124 sales</p>
                </div>
                <div className="text-neon-green font-mono font-bold">
                  $12k
                </div>
              </div>
            ))}
          </div>
          <BrutalButton fullWidth className="mt-6 bg-white text-black border-white hover:bg-neon-pink hover:text-white hover:border-neon-pink">
            View All
          </BrutalButton>
        </BrutalCard>
      </div>

      {/* Recent Orders Table */}
      <BrutalCard>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl uppercase border-b-4 border-black inline-block">Recent Orders</h3>
          <BrutalButton size="sm" variant="ghost">View All Orders</BrutalButton>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full font-mono text-sm border-collapse">
            <thead>
              <tr className="border-b-4 border-black">
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">Order ID</th>
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">Customer</th>
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">Product</th>
                <th className="text-left py-4 px-4 uppercase font-bold bg-gray-100">Status</th>
                <th className="text-right py-4 px-4 uppercase font-bold bg-gray-100">Amount</th>
                <th className="text-center py-4 px-4 uppercase font-bold bg-gray-100">Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b-2 border-gray-200 hover:bg-neon-yellow/10 transition-colors">
                  <td className="py-4 px-4 font-bold">#ORD-2025-{880 + i}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-black rounded-full" />
                      <span>Cyber User {i}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">Neon Light Strip</td>
                  <td className="py-4 px-4">
                    <BrutalBadge variant={i % 2 === 0 ? 'neon' : 'outline'}>
                      {i % 2 === 0 ? 'Completed' : 'Processing'}
                    </BrutalBadge>
                  </td>
                  <td className="py-4 px-4 text-right font-bold">$129.00</td>
                  <td className="py-4 px-4 text-center">
                    <button className="p-2 hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
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

export default SellerDashboard;
