# ArtKnight

**A prototype for digital artwork protection and ownership verification.**

ArtKnight explores how digital artwork can be linked to ownership information and verified through a web-based platform.

Built as a team project for the Cardano Hackathon – IBM Edition, the application includes an artwork upload workflow, a dashboard, ownership-related verification features, and wallet connectivity through MetaMask.

The project uses Next.js and React, with API routes handling the application's backend workflows. It also explores blockchain-related integrations with Cardano and Polygon, although some of these operations are currently simulated rather than executed as verified on-chain transactions.

## Key Features

- Artwork upload and protection workflow
- Dashboard for viewing submitted artwork
- Ownership verification interface
- MetaMask wallet connection
- Experimental Cardano and Polygon integration workflows

## Technology Stack

- **Frontend:** Next.js, React.js
- **Backend:** Next.js API routes
- **Styling:** CSS, Tailwind CSS
- **Wallet connectivity:** MetaMask
- **Blockchain exploration:** Cardano and Polygon
- 
## Project Structure

ArtKnight/
├── components/
│   └── Layout.js
├── pages/
│   ├── api/
│   │   ├── cardano-anchor.js
│   │   ├── content.js
│   │   ├── hydra-channel.js
│   │   ├── midnight-proof.js
│   │   ├── polygon-mint.js
│   │   └── verify.js
│   ├── claim.js
│   ├── dashboard.js
│   ├── index.js
│   ├── protect.js
│   └── _app.js
├── styles/
│   └── globals.css
├── package.json
└── package-lock.json

## Project Background

Developed collaboratively as a prototype for the Cardano Hackathon – IBM Edition, where our team qualified for the hackathon stage.

