import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, IndianRupee, RotateCcw, RefreshCw } from 'lucide-react';

interface CurrencyConverterProps {
  onCurrencyChange: (currency: 'USD' | 'INR') => void;
  currentCurrency: 'USD' | 'INR';
  onRateChange: (rate: number) => void;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ onCurrencyChange, currentCurrency, onRateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(83.5);
  const [isLoading, setIsLoading] = useState(false);

  const fetchExchangeRate = async () => {
    setIsLoading(true);
    try {
      // Using a free exchange rate API
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      const rate = data.rates.INR;
      setExchangeRate(rate);
      onRateChange(rate);
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      // Fallback to approximate rate if API fails
      setExchangeRate(83.5);
      onRateChange(83.5);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
    // Refresh rate every 5 minutes
    const interval = setInterval(fetchExchangeRate, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleCurrency = () => {
    const newCurrency = currentCurrency === 'USD' ? 'INR' : 'USD';
    onCurrencyChange(newCurrency);
  };

  return (
    <div className="relative">
      {/* Currency Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg hover:bg-white transition-all duration-300 text-slate-700 hover:text-slate-900"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {currentCurrency === 'USD' ? (
          <DollarSign className="w-4 h-4" />
        ) : (
          <IndianRupee className="w-4 h-4" />
        )}
        <span className="text-sm font-medium">{currentCurrency}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <RotateCcw className="w-3 h-3" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50"
          >
            <button
              onClick={() => {
                onCurrencyChange('USD');
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors ${
                currentCurrency === 'USD' ? 'bg-primary-50 text-primary-600' : 'text-slate-700'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <div>
                <div className="font-medium">US Dollar</div>
                <div className="text-xs text-slate-500">USD</div>
              </div>
            </button>
            
            <button
              onClick={() => {
                onCurrencyChange('INR');
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors ${
                currentCurrency === 'INR' ? 'bg-primary-50 text-primary-600' : 'text-slate-700'
              }`}
            >
              <IndianRupee className="w-4 h-4" />
              <div>
                <div className="font-medium">Indian Rupee</div>
                <div className="text-xs text-slate-500">INR</div>
              </div>
            </button>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrencyConverter;
