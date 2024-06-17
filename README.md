# Reciipiie - Recipe Search App

Reciipiie is a web application that allows users to search for recipes, view details, and save their favorite recipes locally using localStorage. This app was developed as part of a frontend web developer task for MathonGo.

## Live Demo

See the app in action: [Live Demo](https://mathango-frontend-task.vercel.app/)

## Technologies Used

- **NextUI:** React component library for building UI components.
- **Tailwind CSS:** Utility-first CSS framework used for styling.
- **Vite:** Fast build tool that supports React applications.
- **Spoonacular API:** Provides recipe data including ingredients, instructions, and more.
- **Figma Design:** [Figma Design Link](https://www.figma.com/design/WgcXFJXDgdkeYeje6A9PI9/MathOnGo---WEB---Assignment?node-id=0-1&t=ve1RAlvBTbDy2rFA-1)
- **localStorage:** Used to store favorite recipes locally.
- **Tanstack React Query:** Data fetching library for managing server state.
- **Swiper:** Library used for slideshows and carousels.

## Features

- **Search Recipes:** Users can search for recipes using Spoonacular API.

![Search Recipes](https://github.com/hsingla378/mathango-frontend-task/assets/37644800/6d12b8f1-fddf-472a-b896-1d6a4fb540fd)

- **Recipe Details:** View detailed information about each recipe, including ingredients, instructions, and similar recipes.

![Recipe Details](https://github.com/hsingla378/mathango-frontend-task/assets/37644800/24bd875b-6337-419a-8f7f-82bb15301a48)

- **Favorite Recipes:** Save recipes as favorites locally using localStorage.

![Favorite Recipes](https://github.com/hsingla378/mathango-frontend-task/assets/37644800/c00b2e75-3095-483b-83e4-98e94751e90d)
  
- **Responsive Design:** Designed to be responsive using Tailwind CSS and NextUI components.

<img src="https://github.com/hsingla378/mathango-frontend-task/assets/37644800/5e359819-d07e-4799-a606-08e1fc320388" alt="Responsive Design" style="max-width: 100%; width: 320px; height: auto;">

- **Modal/Bottom Sheet:** Opens recipes in a modal or bottom sheet for better user experience.

<img src="https://github.com/hsingla378/mathango-frontend-task/assets/37644800/1a28e25c-1663-4bca-886a-6ecbf5b289fe" alt="Modal/Bottom Sheet" style="max-width: 100%; width: 320px; height: auto;">

## Getting Started

To get started with Reciipiie locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hsingla378/mathango-frontend-task
   cd mathango-frontend-task
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   You will need to set up your Spoonacular API key in a `.env` file:

   ```bash
   VITE_API_KEY=your-api-key
   ```

4. **Run the app:**

   ```bash
   npm run dev
   ```

   This will start the development server. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Scripts

- `npm run dev`: Starts the development server.

## Deployment

The app can be easily deployed to platforms like Vercel or Netlify. Ensure to set up environment variables in your deployment platform for the API key.

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## Acknowledgments

- Figma design provided by MathonGo.
- Spoonacular API for recipe data.

## Contact

For any inquiries or feedback, please [contact me](mailto:hsingla378@gmail.com).
