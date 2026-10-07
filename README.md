# Gitvisha Futuristic V2

A fresh redesign of the Gitvisha insurance website using:
- Tailwind CSS v4 utilities instead of a large hand-written CSS file
- Motion for React for reveal, hover, floating and layout-style animations
- Lucide icons
- The existing Web3Forms enquiry flow
- The existing Gitvisha footer logo asset

## Run

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Existing-project migration

The safest approach is to keep the current Gitvisha project untouched as the working/production backup and test this V2 separately first.

Copy this V2 project into a separate folder, run `npm install`, then `npm run dev`.

The included `src/App.tsx` contains the website and chatbot. `src/index.css` only contains Tailwind import + global/base rules.

The chatbot uses the existing Web3Forms access key already used by the current Gitvisha form.

## Production build

```bash
npm run build
```
