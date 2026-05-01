import Button from '../ui/button'
import { toast } from 'react-hot-toast'

const Pricing = () => {

    interface Plan {
  name: string;
  price: string;
  priceMonthly: string;
  features: string[];
  cta: string;
  popular: boolean;
}

  const plans = [
    {
      name: 'Starter',
      price: '$0',
      priceMonthly: 'Free forever',
      features: ['✅ Up to 50 tasks', '✅ Basic search', '✅ Local storage'],
      cta: 'Current Plan',
      popular: false
    },
    {
      name: 'Pro',
      price: '$9',
      priceMonthly: '/month',
      features: ['✅ Unlimited tasks', '✅ Advanced filters', '✅ Priority support', '✅ Export data'],
      cta: 'Get Pro',
      popular: true
    },
    {
      name: 'Team',
      price: '$29',
      priceMonthly: '/month',
      features: ['✅ Everything in Pro', '✅ Team collaboration', '✅ Custom categories', '✅ Analytics'],
      cta: 'Contact Sales',
      popular: false
    }
  ];

    const toastStyle = {
    borderRadius: '16px',
    background: '#fff',
    color: '#1e293b',
    border: '1px solid #e0e7ff',
    fontWeight: '500',
  };

  const handleSubscription = (plan: Plan) => {
    if (plan.cta === 'Current Plan') {
      toast('You are already on this plan!', {
        icon: 'ℹ️',
        style: toastStyle,
      });
      return;
    }

    if (plan.name === 'Team') {
      toast.success('Redirecting to sales team...', {
        style: toastStyle,
        iconTheme: { primary: '#6366f1', secondary: '#fff' }
      });
    } else {
      toast.success(`Upgrading to ${plan.name}...`, {
        style: toastStyle,
        iconTheme: { primary: '#8b5cf6', secondary: '#fff' }
      });
    }
  };
  

  
  return (
    <section id="pricing" className='p-6 mt-4 w-full'>
      <div className="max-w-6xl glass p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/50 shadow-lg">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl lg:text-2xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Start free. Upgrade when you're ready to scale.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`
                glass p-8 lg:p-10 rounded-3xl border-2 shadow-2xl hover:shadow-3xl transition-all duration-500
                group hover:-translate-y-2 hover:scale-[1.02]
                ${plan.popular ? 'ring-4 ring-indigo-500/20 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-300 relative' : 'border-white/50'}
                ${index === 1 ? 'order-last md:order-none lg:-mt-12' : ''}
              `}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-2xl font-bold text-sm shadow-xl">
                  Most Popular
                </div>
              )}
              
              {/* Plan Name */}
              <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4">{plan.name}</h3>
              
              {/* Price */}
              <div className="mb-8">
                <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {plan.price}
                </div>
                <p className="text-slate-600 text-lg">{plan.priceMonthly}</p>
              </div>
              
              {/* Features */}
              <ul className="space-y-3 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="text-green-500 font-bold text-lg mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-sm lg:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA */}
              <Button 
                size="lg" 
                className="w-full font-bold py-6 text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
                variant={plan.popular ? 'primary' : 'secondary'}
                onClick={() => handleSubscription(plan)}
              >
                {plan.cta}
              </Button>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;