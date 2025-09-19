import { DollarSign, BarChart3, Database, Monitor, Cloud, MessageCircle } from 'lucide-react';

export const projects = [
  {
    id: 'enterprise-dashboard',
    title: 'Enterprise Banking Dashboard',
    description: 'Modernized legacy banking system with React + Next.js and Azure deployment',
    icon: DollarSign,
    tech: 'React, Next.js, Kendo React, Azure, Docker',
    highlights: ['Migrated 16+ legacy pages', 'Improved performance by 25%', 'OAuth 2.0 integration']
  },
  {
    id: 'ai-powered-analytics',
    title: 'AI-Powered Analytics Dashboard',
    description: 'ML-driven insights with predictive analytics and real-time AI recommendations',
    icon: BarChart3,
    tech: 'React, TensorFlow.js, WebGL, WebAssembly, Python API',
    highlights: ['ML model integration', 'Edge AI computing', 'Predictive insights']
  },
  {
    id: 'blockchain-fintech',
    title: 'Blockchain FinTech Platform',
    description: 'Decentralized finance platform with crypto wallets and smart contracts',
    icon: Database,
    tech: 'React, Web3.js, Ethereum, Solidity, MetaMask',
    highlights: ['Smart contract integration', 'Crypto wallet support', 'DeFi protocols']
  },
  {
    id: 'ar-vr-experience',
    title: 'AR/VR Data Visualization',
    description: '3D immersive data experiences using WebXR and Three.js',
    icon: Monitor,
    tech: 'React, Three.js, WebXR, A-Frame, WebGL',
    highlights: ['Immersive 3D interfaces', 'VR data exploration', 'Spatial computing']
  },
  {
    id: 'iot-dashboard',
    title: 'IoT Smart City Dashboard',
    description: 'Real-time monitoring of smart city infrastructure with edge computing',
    icon: Cloud,
    tech: 'React, MQTT, Edge Computing, 5G APIs, Digital Twins',
    highlights: ['Real-time IoT data', '5G integration', 'Edge processing']
  },
  {
    id: 'voice-ai-interface',
    title: 'Voice-Controlled AI Interface',
    description: 'Conversational UI with voice commands and natural language processing',
    icon: MessageCircle,
    tech: 'React, WebRTC, Speech API, LLM Integration, WebSockets',
    highlights: ['Voice recognition', 'AI conversations', 'Multimodal UX']
  }
];