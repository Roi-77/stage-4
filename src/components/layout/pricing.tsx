import Button from '../ui/button'
import { toast } from 'react-hot-toast'

interface Plan {
  name: string;
  price: string;
  priceMonthly: string;
  features: string[];
  cta: string;
  popular: boolean;
}

const toastStyle = {
  borderRadius: '16px',
  background: '#fff',
  color: '#1e293b',
  border: '1px solid #e0e7ff',
  fontWeight: '500' as const, // Fixes TS typing for fontWeight
};

const Pricing = () => {
  const plans: Plan[] = [
    { name: 'Starter', price: '$0', priceMonthly: 'Free forever', features: ['Up to 50 tasks', 'Basic search', 'Local storage'], cta: 'Current Plan', popular: false },
    { name: 'Pro', price: '$20', priceMonthly: '/month', features: ['Unlimited tasks', 'Advanced filters', 'Priority support', 'Export data'], cta: 'Get Pro', popular: true },
    { name: 'Team', price: '$29', priceMonthly: '/month', features: ['Everything in Pro', 'Team collaboration', 'Custom categories', 'Analytics'], cta: 'Contact Sales', popular: false }
  ];

  const handleSubscription = (plan: Plan) => {
    if (plan.cta === 'Current Plan') {
      toast('You are already on this plan!', { icon: 'ℹ️', style: toastStyle });
      return;
    }
    toast.success(`Redirecting to ${plan.name} checkout...`, { style: toastStyle });
  };

  return (
    <section id="pricing" className='p-6 mt-4 w-full'>
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="text-center space-y-2 mb-20">
          <h2 className="inline-block pb-1 px-1 py-2 leading-relaxed text-4xl lg:text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Better & Affordable Pricing
          </h2>
          <p className="text-xl lg:text-2xl text-slate-700 ">
            Start free. Upgrade to enjoy better services.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`
                flex flex-col overflow-hidden rounded-[32px] border-2 bg-white shadow-2xl transition-all duration-500 hover:-translate-y-2
                ${plan.popular ? 'border-indigo-500 ring-4 ring-indigo-500/10 scale-105 z-10' : 'border-slate-100'}
              `}
            >
              {/* --- 🎨 TOP EFFECT (HEADER) --- */}
              <div className={`
                p-8 text-center
                ${plan.popular ? 'bg-gradient-to-br from-indigo-600 to-purple-700' : 'bg-slate-200 border-b border-slate-200'}
              `}>
                <h3 className={`text-2xl font-black ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                {plan.popular && (
                  <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
              </div>

              {/* --- 📝 CARD BODY --- */}
              <div className="p-8 lg:p-10 flex-1 flex flex-col">
                <div className="mb-8 text-center">
                  <div className="text-4xl lg:text-5xl font-black text-slate-900">
                    {plan.price}
                  </div>
                  <p className="text-slate-500 text-lg">{plan.priceMonthly}</p>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <span className="text-green-500 font-bold">✓</span>
                      <span className="text-sm lg:text-base font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  size="lg" 
                  className="w-full font-bold py-6 text-lg transition-all duration-300"
                  variant={plan.popular ? 'primary' : 'secondary'}
                  onClick={() => handleSubscription(plan)}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
