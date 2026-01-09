/**
 * Controlador do Jogo
 * Responsabilidade: Gerenciar a lógica principal do jogo
 */
export class GameController {
    constructor(gameState, storage, notifications, ui) {
        this.state = gameState;
        this.storage = storage;
        this.notify = notifications;
        this.ui = ui;
        this.winnerMessageBackup = '';
    }

    /**
     * Inicia o jogo
     * @param {PlayerController} playerController
     */
    startGame(playerController) {
        if (!playerController.canStartGame()) {
            this.notify.error('Adicione pelo menos 2 jogadores!');
            return false;
        }
        this.state.isActive = true;
        this.ui.showGame();
        this.ui.enableGameButtons(); // Garante que botões estejam ativos
        this.notify.success('Jogo iniciado');
        this.updateUI();
        return true;
    }

    /**
     * Adiciona pontos à rodada
     * @param {number} points
     */
    addPoints(points) {
        if (!this.state.isActive) return;

        // Salvar estado para undo
        this.state.saveToHistory();
        this.winnerMessageBackup = this.ui.elements.winnerMsg.innerHTML;

        this.state.roundScore += points;

        // Verificar vitória
        const totalPossivel = this.state.getTotalPossivel();
        if (totalPossivel >= 100) {
            const player = this.state.getCurrentPlayer();
            player.total = totalPossivel;

            this.ui.showWinnerMessage(
                `🎉 <strong>${player.name}</strong> venceu!<br>` +
                `Acumulado: ${player.total - this.state.roundScore} + Rodada: ${this.state.roundScore} = ` +
                `<strong>${totalPossivel} pontos!</strong>`
            );

            this.state.isActive = false;
            this.state.clearHistory();
            this._showEndGameDialog(player.name, totalPossivel);
        }

        this.updateUI();
    }

    /**
     * Para a rodada e salva os pontos
     */
    hold() {
        if (!this.state.isActive) return;

        const player = this.state.getCurrentPlayer();
        player.addPoints(this.state.roundScore);

        if (player.isWinner()) {
            this.ui.showWinnerMessage(`${player.name} venceu com ${player.total} pontos!`);
            this.state.isActive = false;
            this.notify.report('Fim de jogo', 'Temos um vencedor!');
        } else {
            this.state.nextPlayer();
        }

        this.updateUI();
    }

    /**
     * Zera a rodada atual
     */
    resetRound() {
        this.state.roundScore = 0;
        this.state.nextPlayer();
        this.notify.info('Rodada zerada');
        this.updateUI();
    }

    /**
     * Zera os pontos do jogador atual
     */
    resetPlayerPoints() {
        const player = this.state.getCurrentPlayer();

        this.notify.confirm(
            'Zerar jogador',
            `Deseja zerar os pontos de ${player.name}?`,
            'Sim',
            'Cancelar',
            () => {
                player.resetPoints();
                this.state.roundScore = 0;
                this.notify.warning(`${player.name} teve seus pontos zerados`);
                this.state.nextPlayer();
                this.updateUI();
            }
        );
    }

    /**
     * Zera todos os pontos
     */
    resetGame() {
        this.notify.confirm(
            'Zerar tudo',
            'Tem certeza que deseja zerar todos os pontos?',
            'Sim',
            'Cancelar',
            () => {
                this.state.resetAllPoints();
                this.state.isActive = true;
                this.ui.clearWinnerMessage();
                this.notify.warning('Todos os pontos foram zerados');
                this.updateUI();
            }
        );
    }

    /**
     * Reinicia o jogo completamente
     */
    restartGame() {
        this.notify.confirm(
            'Reiniciar jogo',
            'Deseja começar um novo jogo do zero (inclui jogadores)?',
            'Sim',
            'Cancelar',
            () => {
                this.state.fullReset();
                this.ui.showSetup();
                this.ui.clearPlayerList();
                this.ui.clearWinnerMessage();
                this.storage.clear();
                this.notify.success('Jogo reiniciado');
            }
        );
    }

    /**
     * Remove jogador por WO
     */
    playerWO() {
        const player = this.state.getCurrentPlayer();

        this.notify.confirm(
            'WO - Remover Jogador',
            `Confirmar WO para ${player.name}?`,
            'Sim',
            'Cancelar',
            () => {
                this.state.removePlayer(this.state.currentPlayerIndex);

                // Se ficou só 1, é o vencedor
                if (this.state.players.length === 1) {
                    const winner = this.state.players[0];
                    this.ui.showWinnerMessage(
                        `🏆 <strong>${winner.name}</strong> venceu!<br>Todos os outros saíram por WO.`
                    );
                    this.state.isActive = false;
                    this.state.clearHistory();

                    // Desabilita os botões (só Novo jogo fica ativo)
                    this.ui.disableGameButtons();

                    setTimeout(() => {
                        this._showEndGameDialog(winner.name, winner.total, true);
                    }, 300);
                    return;
                }

                // Ajustar índice
                if (this.state.currentPlayerIndex >= this.state.players.length) {
                    this.state.currentPlayerIndex = 0;
                }

                this.state.roundScore = 0;
                this.notify.warning(`${player.name} foi removido por WO`);
                this.updateUI();
            }
        );
    }

    /**
     * Desfaz a última ação
     */
    undo() {
        if (this.state.history.length === 0) {
            this.notify.warning('Nada para desfazer!');
            return;
        }

        this.state.restoreFromHistory();
        this.ui.showWinnerMessage(this.winnerMessageBackup);
        this.notify.info(`Desfeito! (${this.state.history.length} ações restantes)`);
        this.updateUI();
    }

    /**
     * Atualiza a interface
     */
    updateUI() {
        if (this.state.players.length === 0 || !this.state.getCurrentPlayer()) return;

        const player = this.state.getCurrentPlayer();
        const totalPossivel = this.state.getTotalPossivel();

        this.ui.updateRoundInfo(player.name, this.state.roundScore, totalPossivel);
        this.ui.renderScoreboard(this.state.players, this.state.currentPlayerIndex);
        this.saveGame();
    }

    /**
     * Salva o jogo
     */
    saveGame() {
        this.storage.save(this.state.toJSON());
    }

    /**
     * Carrega o jogo salvo
     * @returns {boolean}
     */
    loadGame() {
        const data = this.storage.load();
        if (data) {
            this.state.loadFromJSON(data);
            this.ui.showGame();
            this.updateUI();
            return true;
        }
        return false;
    }

    /**
     * Exibe diálogo de fim de jogo
     * @private
     */
    _showEndGameDialog(winnerName, points, isWO = false) {
        const message = isWO
            ? `${winnerName} venceu! Todos os outros saíram por WO.`
            : `${winnerName} venceu com ${points} pontos!`;

        // Se é WO e só tem 1 jogador, não faz sentido "Nova Rodada"
        // porque precisa de pelo menos 2 jogadores
        const onlyOnePlayer = this.state.players.length < 2;

        if (isWO && onlyOnePlayer) {
            // Caso especial: WO com 1 jogador - só oferece Novo Jogo ou Adicionar Jogadores
            this.notify.confirm(
                '🎉 Fim de jogo!',
                message,
                'Novo Jogo',
                'Adicionar Jogadores',
                () => {
                    // Novo Jogo - reset total
                    this.state.fullReset();
                    this.ui.showSetup();
                    this.ui.clearPlayerList();
                    this.ui.clearWinnerMessage();
                    this.storage.clear();
                    this.notify.success('Adicione os jogadores para um novo jogo!');
                },
                () => {
                    // Adicionar Jogadores - mantém o vencedor e volta ao setup
                    this.state.resetAllPoints();
                    this.state.isActive = false;
                    this.ui.showSetup();
                    this.ui.clearWinnerMessage();
                    // Renderiza a lista com o jogador existente
                    this.ui.renderPlayerList(
                        this.state.players,
                        () => { }, // callbacks vazios temporários
                        () => { }
                    );
                    this.notify.success('Adicione mais jogadores para continuar!');
                }
            );
        } else {
            // Caso normal: vitória por pontos ou WO com 2+ jogadores restantes
            this.notify.confirm(
                '🎉 Fim de jogo!',
                message,
                'Novo Jogo',
                'Nova Rodada',
                () => {
                    // Novo Jogo
                    this.state.fullReset();
                    this.ui.showSetup();
                    this.ui.clearPlayerList();
                    this.ui.clearWinnerMessage();
                    this.storage.clear();
                    this.notify.success('Adicione os jogadores para um novo jogo!');
                },
                () => {
                    // Nova Rodada
                    this.state.resetAllPoints();
                    this.state.isActive = true;
                    this.state.clearHistory();
                    this.ui.clearWinnerMessage();
                    this.notify.success('Nova rodada com os mesmos jogadores!');
                    this.updateUI();
                }
            );
        }
    }
}
