import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { Box } from 'lucide-react';

interface Product3DViewerProps {
  modelUrl?: string;
  productName: string;
}

export function Product3DViewer({ modelUrl }: Product3DViewerProps) {
  if (!modelUrl) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>3D View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Box className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">3D model not available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>3D View</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">3D viewer placeholder</p>
          {/* TODO: Implement Three.js viewer when needed */}
        </div>
      </CardContent>
    </Card>
  );
}

