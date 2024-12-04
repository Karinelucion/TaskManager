export interface ITask{
    id?: number,
    description: string,
    title: string,
    date: Date,
    status: Status,
}

export enum Status{
    PENDING = "Pendente",
    IN_PROGRESS = "Em progresso",
    DONE = "Concluido",
} 