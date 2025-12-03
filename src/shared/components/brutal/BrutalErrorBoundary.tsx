import { Component, ErrorInfo, ReactNode } from 'react';
import { BrutalButton } from './BrutalButton';
import { BrutalCard } from './BrutalCard';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class BrutalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-neon-green flex items-center justify-center p-4 font-mono">
          <BrutalCard className="max-w-2xl w-full bg-black border-neon-green shadow-[8px_8px_0px_0px_#CCFF00]">
            <div className="border-b-4 border-neon-green pb-4 mb-6 flex items-center gap-4">
              <AlertTriangle className="w-12 h-12 text-neon-pink animate-pulse" />
              <h1 className="font-heading text-4xl uppercase text-white">System Failure</h1>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-900 p-4 border-2 border-neon-green/50 overflow-auto max-h-64">
                <p className="text-neon-pink font-bold mb-2">/// ERROR_LOG_DUMP</p>
                <code className="text-sm break-all">
                  {this.state.error?.toString()}
                </code>
                <p className="mt-4 text-gray-500">
                  at {new Date().toISOString()}
                </p>
              </div>

              <p className="text-xl">
                A critical system error has occurred. The nanobots are confused.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <BrutalButton 
                  onClick={() => window.location.reload()}
                  className="bg-neon-green text-black hover:bg-white hover:text-black border-neon-green"
                >
                  <RefreshCw className="w-5 h-5 mr-2" /> Reboot System
                </BrutalButton>
                
                <BrutalButton 
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                  className="text-white border-white hover:bg-white hover:text-black"
                >
                  <Home className="w-5 h-5 mr-2" /> Return to Base
                </BrutalButton>
              </div>
            </div>
          </BrutalCard>
        </div>
      );
    }

    return this.props.children;
  }
}
