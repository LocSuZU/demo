const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "hsl(var(--background))",
          backgroundfull: "#FFF",
        },
          
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primar  y))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        slate: {
          300: '#D1D5DB',
          100: '#E7E7E7',
        },
        Blue: {
          50 : '#F4F7FD',
        },
        rotate: {
          '24' : '24.47deg',
        }
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
        '10': '20px',
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        'openSans': ['Open Sans', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      width: {
        "Device-breakpoint-Desktop" : '1440px',
        "Content-breakpoint-Desktop" : '574px',
        "92" : "92px", 
        "15" : "40px",
      },
      height : {
        "92" : "92px",
        "434" : "434px",
        "80" : "80px",
        "120" : "120px",
      },
      minWidth: {
        "Desktop" : '1440px',
      },  
      maxWidth: {
        "1920" : '1920px',
        "Content-breakpoint-Desktop" : '574px',
      },
      fontSize: {
        "15": "15px",
        "29" : "29px",
        "12" : "12px",
        "37" : "37px",
      },
      lineHeight: {
        '37.7': '37.7px',
        '22.5' : '22.5px',
        '48.1' : '48,1px',
        '18' : '18px',
        '24' : '24px',
      },
      borderRadius:{
        "avatar-radius" : "23px 9px"
      },
      padding: {
        '15': '40px',
      },
      gap: {
        '15': '40px',
        '6' : '10px'
      },
      backgroundImage: {
        'placeholder': 'url("/images/icons/placeholder-image.png")',
      },
      backgroundColor: {
        'fallback': '#FAFAFA',
        'Transparent-White-30': 'rgba(255, 255, 255, 0.30)',
      },
      border: {
        'borderslate' : "var(--Slate-300,#D1D5DB)"
      },
      fill: {
        union: {
          DEFAULT: '#FF001B',
          'first': '#EB3044',
          'secound' : '#EB3044',
        },
      },
      stroke: {
        'base-white' :  '#FFF',
      }

    },
  },
  
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
}
