import localFont from 'next/font/local'

export const iranYekan = localFont({
    src: [
        {
            path: './IRANYekanXFaNum-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './IRANYekanXFaNum-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './IRANYekanXFaNum-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-iran-yekan',
    display: 'swap',
    fallback: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
})
