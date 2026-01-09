/**
 * Controlador de Jogadores
 * Responsabilidade: Gerenciar operações relacionadas aos jogadores
 */
export class PlayerController {
    constructor(gameState, notifications, ui) {
        this.state = gameState;
        this.notify = notifications;
        this.ui = ui;
    }

    /**
     * Adiciona um novo jogador
     */
    addPlayer() {
        const name = this.ui.getPlayerNameInput();
        if (name) {
            this.state.addPlayer(name);
            this.ui.clearPlayerNameInput();
            this.renderList();
        }
    }

    /**
     * Edita o nome de um jogador
     * @param {number} index
     */
    editPlayer(index) {
        const player = this.state.players[index];
        if (!player) return;

        this.notify.prompt(
            '✏️ Editar Jogador',
            'Digite o novo nome:',
            player.name,
            'Salvar',
            'Cancelar',
            (newName) => {
                if (newName && newName.trim()) {
                    this.state.players[index].name = newName.trim();
                    this.renderList();
                    this.notify.success('Nome atualizado!');
                }
            }
        );
    }

    /**
     * Remove um jogador
     * @param {number} index
     */
    removePlayer(index) {
        const removed = this.state.removePlayer(index);
        if (removed) {
            this.renderList();
            this.notify.warning(`${removed.name} removido!`);
        }
    }

    /**
     * Renderiza a lista de jogadores
     */
    renderList() {
        this.ui.renderPlayerList(
            this.state.players,
            (i) => this.editPlayer(i),
            (i) => this.removePlayer(i)
        );
    }

    /**
     * Verifica se há jogadores suficientes para iniciar
     * @returns {boolean}
     */
    canStartGame() {
        return this.state.players.length >= 2;
    }
}
