import { useState, Fragment as ReactFragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReviewCart } from '../step1/ReviewCart';
import { ShippingInfo, ShippingAddress } from '../step2/ShippingInfo';
import { PaymentMethod, PaymentMethodData } from '../step3/PaymentMethod';
import { Confirmation } from '../step4/Confirmation';
import { Card, CardContent } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Progress } from '@/shared/components/ui/Progress';
import { Container } from '@/shared/components/ui/Container';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { Heading1, Text } from '@/shared/components/ui/Typography';
import { ordersApi } from '@/core/api/adapters/orders.api';
import { useCart } from '@/core/query/queries/cart.queries';
import { routesConfig } from '@/config/app.config';
import { toast } from 'sonner';
import { Order } from '@/types/order.type';
import { CheckCircle2, ShoppingCart, Truck, CreditCard, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CheckoutStep = 1 | 2 | 3 | 4;

export function Checkout() {
  const navigate = useNavigate();
  const { data: cartData } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodData | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const steps = [
    { number: 1, title: 'Review Cart', icon: ShoppingCart },
    { number: 2, title: 'Shipping', icon: Truck },
    { number: 3, title: 'Payment', icon: CreditCard },
    { number: 4, title: 'Confirmation', icon: CheckCircle },
  ];

  const handleShippingNext = (address: ShippingAddress) => {
    setShippingAddress(address);
    setCurrentStep(3);
  };

  const handlePaymentNext = (method: PaymentMethodData) => {
    setPaymentMethod(method);
    setCurrentStep(4);
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress || !paymentMethod || !cartData?.success || !cartData.data) {
      toast.error('Please complete all steps');
      return;
    }

    setIsPlacingOrder(true);
    try {
      const response = await ordersApi.createOrder({
        shippingAddress,
        paymentMethod: {
          type: paymentMethod.type,
          last4: paymentMethod.last4,
          brand: paymentMethod.brand,
        },
      });

      if (response.success && response.data) {
        setOrder(response.data);
        toast.success('Order placed successfully!');
        // Cart is already cleared in the mock service
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as CheckoutStep);
    } else {
      navigate(routesConfig.cart);
    }
  };

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  if (!cartData?.success || !cartData.data || cartData.data.items.length === 0) {
    return (
      <Container className="py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <Text size="lg" muted className="mb-4">Your cart is empty</Text>
            <Button onClick={() => navigate(routesConfig.products.search)}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="lg" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Breadcrumbs
          items={[
            { label: 'Home', to: routesConfig.home },
            { label: 'Cart', to: routesConfig.cart },
            { label: 'Checkout' },
          ]}
          className="mb-6"
        />

        <Heading1 className="mb-8">Checkout</Heading1>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-4" />
          <Text size="sm" muted className="text-center">
            Step {currentStep} of {steps.length}
          </Text>
        </div>

      {/* Progress Steps */}
        <div className="mb-12 hidden md:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
              const isUpcoming = currentStep < step.number;

            return (
                <ReactFragment key={step.number}>
                  <motion.div
                    className="flex flex-col items-center flex-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className={`rounded-full p-3 border-2 transition-all duration-300 ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : isCurrent
                          ? 'bg-primary border-primary text-white shadow-lg'
                        : 'bg-background border-muted-foreground text-muted-foreground'
                    }`}
                      whileHover={!isUpcoming ? { scale: 1.1 } : {}}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                    </motion.div>
                    <Text
                      size="sm"
                      weight={isCurrent ? 'semibold' : 'normal'}
                      muted={!isCurrent && !isCompleted}
                      className="mt-3 text-center"
                  >
                    {step.title}
                    </Text>
                  </motion.div>
                {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-4 relative">
                      <motion.div
                        className={`absolute inset-0 ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-muted'
                    }`}
                        initial={{ width: 0 }}
                        animate={{ width: currentStep > step.number ? '100%' : '0%' }}
                        transition={{ duration: 0.3 }}
                  />
                    </div>
                )}
                </ReactFragment>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
        {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
          <ReviewCart onNext={() => setCurrentStep(2)} />
              </motion.div>
        )}

        {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
          <ShippingInfo
            onNext={handleShippingNext}
            onBack={handleBack}
          />
              </motion.div>
        )}

        {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
          <PaymentMethod
            onNext={handlePaymentNext}
            onBack={handleBack}
          />
              </motion.div>
        )}

        {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
          <Confirmation
            order={order || undefined}
            shippingAddress={shippingAddress || undefined}
            paymentMethod={paymentMethod || undefined}
            onPlaceOrder={order ? undefined : handlePlaceOrder}
            isLoading={isPlacingOrder}
          />
              </motion.div>
        )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </Container>
  );
}

