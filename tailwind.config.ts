
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				playfair: ["Playfair Display", "serif"],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// --- Gold luxury remap: all cool accents become gold tones ---
				blue: { '50': '#fdf8e7', '100': '#fbf0c8', '200': '#f6df8f', '300': '#eecb5c', '400': '#e0b23c', '500': '#c9982a', '600': '#a87c1f', '700': '#835f18', '800': '#5f4512', '900': '#43310d' },
				indigo: { '50': '#fdf8e7', '100': '#fbf0c8', '200': '#f6df8f', '300': '#eecb5c', '400': '#e6bc44', '500': '#d4a017', '600': '#b8860b', '700': '#8f6809', '800': '#654613', '900': '#43310d' },
				purple: { '50': '#fdf9ec', '100': '#faf0cf', '200': '#f4e0a0', '300': '#edc96a', '400': '#e6b845', '500': '#d4a017', '600': '#b8860b', '700': '#96690a', '800': '#7a5510', '900': '#654613' },
				violet: { '50': '#fdf9ec', '100': '#faf0cf', '200': '#f4e0a0', '300': '#edc96a', '400': '#e6b845', '500': '#d4a017', '600': '#b8860b', '700': '#96690a', '800': '#7a5510', '900': '#654613' },
				pink: { '50': '#fefaee', '100': '#fdf3d4', '200': '#f9e7ab', '300': '#f3d67e', '400': '#eec55a', '500': '#e0b23c', '600': '#c9982a', '700': '#a87c1f', '800': '#835f18', '900': '#5f4512' },
				fuchsia: { '50': '#fefaee', '100': '#fdf3d4', '200': '#f9e7ab', '300': '#f3d67e', '400': '#eec55a', '500': '#e0b23c', '600': '#c9982a', '700': '#a87c1f', '800': '#835f18', '900': '#5f4512' },
				cyan: { '50': '#fdf9ec', '100': '#faf0cf', '200': '#f4e0a0', '300': '#edc96a', '400': '#e6b845', '500': '#d4a017', '600': '#b8860b', '700': '#96690a', '800': '#7a5510', '900': '#654613' },
				sky: { '50': '#fdf8e7', '100': '#fbf0c8', '200': '#f6df8f', '300': '#eecb5c', '400': '#e0b23c', '500': '#c9982a', '600': '#a87c1f', '700': '#835f18', '800': '#5f4512', '900': '#43310d' },
				amber: { '50': '#fefaee', '100': '#fdf3d4', '200': '#f9e7ab', '300': '#f3d67e', '400': '#eec55a', '500': '#e0b23c', '600': '#c9982a', '700': '#a87c1f', '800': '#835f18', '900': '#5f4512' },
				yellow: { '50': '#fefaee', '100': '#fdf3d4', '200': '#f9e7ab', '300': '#f3d67e', '400': '#f0d36a', '500': '#e6c04a', '600': '#d4a017', '700': '#b8860b', '800': '#8f6809', '900': '#654613' },
				musetherapy: {
					'50': '#fdf9ec', '100': '#faf0cf', '200': '#f4e0a0', '300': '#edc96a', '400': '#e6b845',
					'500': '#d4a017', '600': '#b8860b', '700': '#96690a', '800': '#7a5510', '900': '#654613',
				},
				healing: {
					'50': '#fdf9ec', '100': '#faf0cf', '200': '#f4e0a0', '300': '#edc96a', '400': '#e6b845',
					'500': '#d4a017', '600': '#b8860b', '700': '#96690a', '800': '#7a5510', '900': '#654613',
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'therapy-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'healing-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
				'ocean-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(240, 100%, 74%, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(280, 100%, 70%, 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(200, 100%, 70%, 0.1) 0px, transparent 50%)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-down': {
					'0%': { opacity: '0', transform: 'translateY(-20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-20px) rotate(5deg)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(212, 160, 23, 0.4)' },
					'50%': { boxShadow: '0 0 40px rgba(212, 160, 23, 0.8)' }
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'shine': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'border-glow': {
					'0%, 100%': { borderColor: 'rgba(212, 160, 23, 0.5)' },
					'50%': { borderColor: 'rgba(230, 184, 69, 0.8)' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'scroll-down': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'75%': { opacity: '0', transform: 'translateY(10px)' },
					'80%': { opacity: '0', transform: 'translateY(-10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'blob': {
					'0%': { transform: 'translate(0px, 0px) scale(1)' },
					'33%': { transform: 'translate(30px, -50px) scale(1.1)' },
					'66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
					'100%': { transform: 'translate(0px, 0px) scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
				'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.5s ease-out forwards',
				'float': 'float 3s ease-in-out infinite',
				'float-slow': 'float-slow 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'gradient-shift': 'gradient-shift 3s ease infinite',
				'shine': 'shine 2s ease-in-out infinite',
				'border-glow': 'border-glow 2s ease-in-out infinite',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
				'scroll-down': 'scroll-down 2s ease-in-out infinite',
				'spin-slow': 'spin-slow 20s linear infinite',
				'blob': 'blob 7s infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
