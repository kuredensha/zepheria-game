import App from './app';
import Game from './game';

import './lib/sentry';
import '../scss/main.scss';

// Import the Leaderboards class from the 'menu' folder
import Leaderboards from './menu/leaderboards';

/**
 * The entry point for the game. Create an instance of the game
 * and pass a new instance of the app onto it.
 */

const app = new App();
const game = new Game(app);
