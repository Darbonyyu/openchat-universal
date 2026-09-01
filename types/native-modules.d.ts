declare module 'react-native-gesture-handler' {
  export const GestureHandlerRootView: React.ComponentType<{ children?: React.ReactNode; style?: object }>;
}

declare module 'lucide-react-native' {
  interface LucideProps { 
    color?: string; 
    size?: number;
    strokeWidth?: number;
    fill?: string;
  }
  export const ArrowLeft: React.ComponentType<LucideProps>;
  export const Bot: React.ComponentType<LucideProps>;
  export const Check: React.ComponentType<LucideProps>;
  export const ChevronRight: React.ComponentType<LucideProps>;
  export const Command: React.ComponentType<LucideProps>;
  export const LoaderCircle: React.ComponentType<LucideProps>;
  export const Plus: React.ComponentType<LucideProps>;
  export const Radio: React.ComponentType<LucideProps>;
  export const Settings2: React.ComponentType<LucideProps>;
  export const Sparkles: React.ComponentType<LucideProps>;
}