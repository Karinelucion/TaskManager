package com.taskmanager.server.service;

import com.taskmanager.server.model.Task;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface ITaskService extends ICrudService<Task, Long> {
    List<Task> findByStatus (String status);
}