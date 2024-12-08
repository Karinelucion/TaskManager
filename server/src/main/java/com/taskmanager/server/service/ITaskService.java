package com.taskmanager.server.service;

import com.taskmanager.server.model.Task;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface TaskService extends CrudService<Task, Long> {
    List<Task> findAll(Specification specification);
}