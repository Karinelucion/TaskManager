package com.taskmanager.server.controller;

import com.taskmanager.server.dto.TaskDto;
import com.taskmanager.server.model.Status;
import com.taskmanager.server.model.Task;
import com.taskmanager.server.service.CrudService;
import com.taskmanager.server.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;

import org.springframework.web.bind.annotation.*;


import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("tasks")
@Slf4j
public class TaskController extends CrudController<Task, TaskDto, Long> {

    private final TaskService taskService;
    private final ModelMapper modelMapper;


    public TaskController(TaskService taskService, ModelMapper modelMapper) {
        super(Task.class, TaskDto.class);
        this.taskService = taskService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected CrudService<Task, Long> getService() {
        return this.taskService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return this.modelMapper;
    }

    @GetMapping("status")
    public List<Map<String, String>> getStatus() {
        return Arrays.stream(Status.values())
                .map(status -> Map.of("chave", status.getChave(), "descricao", status.getDescricao()))
                .collect(Collectors.toList());
    }
}