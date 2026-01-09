/**
 * Modelo de Jogador
 * Responsabilidade: Representar os dados e comportamentos de um jogador
 */
export class Player {
    constructor(name, total = 0) {
        this.name = name;
        this.total = total;
    }

    /**
     * Adiciona pontos ao total do jogador
     * @param {number} points - Pontos a adicionar
     */
    addPoints(points) {
        this.total += points;
    }

    /**
     * Zera os pontos do jogador
     */
    resetPoints() {
        this.total = 0;
    }

    /**
     * Verifica se o jogador atingiu a pontuação de vitória
     * @param {number} target - Pontuação alvo (padrão: 100)
     * @returns {boolean}
     */
    isWinner(target = 100) {
        return this.total >= target;
    }

    /**
     * Converte para objeto simples (para serialização)
     * @returns {Object}
     */
    toJSON() {
        return { name: this.name, total: this.total };
    }

    /**
     * Cria uma instância a partir de um objeto
     * @param {Object} data
     * @returns {Player}
     */
    static fromJSON(data) {
        return new Player(data.name, data.total);
    }
}
