import { MovimentoRepository } from '../../../domain/repositories/MovimentoRepository';
import { Movimento } from '../../../domain/entities/movimento/Movimento';

export class InMemoryDatabase implements MovimentoRepository {
    private movimentos: Movimento[] = [];

    public save(movimento: Movimento): Promise<Movimento> {
        //Gerar os id
        const id = this.movimentos.length + 1;
        movimento = Movimento.restore(
            id,
            movimento.userId,
            movimento.data,
            movimento.tipoMovimento,
            Math.abs(movimento.saldo)
        );
        console.log(`Salvando movimento com ID: ${movimento.id}`);
        this.movimentos.push(movimento);
        return Promise.resolve(movimento);
    }

    public update(movimento: Movimento): Promise<Movimento> {
        const index = this.movimentos.findIndex(
            (m) => m.id === movimento.id && m.userId === movimento.userId
        );

        if (index !== -1) {
            this.movimentos[index] = movimento;
            return Promise.resolve(movimento);
        }
        return Promise.reject();
    }

    public delete(id: number, userId: number): Promise<void> {
        this.movimentos = this.movimentos.filter((m) => m.id !== id && m.userId !== userId);
        return Promise.resolve();
    }

    public count(): Promise<number> {
        return Promise.resolve(this.movimentos.length);
    }

    public getAll(
        userId: number,
        limit?: number,
        skip?: number,
        dataInicio?: Date,
        dataFinal?: Date
    ): Promise<Movimento[]> {
        let result = this.movimentos.filter((m) => m.userId === userId);

        if (dataInicio && dataFinal) {
            result = result.filter(
                (m) =>
                    m.data.getTime() >= dataInicio.getTime() &&
                    m.data.getTime() <= dataFinal.getTime()
            );
        }

        if (skip && limit) {
            result = result.slice(skip);
            result = result.slice(0, limit);
        }
        return Promise.resolve(result);
    }

    public findById(id: number, userId: number): Promise<Movimento | null> {
        const movimento = this.movimentos.find((m) => m.id === id && m.userId === userId);
        return Promise.resolve(movimento);
    }
}
