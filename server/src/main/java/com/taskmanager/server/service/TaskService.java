package com.taskmanager.server.service;

import com.taskmanager.server.model.Task;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletResponse;
import java.util.List;

public interface TaskService extends CrudService<Task, Long> {
    List<Task> findAll(Specification specification);
}