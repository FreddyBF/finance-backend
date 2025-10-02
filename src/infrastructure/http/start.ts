import { App } from './App';

(async () => {
    try {
        await new App().start();
    } catch (error) {
        console.error('Erro ao iniciar a aplicação:', error);
    }
})();
