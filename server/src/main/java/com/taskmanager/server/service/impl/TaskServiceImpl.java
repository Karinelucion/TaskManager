package com.taskmanager.server.service.impl;

import com.taskmanager.server.dto.TaskDto;
import com.taskmanager.server.model.Task;
import com.taskmanager.server.repository.TaskRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskServiceImpl {
    @Autowired
    private TaskRepository taskRepository;

    private final ModelMapper modelMapper;

    public TaskServiceImpl(TaskRepository pessoaRepository, ModelMapper modelMapper) {
        this.taskRepository = pessoaRepository;
        this.modelMapper = modelMapper;
    }

    private TaskDto convertToDto(Task task) {
        return modelMapper.map(task, TaskDto.class);
    }

    private Task convertToEntity(TaskDto taskDto) {
        return modelMapper.map(taskDto, Task.class);
    }

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public Optional<Task> findById(UUID id) {
        return taskRepository.findById(id);
    }

    public Task save(Task task) {
        return taskRepository.save(task);
    }

    public void deleteById(UUID id) {
        taskRepository.deleteById(id);
    }
}
