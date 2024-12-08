package com.taskmanager.server.controller;

import com.taskmanager.server.dto.TaskDto;
import com.taskmanager.server.model.Status;
import com.taskmanager.server.model.Task;
import com.taskmanager.server.service.ICrudService;
import com.taskmanager.server.service.ITaskService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("tasks")
public class TaskController extends CrudController<Task, TaskDto, Long> {

    private final ITaskService taskService;
    private final ModelMapper modelMapper;

    public TaskController(ITaskService taskService, ModelMapper modelMapper) {
        super(Task.class, TaskDto.class);
        this.taskService = taskService;
        this.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<Task, Long> getService() {
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

////REMOVIDO POIS FOI OPTADO POR FAZER O FILTRO SOMENTE NO FRONT END
//    @GetMapping("bystatus/{status}")
//    public ResponseEntity<List<Task>> getTasksByStatus(@PathVariable String status) {
//        try {
//            Status enumStatus = Status.valueOf(status);
//            List<Task> tasks = taskService.findByStatus(enumStatus.name());
//            return tasks.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(tasks);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(null);
//        }
//    }

}