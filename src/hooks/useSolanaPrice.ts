import { useState, useEffect, useCallback, useRef } from 'react';

interface PriceData {
  price: number;
  confidence: number;
  timestamp: number;
  change24h: number;
}

export function useSolanaPrice() {
  const [priceData, setPriceData] = useState<PriceData>({
    price: 0,
    confidence: 0,
    timestamp: Date.now(),
    change24h: 0,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const consecutiveFailures = useRef(0);

  // Fetch from our server-side API route (bypasses CORS/network issues)
  const fetchPrice = useCallback(async () => {
    try {
      const response = await fetch('/api/price');
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Price API error');
      }
      
      setPriceData({
        price: data.price,
        confidence: 0,
        timestamp: data.timestamp || Date.now(),
        change24h: data.change24h,
      });
      setIsConnected(true);
      setError(null);
      consecutiveFailures.current = 0;
      console.log(`✅ Price: $${data.price.toFixed(2)} (${data.source})`);
    } catch (e) {
      consecutiveFailures.current++;
      console.warn('Price fetch failed:', e);
      
      // Only show error and disconnect after 3 consecutive failures
      if (consecutiveFailures.current >= 3) {
        setError('Failed to fetch price');
        setIsConnected(false);
      }
    }
  }, []);

  // Start polling
  useEffect(() => {
    console.log('📊 Starting price feed...');
    
    // Immediate fetch
    fetchPrice();
    
    // Poll every 1.5 seconds for responsive updates
    pollingIntervalRef.current = setInterval(fetchPrice, 1500);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [fetchPrice]);

  return {
    ...priceData,
    isConnected,
    error,
    reconnect: fetchPrice,
  };
}

// Simulated price for demo/testing (with realistic movement)
export function useSimulatedPrice(basePrice: number = 245.50) {
  const [price, setPrice] = useState(basePrice);
  const [priceHistory, setPriceHistory] = useState<number[]>([basePrice]);

  useEffect(() => {
    // Update base price when live price changes significantly
    if (basePrice > 0 && Math.abs(basePrice - price) > 10) {
      setPrice(basePrice);
      setPriceHistory([basePrice]);
    }
  }, [basePrice, price]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prev) => {
        // Realistic price movement: small random walk with momentum
        const momentum = (Math.random() - 0.5) * 0.3;
        const volatility = (Math.random() - 0.5) * 0.2;
        const newPrice = Math.max(1, prev + momentum + volatility);
        
        setPriceHistory((history) => [...history.slice(-60), newPrice]);
        
        return newPrice;
      });
    }, 500); // Update every 500ms for smooth animation

    return () => clearInterval(interval);
  }, []);

  return { price, priceHistory };
}
