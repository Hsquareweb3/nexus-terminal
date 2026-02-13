// Mock cryptocurrency data
const cryptoData = [
  { 
    symbol: 'BTC', 
    name: 'Bitcoin', 
    price: 43287.50, 
    change: 2.34, 
    volume: '28.4B',
    sparklineData: [42100, 42300, 42150, 42450, 42800, 43100, 43050, 43200, 43287],
    color: '#f7931a'
  },
  { 
    symbol: 'ETH', 
    name: 'Ethereum', 
    price: 2287.32, 
    change: 3.12, 
    volume: '12.8B',
    sparklineData: [2200, 2210, 2190, 2230, 2250, 2270, 2265, 2280, 2287],
    color: '#627eea'
  },
  { 
    symbol: 'SOL', 
    name: 'Solana', 
    price: 98.45, 
    change: -1.24, 
    volume: '1.9B',
    sparklineData: [101, 100.5, 100, 99.8, 99.2, 98.9, 98.5, 98.3, 98.45],
    color: '#14f195'
  },
  { 
    symbol: 'AVAX', 
    name: 'Avalanche', 
    price: 36.78, 
    change: 5.67, 
    volume: '892M',
    sparklineData: [34.5, 34.8, 35.2, 35.9, 36.1, 36.5, 36.3, 36.6, 36.78],
    color: '#e84142'
  },
  { 
    symbol: 'MATIC', 
    name: 'Polygon', 
    price: 0.8234, 
    change: -0.89, 
    volume: '654M',
    sparklineData: [0.835, 0.833, 0.829, 0.827, 0.825, 0.823, 0.821, 0.822, 0.8234],
    color: '#8247e5'
  },
  { 
    symbol: 'LINK', 
    name: 'Chainlink', 
    price: 14.52, 
    change: 1.87, 
    volume: '512M',
    sparklineData: [14.1, 14.2, 14.15, 14.3, 14.4, 14.45, 14.48, 14.51, 14.52],
    color: '#2a5ada'
  }
];

// Render Watchlist
function renderWatchlist() {
  const watchlistContainer = document.getElementById('watchlist');
  
  watchlistContainer.innerHTML = cryptoData.map(coin => {
    const changeClass = coin.change >= 0 ? 'text-green-400' : 'text-red-400';
    const changeIcon = coin.change >= 0 ? '↑' : '↓';
    
    return `
      <div class="sparkline-container p-4 rounded-xl bg-black/30 border border-gray-800/30 hover:border-gray-700/50 cursor-pointer transition-all group">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs" style="background: linear-gradient(135deg, ${coin.color}33, ${coin.color}66);">
              ${coin.symbol}
            </div>
            <div>
              <div class="font-semibold text-sm">${coin.symbol}</div>
              <div class="text-xs text-gray-500">${coin.name}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="font-bold font-mono crypto-price text-sm">$${coin.price.toLocaleString()}</div>
            <div class="text-xs ${changeClass} font-semibold flex items-center justify-end space-x-1">
              <span>${changeIcon}</span>
              <span>${Math.abs(coin.change)}%</span>
            </div>
          </div>
        </div>
        <canvas id="sparkline-${coin.symbol}" class="w-full h-12"></canvas>
        <div class="mt-2 text-xs text-gray-500 flex justify-between">
          <span>Vol: ${coin.volume}</span>
          <span>24h</span>
        </div>
      </div>
    `;
  }).join('');

  // Render sparklines
  cryptoData.forEach(coin => {
    renderSparkline(`sparkline-${coin.symbol}`, coin.sparklineData, coin.change >= 0, coin.color);
  });
}

// Render Sparkline
function renderSparkline(canvasId, data, isPositive, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i),
      datasets: [{
        data: data,
        borderColor: isPositive ? '#22c55e' : '#ef4444',
        backgroundColor: isPositive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  });
}

// Main Chart
function renderMainChart() {
  const ctx = document.getElementById('mainChart');
  
  // Generate candlestick-style data
  const labels = [];
  const data = [];
  let basePrice = 42000;
  
  for (let i = 0; i < 50; i++) {
    labels.push(i);
    const change = (Math.random() - 0.5) * 500;
    basePrice += change;
    data.push(basePrice);
  }
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'BTC/USDT',
        data: data,
        borderColor: '#3b82f6',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          return gradient;
        },
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#3b82f6',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(10, 10, 15, 0.95)',
          borderColor: '#3b82f6',
          borderWidth: 1,
          titleColor: '#e4e4e7',
          bodyColor: '#a1a1aa',
          padding: 12,
          displayColors: false,
          callbacks: {
            title: () => 'BTC/USDT',
            label: (context) => `$${context.parsed.y.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#71717a',
            font: { family: 'JetBrains Mono', size: 10 }
          }
        },
        y: {
          position: 'right',
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#71717a',
            font: { family: 'JetBrains Mono', size: 11 },
            callback: (value) => `$${value.toLocaleString()}`
          }
        }
      }
    }
  });
}

// Order Book
function renderOrderBook() {
  const askContainer = document.getElementById('askOrders');
  const bidContainer = document.getElementById('bidOrders');
  
  const basePrice = 43287.50;
  const asks = [];
  const bids = [];
  
  // Generate ask orders (sell orders - red)
  for (let i = 5; i > 0; i--) {
    const price = basePrice + (i * 10);
    const amount = (Math.random() * 2).toFixed(4);
    const total = (price * amount).toFixed(2);
    const depth = Math.random() * 100;
    asks.push({ price, amount, total, depth });
  }
  
  // Generate bid orders (buy orders - green)
  for (let i = 1; i <= 5; i++) {
    const price = basePrice - (i * 10);
    const amount = (Math.random() * 2).toFixed(4);
    const total = (price * amount).toFixed(2);
    const depth = Math.random() * 100;
    bids.push({ price, amount, total, depth });
  }
  
  askContainer.innerHTML = asks.map(order => `
    <div class="relative px-2 py-1.5 rounded hover:bg-white/5 transition-colors cursor-pointer group">
      <div class="depth-bar-ask absolute inset-0 rounded" style="width: ${order.depth}%;"></div>
      <div class="relative grid grid-cols-3 text-xs font-mono">
        <div class="text-red-400 font-semibold">${order.price.toFixed(2)}</div>
        <div class="text-right text-gray-300">${order.amount}</div>
        <div class="text-right text-gray-500">${Number(order.total).toLocaleString()}</div>
      </div>
    </div>
  `).join('');
  
  bidContainer.innerHTML = bids.map(order => `
    <div class="relative px-2 py-1.5 rounded hover:bg-white/5 transition-colors cursor-pointer group">
      <div class="depth-bar-bid absolute inset-0 rounded" style="width: ${order.depth}%;"></div>
      <div class="relative grid grid-cols-3 text-xs font-mono">
        <div class="text-green-400 font-semibold">${order.price.toFixed(2)}</div>
        <div class="text-right text-gray-300">${order.amount}</div>
        <div class="text-right text-gray-500">${Number(order.total).toLocaleString()}</div>
      </div>
    </div>
  `).join('');
}

// Recent Trades
function renderRecentTrades() {
  const container = document.getElementById('recentTrades');
  const basePrice = 43287.50;
  const trades = [];
  
  for (let i = 0; i < 20; i++) {
    const isBuy = Math.random() > 0.5;
    const price = basePrice + ((Math.random() - 0.5) * 100);
    const amount = (Math.random() * 0.5).toFixed(4);
    const time = new Date(Date.now() - i * 30000).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
    trades.push({ price, amount, time, isBuy });
  }
  
  container.innerHTML = trades.map((trade, index) => {
    const colorClass = trade.isBuy ? 'text-green-400' : 'text-red-400';
    return `
      <div class="px-2 py-1.5 rounded hover:bg-white/5 transition-all cursor-pointer" style="animation-delay: ${index * 50}ms;">
        <div class="grid grid-cols-3 text-xs font-mono">
          <div class="${colorClass} font-semibold">${trade.price.toFixed(2)}</div>
          <div class="text-right text-gray-300">${trade.amount}</div>
          <div class="text-right text-gray-500">${trade.time}</div>
        </div>
      </div>
    `;
  }).join('');
}

// Live price updates simulation
function simulatePriceUpdates() {
  setInterval(() => {
    const priceElement = document.getElementById('currentPrice');
    const changeElement = document.getElementById('priceChange');
    
    const currentPrice = parseFloat(priceElement.textContent.replace('$', '').replace(',', ''));
    const newPrice = currentPrice + ((Math.random() - 0.5) * 50);
    const change = ((newPrice - currentPrice) / currentPrice * 100).toFixed(2);
    
    priceElement.textContent = `$${newPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    priceElement.classList.add('price-update');
    
    if (change >= 0) {
      changeElement.textContent = `+${change}%`;
      changeElement.className = 'px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-sm font-semibold';
    } else {
      changeElement.textContent = `${change}%`;
      changeElement.className = 'px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-sm font-semibold';
    }
    
    setTimeout(() => priceElement.classList.remove('price-update'), 600);
    
    // Update recent trades
    renderRecentTrades();
  }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderWatchlist();
  renderMainChart();
  renderOrderBook();
  renderRecentTrades();
  simulatePriceUpdates();
  
  // Refresh order book periodically
  setInterval(renderOrderBook, 2000);
});