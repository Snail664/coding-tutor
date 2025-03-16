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
        
        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8">
          {/* Basic Plan */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col w-full md:w-80">
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Free</h3>
              <div className="flex items-baseline mb-4"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
              Free requests out of the box, no credit card required.
              <br/>
              <br/>
              Perfect for beginners and students.
              </p>
            </div>
            <div className="p-8 flex-grow">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Unlimited Code Execution</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">20 Hints per day</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">20 messages with Codey Chat per day</span>
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
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border-2 border-primary flex flex-col transform scale-105 z-10 w-full md:w-80">
            <div className="bg-primary font-bold dark:bg-white text-white dark:text-black text-center py-2 text-sm font-medium">
              BEST PLAN FOR VALUE
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
                  <span className="text-gray-600 dark:text-gray-300">Unlimited Code Execution</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Unlimited Hints</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Unlimited access to Codey Chat</span>
                </li>
              </ul>
            </div>
            <div className="p-8 border-t border-gray-200 dark:border-gray-700">
              <a
                href="/api/auth/login"
                className="block w-full py-3 px-4 rounded-lg text-center font-medium bg-primary text-white dark:text-black hover:bg-primary/90 transition-colors"
              >
                Coming Soon
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