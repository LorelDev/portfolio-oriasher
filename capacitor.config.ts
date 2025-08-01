import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.dfddf46c211c4ab9aaf91ef5f0faefa5',
  appName: 'portfolio-oriasher',
  webDir: 'dist',
  server: {
    url: "https://dfddf46c-211c-4ab9-aaf9-1ef5f0faefa5.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    Device: {
      allowedOrientations: ['portrait', 'landscape']
    }
  }
};

export default config;