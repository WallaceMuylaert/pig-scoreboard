/**
 * Serviço de Notificações
 * Responsabilidade: Exibir notificações e modais ao usuário
 * Wrapper do Notiflix para facilitar substituição futura
 */
export class NotificationService {
    constructor() {
        // Inicializa o Notiflix com as cores do projeto
        if (typeof Notiflix !== 'undefined') {
            Notiflix.Confirm.init({
                okButtonBackground: '#ff4fa3',
                okButtonColor: '#fff',
                cancelButtonBackground: '#ffb6c1',
                cancelButtonColor: '#fff',
                titleColor: '#ff4fa3',
                backgroundColor: '#fff4fa'
            });
        }
    }

    /**
     * Exibe notificação de sucesso
     * @param {string} message
     */
    success(message) {
        Notiflix.Notify.success(message);
    }

    /**
     * Exibe notificação de aviso
     * @param {string} message
     */
    warning(message) {
        Notiflix.Notify.warning(message);
    }

    /**
     * Exibe notificação de erro
     * @param {string} message
     */
    error(message) {
        Notiflix.Notify.failure(message);
    }

    /**
     * Exibe notificação de informação
     * @param {string} message
     */
    info(message) {
        Notiflix.Notify.info(message);
    }

    /**
     * Exibe modal de confirmação
     * @param {string} title
     * @param {string} message
     * @param {string} okText
     * @param {string} cancelText
     * @param {Function} onOk
     * @param {Function} onCancel
     */
    confirm(title, message, okText, cancelText, onOk, onCancel = () => { }) {
        Notiflix.Confirm.show(title, message, okText, cancelText, onOk, onCancel);
    }

    /**
     * Exibe modal de confirmação com input
     * @param {string} title
     * @param {string} message
     * @param {string} defaultValue
     * @param {string} okText
     * @param {string} cancelText
     * @param {Function} onOk
     * @param {Function} onCancel
     */
    prompt(title, message, defaultValue, okText, cancelText, onOk, onCancel = () => { }) {
        Notiflix.Confirm.prompt(
            title, message, defaultValue, okText, cancelText,
            onOk, onCancel,
            {
                okButtonBackground: '#ff4fa3',
                cancelButtonBackground: '#ffb6c1',
                titleColor: '#ff4fa3',
                backgroundColor: '#fff4fa'
            }
        );
    }

    /**
     * Exibe relatório de sucesso
     * @param {string} title
     * @param {string} message
     * @param {string} buttonText
     */
    report(title, message, buttonText = 'Ok') {
        Notiflix.Report.success(title, message, buttonText);
    }
}
