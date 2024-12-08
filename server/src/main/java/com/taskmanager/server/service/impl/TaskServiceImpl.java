package com.taskmanager.server.service.impl;

import com.taskmanager.server.model.Status;
import com.taskmanager.server.model.Task;
import com.taskmanager.server.repository.TaskRepository;
import com.taskmanager.server.service.ITaskService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class TaskServiceImpl extends CrudServiceImpl<Task, Long>
        implements ITaskService {
    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    protected JpaRepository<Task, Long> getRepository() {
        return taskRepository;
    }

    public List<Task> findByStatus (String status){
        Status enumStatus = Status.valueOf(status);
        return taskRepository.findByStatus(enumStatus);
    }
}
