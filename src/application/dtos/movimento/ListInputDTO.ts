export interface ListInputDTO {
    userId: number;
    dataInicio?: Date;
    dataLimite?: Date;
    limit?: number;
    skip?: number;
}
