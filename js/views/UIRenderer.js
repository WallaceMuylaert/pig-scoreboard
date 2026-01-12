/**
 * Renderizador de Interface
 * Responsabilidade: Atualizar a interface do usuário
 */
export class UIRenderer {
    constructor() {
        // Cache dos elementos DOM
        this.elements = {
            setup: document.getElementById('setup'),
            game: document.getElementById('game'),
            playerName: document.getElementById('playerName'),
            playerList: document.getElementById('playerList'),
            turnInfo: document.getElementById('turnInfo'),
            roundScore: document.getElementById('roundScore'),
            totalPossivel: document.getElementById('totalPossivel'),
            progressBar: document.getElementById('progressBar'),
            scoreboard: document.getElementById('scoreboard'),
            winnerMsg: document.getElementById('winnerMsg'),
            instructions: document.getElementById('instructions')
        };
    }

    /**
     * Mostra a tela de setup
     */
    showSetup() {
        this.elements.setup.style.display = 'block';
        this.elements.game.style.display = 'none';
    }

    /**
     * Mostra a tela de jogo
     */
    showGame() {
        this.elements.setup.style.display = 'none';
        this.elements.game.style.display = 'block';
    }

    /**
     * Renderiza a lista de jogadores no setup
     * @param {Array} players
     * @param {Function} onEdit
     * @param {Function} onRemove
     */
    renderPlayerList(players, onEdit, onRemove) {
        this.elements.playerList.innerHTML = players
            .map((p, i) => `
        <div class="setup-player">
          <span class="player-name">${i + 1}. ${p.name}</span>
          <div class="player-actions">
            <button class="btn-edit" data-index="${i}">✏️</button>
            <button class="btn-remove" data-index="${i}">✕</button>
          </div>
        </div>
      `)
            .join('');

        // Adiciona event listeners
        this.elements.playerList.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => onEdit(parseInt(btn.dataset.index)));
        });
        this.elements.playerList.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', () => onRemove(parseInt(btn.dataset.index)));
        });
    }

    /**
     * Renderiza o scoreboard durante o jogo
     * @param {Array} players
     * @param {number} currentIndex
     */
    renderScoreboard(players, currentIndex) {
        this.elements.scoreboard.innerHTML = players
            .map((p, i) => `
        <div class="player ${i === currentIndex ? 'active' : ''}">
          <span class="name">${i === currentIndex ? '👉' : ''} ${p.name}</span>
          <span class="points">${p.total}</span>
        </div>
      `)
            .join('');
    }

    /**
     * Atualiza as informações da rodada
     * @param {string} playerName
     * @param {number} roundScore
     * @param {number} totalPossivel
     */
    updateRoundInfo(playerName, roundScore, totalPossivel) {
        this.elements.turnInfo.textContent = `🎲 Vez de: ${playerName}`;
        this.elements.roundScore.textContent = roundScore;
        this.elements.totalPossivel.textContent = totalPossivel;

        const progressPercent = Math.min(totalPossivel, 100);
        this.elements.progressBar.style.width = `${progressPercent}%`;
    }

    /**
     * Exibe mensagem de vencedor
     * @param {string} html
     */
    showWinnerMessage(html) {
        this.elements.winnerMsg.innerHTML = html;
    }

    /**
     * Limpa mensagem de vencedor
     */
    clearWinnerMessage() {
        this.elements.winnerMsg.textContent = '';
    }

    /**
     * Limpa a lista de jogadores
     */
    clearPlayerList() {
        this.elements.playerList.innerHTML = '';
    }

    /**
     * Obtém o valor do input de nome
     * @returns {string}
     */
    getPlayerNameInput() {
        return this.elements.playerName.value.trim();
    }

    /**
     * Limpa o input de nome
     */
    clearPlayerNameInput() {
        this.elements.playerName.value = '';
    }

    /**
     * Toggle das instruções
     */
    toggleInstructions() {
        const el = this.elements.instructions;
        el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }

    /**
     * Desabilita todos os botões do jogo exceto 'Novo jogo'
     */
    disableGameButtons() {
        const gameDiv = this.elements.game;
        const buttons = gameDiv.querySelectorAll('button');
        buttons.forEach(btn => {
            // Mantém apenas o botão "Novo jogo" ativo
            if (!btn.textContent.includes('Novo jogo')) {
                btn.disabled = true;
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            }
        });
    }

    /**
     * Habilita todos os botões do jogo
     */
    enableGameButtons() {
        const gameDiv = this.elements.game;
        const buttons = gameDiv.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        });
    }
}
