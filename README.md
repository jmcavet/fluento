# Jean-Marie Cavet - FluentO

A Progressive Web Application (PWA) for learning foreign languages in context

## Features

- Responsive design for mobile and desktop
- Create multiple projects associated with a learning and mother language
- Add items (word, verb, adjective, expression, etc.) and associated tags, along with their translation
- Play a flipping card game to train yourself (+ filter sample data)
- Find vocabulary via a dictionary (filter specific data)

## Installation

Clone the repository from GitHub: [https://github.com/jmcavet/fluento.git](https://github.com/jmcavet/fluento.git)

## Development

npm run dev

## Deployment

The website is hosted on Netlify: [Fluento](https://app.netlify.com/projects/fluento-jm/)

1. Create a new branch locally. First, make sure your main branch is up to date:
   1. $> git checkout main
   2. $> git pull origin main
2. Create and switch to your feature branch: $> git checkout -b feature/my-new-feature
3. Do your work (development). When done:
   1. Build the project: $> npm run build Note: not needed though, since Netlify will do it automatically for you whenever you merge your branch into main. You can still do it for instance before mergin to main, locally once, to make sure it builds cleanly
   2. Copy the 'netlify.toml' file into the 'dist' directory
   3. Add and commit changes via the "Source control" side tab in VScode
4. Push your branch to github: $> git push -u origin feature/my-new-feature (or via the "Source control" side tab). The '-u' flag links your local branch to the remote one on GitHub, so next time you just need $> git push
5. Open a pull request on GitHub when ready to merge
6. The Netlify project is linked to the github repo. Therefore, Netlify will automatically create a build and deploy the website

## Icons

Create your brand/logo in Figma.

1. First, create a frame (w=192px and h=192px). Inside, place your logo (text, shapes, etc.). Group both the frame and logo ("Group Selection"), and export it with the options: 1x & PNG. Name it icon-192x192.png
2. Export it again with the following options: 512w & PNG. Name it icon-512x512.png
3. Place both images in the './public' directory
4. The icon-192×192.png image is used for the Android home screen icon
5. The icon-512×512.png image is used for the Progressive Web App splash screen
6. Using the icon-192x192.png image, create the favicon-16x16.png, favicon-32x32.png, and favicon.ico files (use for instance [favicon.io](https://favicon.io/favicon-converter/))
7. When you build your project ($> npm run build), they will be copied into the 'dist' directory

## Animations

Use mp4 rather than gif files. Place your files into the public directory (not under src).

## Tech Stack

- Figma for the UI/UX design
- React, React-Query
- Tailwind
- eCharts visualization library
- Supabase
- Git & GitHub for version control
- Deployed on Netlify

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
