import { MovimentoRepository } from '../../../domain/repositories/MovimentoRepository';

export class DeleteMovimentoUseCase {
    private readonly _movimentoRepositoty: MovimentoRepository;
    constructor(movimentoRepository: MovimentoRepository) {
        this._movimentoRepositoty = movimentoRepository;
    }

    async execute(id: number, userId: number): Promise<void> {
        await this._movimentoRepositoty.delete(id, userId);
    }
}
