/**
 * Serviço de Armazenamento
 * Responsabilidade: Persistência de dados no localStorage
 */
export class StorageService {
    constructor(key = 'pighead_game') {
        this.key = key;
    }

    /**
     * Salva dados no localStorage
     * @param {Object} data
     */
    save(data) {
        try {
            localStorage.setItem(this.key, JSON.stringify(data));
        } catch (e) {
            console.error('Erro ao salvar:', e);
        }
    }

    /**
     * Carrega dados do localStorage
     * @returns {Object|null}
     */
    load() {
        try {
            const data = localStorage.getItem(this.key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Erro ao carregar:', e);
            return null;
        }
    }

    /**
     * Remove dados do localStorage
     */
    clear() {
        localStorage.removeItem(this.key);
    }

    /**
     * Verifica se existem dados salvos
     * @returns {boolean}
     */
    hasSavedData() {
        return localStorage.getItem(this.key) !== null;
    }
}
