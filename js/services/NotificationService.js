/**
 * Serviço de Notificações
 * Responsabilidade: Exibir notificações e modais ao usuário
 * Wrapper do Notiflix para facilitar substituição futura
 */
export class NotificationService {
    constructor() {
        if (typeof Notiflix !== 'undefined') {

            // Configuração das NOTIFICAÇÕES (toast)
            Notiflix.Notify.init({
                position: 'right-bottom',   // Canto inferior direito
                closeButton: false,         // Botão de fechar
                clickToClose: true,         // Fecha ao clicar
                pauseOnHover: false,        // Não pausar com mouse em cima
                timeout: 2500,              // Tempo automático
                width: '300px',
                fontSize: '14px',
                borderRadius: '8px',

                success: {
                    background: '#ff4fa3',
                    textColor: '#fff'
                },
                failure: {
                    background: '#ff6b6b',
                    textColor: '#fff'
                },
                warning: {
                    background: '#ffa502',
                    textColor: '#fff'
                },
                info: {
                    background: '#70a1ff',
                    textColor: '#fff'
                }
            });

            // Configuração dos MODAIS de confirmação
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
     */
    confirm(title, message, okText, cancelText, onOk, onCancel = () => {}) {
        Notiflix.Confirm.show(title, message, okText, cancelText, onOk, onCancel);
    }

    /**
     * Exibe modal com input
     */
    prompt(title, message, defaultValue, okText, cancelText, onOk, onCancel = () => {}) {
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
     */
    report(title, message, buttonText = 'Ok') {
        Notiflix.Report.success(title, message, buttonText);
    }
}