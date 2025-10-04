export class InvalidUpdateTranscationException extends Error {
    constructor(message?: string) {
        super(message ?? 'Pelo menos um campo deve ser informado para actualização');
        this.name = 'InvalidUpdateTranscationException';
    }
}
