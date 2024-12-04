package com.taskmanager.server.model;

public enum Status {
    PENDING("Pendente"),
    IN_PROGRESS("Em progresso"),
    DONE("Concluido");

    private final String descricao;

    Status(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getChave() {
        return this.name();
    }
}