import { MovimentoOutputDTO } from './MovimentoOutputDTO';

export interface ListMovimentoOutpuDTO {
    total?: number;
    page?: number;
    limit?: number;
    //periodo: string | null;
    lista: MovimentoOutputDTO[];
}
