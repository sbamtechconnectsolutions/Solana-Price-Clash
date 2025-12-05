# ⚡ Solana Price Clash

> **Predict SOL price movements in 10 seconds and compete on the global leaderboard!**

A fast-paced, mobile-first prediction game built on Solana for the [Indie.fun Hackathon](https://indie.fun).

![Solana Price Clash](./public/og-image.png)

## 🎮 How It Works

1. **Predict** - Choose if SOL price will go UP ⬆️ or DOWN ⬇️
2. **Wait** - Watch the 10-second countdown as live prices stream
3. **Win** - Earn points if you predicted correctly!
4. **Streak** - Build winning streaks for up to 5x multipliers!

## 🚀 Features

- **🔴 Live Price Feed** - Real-time SOL/USD prices via Binance WebSocket
- **⚡ 10-Second Rounds** - Fast-paced gameplay perfect for mobile
- **🔥 Streak Multipliers** - Win streaks increase your points (up to 5x!)
- **🏆 Leaderboard** - Compete globally with other players
- **👛 Wallet Integration** - Connect Phantom, Solflare, and more
- **📱 Mobile First** - Optimized for touch with large buttons
- **🎵 Sound & Haptics** - Immersive feedback on actions
- **🎉 Confetti Celebration** - Celebrate your wins!
- **📤 Twitter Sharing** - Share your victories with one tap
- **💾 Persistent Stats** - Your progress saves automatically

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js
- **Wallet**: Solana Wallet Adapter
- **State**: Zustand
- **Animation**: Framer Motion
- **Price Feed**: Binance WebSocket API

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/solana-price-clash.git

# Navigate to project
cd solana-price-clash

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your Helius API key (optional, for enhanced RPC)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Environment Variables

Create a `.env.local` file:

```bash
# Optional: Helius RPC for better Solana connection
NEXT_PUBLIC_HELIUS_API_KEY=your_helius_api_key_here
NEXT_PUBLIC_HELIUS_RPC_URL=https://mainnet.helius-rpc.com/?api-key=your_key
```

## 📱 Mobile Experience

Solana Price Clash is designed mobile-first:

- Large, touch-friendly UP/DOWN buttons
- Haptic feedback on actions (on supported devices)
- PWA support - install to home screen
- Optimized for portrait orientation
- Smooth 60fps animations

## 🎯 Game Mechanics

### Scoring System

| Streak | Multiplier | Points per Win |
|--------|------------|----------------|
| 0-2    | 1x         | 100           |
| 3-4    | 2x         | 200           |
| 5-6    | 3x         | 300           |
| 7-9    | 4x         | 400           |
| 10+    | 5x         | 500           |

### Round Duration

Each round lasts **10 seconds**:
- Price locks when you place your bet
- Live price updates every 500ms
- Final result compared at round end

## 🔗 Solana Integration

- **Wallet Connection**: Multi-wallet support (Phantom, Solflare, Coinbase, Ledger)
- **RPC**: Helius or public Solana endpoints
- **Future**: On-chain leaderboard, token rewards

## 📈 Roadmap

- [x] Core prediction game
- [x] Live price feed
- [x] Streak multipliers
- [x] Local leaderboard
- [x] Wallet connection
- [ ] On-chain score storage
- [ ] Token rewards (SPL)
- [ ] Daily challenges
- [ ] Tournament mode
- [ ] NFT badges

## 🏗️ Project Structure

```
solana-price-clash/
├── src/
│   ├── app/             # Next.js app router
│   ├── components/      # React components
│   │   ├── BettingButtons.tsx
│   │   ├── GameContainer.tsx
│   │   ├── GameResult.tsx
│   │   ├── GameTimer.tsx
│   │   ├── Header.tsx
│   │   ├── IntroScreen.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── PriceDisplay.tsx
│   │   └── StatsPanel.tsx
│   ├── hooks/           # Custom hooks
│   │   ├── useSolanaPrice.ts
│   │   └── useSound.ts
│   ├── providers/       # Context providers
│   │   └── WalletProvider.tsx
│   └── store/           # Zustand store
│       └── gameStore.ts
├── public/              # Static assets
└── ...config files
```

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 🙏 Acknowledgments

- [Indie.fun](https://indie.fun) - Hackathon hosts
- [Solana](https://solana.com) - Blockchain infrastructure
- [Helius](https://helius.dev) - RPC services
- [Binance](https://binance.com) - Price data

---

Built with ⚡ for the **Indie.fun Hackathon**

[Play Now](https://your-deployed-url.vercel.app) | [Twitter](https://twitter.com/yourhandle) | [Indie.fun Project](https://indie.fun/project/xxx)
