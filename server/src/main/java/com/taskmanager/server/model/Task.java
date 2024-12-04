package com.taskmanager.server.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotNull
    private String description;

    @NotNull
    private String title;

    @NotNull
    private Date date;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Status status;
}
