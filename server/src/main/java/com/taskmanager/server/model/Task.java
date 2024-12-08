package com.taskmanager.server.model;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String description;

    @NotNull
    private String title;

    private String date;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status;
}
