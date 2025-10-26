import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart, CreditCard, Shield } from "lucide-react";

const Donation = () => {
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const { toast } = useToast();

  const presetAmounts = [10, 25, 50, 100, 250, 500];

  const handlePresetClick = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    
    if (finalAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please select or enter a donation amount",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.cardNumber) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thank you for your generosity!",
      description: `Your ${donationType} donation of $${finalAmount} has been processed successfully.`,
    });

    // Reset form
    setAmount(0);
    setCustomAmount("");
    setFormData({
      name: "",
      email: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-6">Make a Donation</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Your generous contribution helps us continue our mission of supporting communities in need.
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Donation Type */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-card-foreground">Donation Type</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setDonationType("one-time")}
                        className={`py-4 px-6 rounded-lg font-semibold transition-all ${
                          donationType === "one-time"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        One-Time Donation
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationType("monthly")}
                        className={`py-4 px-6 rounded-lg font-semibold transition-all ${
                          donationType === "monthly"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        Monthly Donation
                      </button>
                    </div>
                  </div>

                  {/* Donation Amount */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-card-foreground">Select Amount</h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                      {presetAmounts.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handlePresetClick(value)}
                          className={`py-4 px-4 rounded-lg font-semibold transition-all ${
                            amount === value && !customAmount
                              ? "bg-accent text-accent-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          ${value}
                        </button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount(0);
                      }}
                      className="text-lg"
                    />
                  </div>

                  {/* Donor Information */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-card-foreground">Your Information</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-card-foreground flex items-center">
                      <CreditCard className="w-6 h-6 mr-2" />
                      Payment Details
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-foreground">
                          Card Number *
                        </label>
                        <Input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-foreground">
                            Expiry Date *
                          </label>
                          <Input
                            type="text"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-foreground">
                            CVV *
                          </label>
                          <Input
                            type="text"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Note */}
                  <div className="bg-secondary p-4 rounded-lg flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm text-muted-foreground">
                      Your payment information is secure and encrypted. We never store your complete card details.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-6"
                  >
                    Complete Donation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Your Impact</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-accent mb-2">$50</div>
                  <p className="text-muted-foreground">Provides meals for a family for a week</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-accent mb-2">$100</div>
                  <p className="text-muted-foreground">Supplies school materials for 10 children</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-accent mb-2">$250</div>
                  <p className="text-muted-foreground">Supports healthcare for a family in need</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donation;
