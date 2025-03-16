"use client";

import { Check } from "lucide-react";

export default function PricingSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Start with our flexible plans and scale as you grow. Choose the plan that fits your needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Free</h3>
              <div className="flex items-baseline mb-4"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
              Free requests out of the box, no credit card required. Perfect for beginners and students.
              </p>
            </div>
            <div className="p-8 flex-grow">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Full Access to Codey for 5 questions per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">50 messages per day for Codey Chat access</span>
                </li>
              </ul>
            </div>
            <div className="p-8 border-t border-gray-200 dark:border-gray-700">
              <a
                href="/api/auth/login"
                className="block w-full py-3 px-4 rounded-lg text-center font-medium bg-gray-100 dark:bg-gray-800 text-primary hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
          
          {/* Pro Plan - Highlighted */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border-2 border-primary flex flex-col transform scale-105 z-10">
            <div className="bg-primary text-white text-center py-2 text-sm font-medium">
              MOST POPULAR
            </div>
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Pro</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-extrabold text-primary">$10</span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                For serious learners and professionals
              </p>
            </div>
            <div className="p-8 flex-grow">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Full Access to Codey</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Unlimited access to Codey Chat</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Automatic hint system included</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Proactive feedback on code</span>
                </li>
              </ul>
            </div>
            <div className="p-8 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                Try the Experimental features first!
                </p>
              <a
                href="/api/auth/login"
                className="block w-full py-3 px-4 rounded-lg text-center font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Get Started Now
              </a>
            </div>
          </div>
          
          {/* Enterprise Plan */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Enterprise</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-gray-500 dark:text-gray-400">Contact us for tailored pricing!</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                For teams and organizations
              </p>
            </div>
            <div className="p-8 flex-grow">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Everything in Pro plan</span>
                </li>
                {/* <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Custom problem sets</span>
                </li> */}
                {/* <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">API access</span>
                </li> */}
              </ul>
            </div>
            <div className="p-8 border-t border-gray-200 dark:border-gray-700">
              <a
                href="/api/auth/login"
                className="block w-full py-3 px-4 rounded-lg text-center font-medium bg-gray-100 dark:bg-gray-800 text-primary hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
        
        {/* Custom Plan */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Need a custom plan? <a href="#" className="text-primary font-medium">Contact us</a> for volume pricing and custom requirements.
          </p>
        </div>
      </div>
    </section>
  );
} 