import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@uiw/react-codemirror',
      '@codemirror/lang-java',
      '@codemirror/state',
      '@codemirror/view',
      '@codemirror/language',
    ],
  },
})
