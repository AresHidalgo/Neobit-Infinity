import { usePriceHistoryChart } from '@/core/query/queries/price-history.queries';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';
import { format } from 'date-fns';
import { Badge } from '@/shared/components/ui/Badge';

interface PriceHistoryChartProps {
  productId: string;
  days?: number;
}

export function PriceHistoryChart({ productId, days = 30 }: PriceHistoryChartProps) {
  const { data, isLoading, error } = usePriceHistoryChart(productId, days);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data?.success || !data.data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Failed to load price history</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.data.history.map((item) => ({
    date: format(new Date(item.createdAt), 'MMM dd'),
    price: item.price,
    originalPrice: item.originalPrice || item.price,
  }));

  const { currentPrice, highestPrice, lowestPrice, priceChangePercent } = data.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price History</CardTitle>
        <div className="flex gap-4 mt-2">
          <Badge variant="outline">
            Current: ${currentPrice.toFixed(2)}
          </Badge>
          {highestPrice && (
            <Badge variant="outline">
              High: ${highestPrice.toFixed(2)}
            </Badge>
          )}
          {lowestPrice && (
            <Badge variant="outline">
              Low: ${lowestPrice.toFixed(2)}
            </Badge>
          )}
          {priceChangePercent !== undefined && (
            <Badge variant={priceChangePercent >= 0 ? 'destructive' : 'default'}>
              {priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(1)}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              labelStyle={{ color: '#000' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              strokeWidth={2}
              name="Price"
              dot={{ r: 3 }}
            />
            {chartData.some((d) => d.originalPrice !== d.price) && (
              <Line
                type="monotone"
                dataKey="originalPrice"
                stroke="#82ca9d"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Original Price"
                dot={{ r: 3 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

