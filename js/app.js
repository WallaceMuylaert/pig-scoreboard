/**
 * Pig Head Scoreboard - App Principal
 * Ponto de entrada da aplicação
 */

import { GameState } from './models/GameState.js';
import { StorageService } from './services/StorageService.js';
import { NotificationService } from './services/NotificationService.js';
import { UIRenderer } from './views/UIRenderer.js';
import { PlayerController } from './controllers/PlayerController.js';
import { GameController } from './controllers/GameController.js';

// Instâncias dos módulos
const gameState = new GameState();
const storage = new StorageService();
const notifications = new NotificationService();
const ui = new UIRenderer();
const playerController = new PlayerController(gameState, notifications, ui);
const gameController = new GameController(gameState, storage, notifications, ui);

// Funções globais para os event handlers do HTML
window.addPlayer = () => playerController.addPlayer();
window.startGame = () => gameController.startGame(playerController);
window.addPoints = (points) => gameController.addPoints(points);
window.hold = () => gameController.hold();
window.resetRound = () => gameController.resetRound();
window.resetPlayerPoints = () => gameController.resetPlayerPoints();
window.resetGame = () => gameController.resetGame();
window.restartGame = () => gameController.restartGame();
window.playerWO = () => gameController.playerWO();
window.undoLastAction = () => gameController.undo();
window.toggleInstructions = () => ui.toggleInstructions();
window.toggleScoreTable = () => ui.toggleScoreTable();

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Tenta carregar jogo salvo
    if (!gameController.loadGame()) {
        // Se não há jogo salvo, mostra tela de setup
        ui.showSetup();
    }
});
