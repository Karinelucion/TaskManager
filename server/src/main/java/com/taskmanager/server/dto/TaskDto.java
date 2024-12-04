package com.taskmanager.server.dto;

import com.taskmanager.server.model.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {
    private int id;

    private String description;

    private String title;

    private Date date;

    private Status status;
}
