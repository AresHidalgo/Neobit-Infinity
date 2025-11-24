import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Label } from '@/shared/components/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/Radio';
import { CreditCard, Wallet } from 'lucide-react';

interface PaymentMethodProps {
  onNext?: (paymentMethod: PaymentMethodData) => void;
  onBack?: () => void;
}

export interface PaymentMethodData {
  type: string;
  last4?: string;
  brand?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
}

export function PaymentMethod({ onNext, onBack }: PaymentMethodProps) {
  const [paymentType, setPaymentType] = useState('credit_card');
  const [formData, setFormData] = useState<PaymentMethodData>({
    type: 'credit_card',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext) {
      onNext({ ...formData, type: paymentType });
    }
  };

  const updateField = (field: keyof PaymentMethodData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <RadioGroup value={paymentType} onValueChange={setPaymentType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="credit_card" id="credit_card" />
              <Label htmlFor="credit_card" className="cursor-pointer flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Credit Card
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="cursor-pointer flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                PayPal
              </Label>
            </div>
          </RadioGroup>

          {paymentType === 'credit_card' && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={formData.cardNumber || ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                    updateField('cardNumber', value);
                    if (value.length >= 4) {
                      updateField('last4', value.slice(-4));
                      // Detect brand
                      if (value.startsWith('4')) {
                        updateField('brand', 'visa');
                      } else if (value.startsWith('5')) {
                        updateField('brand', 'mastercard');
                      } else if (value.startsWith('3')) {
                        updateField('brand', 'amex');
                      }
                    }
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>

              <div>
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  value={formData.cardholderName || ''}
                  onChange={(e) => updateField('cardholderName', e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={formData.expiryDate || ''}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
                      }
                      updateField('expiryDate', value);
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="password"
                    value={formData.cvv || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      updateField('cvv', value);
                    }}
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {paymentType === 'paypal' && (
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                You will be redirected to PayPal to complete your payment.
              </p>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            {onBack && (
              <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                Back
              </Button>
            )}
            <Button type="submit" className="flex-1">
              Continue to Review
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

