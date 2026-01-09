import { Player } from './Player.js';

/**
 * Estado do Jogo
 * Responsabilidade: Gerenciar o estado atual do jogo
 */
export class GameState {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.roundScore = 0;
        this.isActive = false;
        this.history = []; // Pilha para undo
    }

    /**
     * Retorna o jogador atual
     * @returns {Player|null}
     */
    getCurrentPlayer() {
        if (this.players.length === 0) return null;
        return this.players[this.currentPlayerIndex];
    }

    /**
     * Adiciona um jogador
     * @param {string} name
     */
    addPlayer(name) {
        this.players.push(new Player(name));
    }

    /**
     * Remove um jogador pelo índice
     * @param {number} index
     * @returns {Player|null}
     */
    removePlayer(index) {
        if (index < 0 || index >= this.players.length) return null;
        return this.players.splice(index, 1)[0];
    }

    /**
     * Passa para o próximo jogador
     */
    nextPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.roundScore = 0;
    }

    /**
     * Salva o estado atual no histórico (para undo)
     */
    saveToHistory() {
        this.history.push({
            players: this.players.map(p => p.toJSON()),
            currentPlayerIndex: this.currentPlayerIndex,
            roundScore: this.roundScore,
            isActive: this.isActive
        });
    }

    /**
     * Restaura o último estado do histórico
     * @returns {boolean} - true se restaurou, false se não havia histórico
     */
    restoreFromHistory() {
        if (this.history.length === 0) return false;

        const lastState = this.history.pop();
        this.players = lastState.players.map(p => Player.fromJSON(p));
        this.currentPlayerIndex = lastState.currentPlayerIndex;
        this.roundScore = lastState.roundScore;
        this.isActive = lastState.isActive;
        return true;
    }

    /**
     * Limpa o histórico
     */
    clearHistory() {
        this.history = [];
    }

    /**
     * Calcula o total possível (acumulado + rodada)
     * @returns {number}
     */
    getTotalPossivel() {
        const player = this.getCurrentPlayer();
        if (!player) return 0;
        return player.total + this.roundScore;
    }

    /**
     * Reseta todos os pontos dos jogadores
     */
    resetAllPoints() {
        this.players.forEach(p => p.resetPoints());
        this.roundScore = 0;
        this.currentPlayerIndex = 0;
    }

    /**
     * Reseta o jogo completamente
     */
    fullReset() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.roundScore = 0;
        this.isActive = false;
        this.history = [];
    }

    /**
     * Converte para objeto simples (para serialização)
     * @returns {Object}
     */
    toJSON() {
        return {
            players: this.players.map(p => p.toJSON()),
            currentPlayer: this.currentPlayerIndex,
            roundScore: this.roundScore,
            gameActive: this.isActive
        };
    }

    /**
     * Carrega estado de um objeto
     * @param {Object} data
     */
    loadFromJSON(data) {
        this.players = data.players.map(p => Player.fromJSON(p));
        this.currentPlayerIndex = data.currentPlayer;
        this.roundScore = data.roundScore;
        this.isActive = data.gameActive;
    }
}
