import { Movimento } from '../entities/movimento/Movimento';

interface MovimentoRepository {
    save: (movimento: Movimento) => Promise<Movimento>;

    update: (movimento: Movimento) => Promise<Movimento | null>;

    delete: (id: number, userId: number) => Promise<void>;

    getAll: (
        userId: number,
        limit?: number,
        skip?: number,
        dataInicio?: Date,
        dataFinal?: Date
    ) => Promise<Movimento[]>;

    findById: (id: number, userId: number) => Promise<Movimento | null>;

    count(): Promise<number>;
}

export { MovimentoRepository };
