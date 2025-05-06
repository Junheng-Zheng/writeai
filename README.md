# WriteAI - Text Editor with AI Autocomplete

WriteAI is a modern text editor built with Next.js and Slate that features AI-powered text autocomplete.

## AI Autocomplete Feature

The editor now includes an AI-powered text autocomplete feature that suggests text completions as you type. This feature uses Groq's API with LLaMA 3 to generate contextually relevant suggestions.

### How to Use Autocomplete

1. Type in the editor and after you finish a sentence or pause typing, the AI will suggest a continuation
2. The suggestion appears in gray italic text
3. Press **Tab** to accept the suggestion
4. Press any other key to dismiss the suggestion
5. Toggle autocomplete on/off using the "Auto-complete" button in the toolbar

### Setting Up the API Key

To use the AI autocomplete functionality, you'll need a Groq API key:

1. Create an account at [Groq](https://console.groq.com)
2. Generate an API key in the Groq console
3. Create a `.env.local` file in the project root
4. Add your API key: `NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here`
5. Restart the development server

## Getting Started

```bash
# Install dependencies
npm install

# Set up your .env.local file with your Groq API key
echo "NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here" > .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000/writeai](http://localhost:3000/writeai) in your browser to use WriteAI.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
