/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			transparent: 'transparent',
  			black: '#000',
  			white: '#fff',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			secondary: {
  				'50': '#E9F1F5',
  				'100': '#D5E5ED',
  				'200': '#9DBDD1',
  				'300': '#6E99B8',
  				'400': '#265180',
  				'500': '#001E4A',
  				'600': '#001942',
  				'700': '#001438',
  				'800': '#000E2B',
  				'900': '#000921',
  				'950': '#000514',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			gray: {
  				'50': '#FFFFFF',
  				'100': '#FFFFFF',
  				'200': '#FAFCFC',
  				'300': '#F7F9FA',
  				'400': '#F2F5F7',
  				'500': '#eaedf1',
  				'600': '#BFCBDB',
  				'700': '#8497B5',
  				'800': '#546A91',
  				'900': '#30446E',
  				'950': '#142347',
  				DEFAULT: 'hsl(var(--gray))',
  				foreground: 'hsl(var(--gray-foreground))'
  			},
  			primary: {
  				'50': '#E9F1F5',
  				'100': '#D5E5ED',
  				'200': '#9DBDD1',
  				'300': '#6E99B8',
  				'400': '#265180',
  				'500': '#001E4A',
  				'600': '#001942',
  				'700': '#001438',
  				'800': '#000E2B',
  				'900': '#000921',
  				'950': '#000514',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
