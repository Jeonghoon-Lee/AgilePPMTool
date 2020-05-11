package com.hoon.ppmtool.controllers;

import com.hoon.ppmtool.domain.Project;
import com.hoon.ppmtool.domain.ProjectTask;
import com.hoon.ppmtool.services.MapValidationErrorService;
import com.hoon.ppmtool.services.ProjectTaskService;
import org.hibernate.annotations.Fetch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{backlogId}")
    public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask,
                                                     BindingResult result, @PathVariable String backlogId) {
        ResponseEntity<?> errorMap = mapValidationErrorService.validateResult(result);
        if (errorMap != null) return errorMap;

        ProjectTask projectTask1 = projectTaskService.addProjectTask(backlogId, projectTask);
        return new ResponseEntity<>(projectTask1, HttpStatus.CREATED);
    }

    @GetMapping("/{backlogId}")
    public Iterable<?> getProjectBackLog(@PathVariable String backlogId) {
        return projectTaskService.findBacklogByProjectId(backlogId);
    }

    @GetMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<?> getProjectTask(@PathVariable String backlogId, @PathVariable String projectTaskId) {
        ProjectTask projectTask = projectTaskService.findProjectTaskByProjectSequence(backlogId, projectTaskId);
        return new ResponseEntity<>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                                @PathVariable String backlogId, @PathVariable String projectTaskId) {
        ResponseEntity<?> errorMap = mapValidationErrorService.validateResult(result);
        if (errorMap != null) return errorMap;

        // need to implement patching logic.
        // now we can update whole project only.

        ProjectTask updatedTask = projectTaskService.updateProjectTaskByProjectSequence(projectTask, backlogId, projectTaskId);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{backlogId}/{projectTaskId}")
    public ResponseEntity<String> deleteProjectTask(@PathVariable String backlogId, @PathVariable String projectTaskId) {
        projectTaskService.deleteProjectTaskByProjectSequence(backlogId, projectTaskId);

        return new ResponseEntity<>("Project Task: " + projectTaskId + " was deleted successfully", HttpStatus.OK);
    }
}
