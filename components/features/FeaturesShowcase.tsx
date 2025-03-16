"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function FeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  // Set 'hints' as the default active feature when component mounts
  useEffect(() => {
    setActiveFeature('hints');
  }, []);
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12">
          Features
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Feature Tabs */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {/* Feature 1 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div 
                className="bg-white dark:bg-gray-800 p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setActiveFeature('hints')}
              >
                <div>
                  <h3 className="font-bold text-lg text-primary">Automatic Hints</h3>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
              {activeFeature === 'hints' && (
                <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Our automatic hints system provides just-in-time guidance when you're stuck on a problem.
                  </p>
                </div>
              )}
            </div>
            
            {/* Feature 2 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div 
                className="bg-white dark:bg-gray-800 p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setActiveFeature('chat')}
              >
                <div>
                  <h3 className="font-bold text-lg text-primary">Ask questions freely with Codey Chat</h3>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
              {activeFeature === 'chat' && (
                <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Our chat module aims to help with queries that go beyond next-step hints such as syntax help or reviewing a programming concept.
                  </p>
                </div>
              )}
            </div>
            
            {/* Feature 3 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div 
                className="bg-white dark:bg-gray-800 p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setActiveFeature('feedback')}
              >
                <div>
                  <h3 className="font-bold text-lg text-primary">Proactive Feedback</h3>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
              {activeFeature === 'feedback' && (
                <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Our proactive feedback aims to automatically detect and offer help if you're struggling and reinforce concepts when you get something right.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Dynamic Image based on selected feature */}
          <div className="w-full lg:w-2/3">
            {activeFeature && (
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl hover:scale-105">
                <div className="relative w-full h-[400px]">
                  <Image 
                    src={
                      activeFeature === 'hints' 
                        ? "/assets/hint.png" 
                        : activeFeature === 'chat' 
                          ? "/assets/freechat.png" 
                          : "/assets/feedback.png"
                    } 
                    alt={
                      activeFeature === 'hints' 
                        ? "Codey AI providing hints" 
                        : activeFeature === 'chat' 
                          ? "Codey AI free chat interface" 
                          : "Codey AI providing feedback on code"
                    } 
                    fill 
                    style={{ objectFit: 'contain' }}
                    className="p-2"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 