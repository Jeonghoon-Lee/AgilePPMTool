package com.hoon.ppmtool.services;

import com.hoon.ppmtool.domain.Backlog;
import com.hoon.ppmtool.domain.Project;
import com.hoon.ppmtool.domain.ProjectTask;
import com.hoon.ppmtool.exeptions.ProjectNotFoundException;
import com.hoon.ppmtool.repositories.BacklogRepository;
import com.hoon.ppmtool.repositories.ProjectRepository;
import com.hoon.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        try {
            // Project tasks to be added to a specific project, project != null, backlog exists.
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
            // set the backlog to the project task
            projectTask.setBacklog(backlog);
            // we want our project sequence to be like this: IDPRO-1 IDPRO-2
            Integer backlogSequence = backlog.getPtSequence();
            // Update the backlog sequence
            backlog.setPtSequence(++backlogSequence);
            // Add Sequence to Project Task
            projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            return projectTaskRepository.save(projectTask);
        } catch (Exception e) {
            throw new ProjectNotFoundException("Project not found");
        }
    }

    public Iterable<ProjectTask> findBacklogByProjectId(String projectIdentifier) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

        if (backlog == null) {
            throw new ProjectNotFoundException("Project with ID: '" + projectIdentifier + " does not exist.");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }

    public ProjectTask findProjectTaskByProjectSequence(String projectIdentifier, String projectSequence) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        if (backlog == null) {
            throw new ProjectNotFoundException("Project with ID: '" + projectIdentifier + " does not exist.");
        }

        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectSequence);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project Task with ID: '" + projectSequence + " does not exist.");
        }

        if (!projectTask.getProjectIdentifier().equals(projectIdentifier)) {
            throw new ProjectNotFoundException("Project Task with ID: '" + projectSequence + " does not exist in project");
        }
        return projectTask;
    }

    public ProjectTask updateProjectTaskByProjectSequence(ProjectTask updatedTask, String projectIdentifier, String projectSequence) {
        // get old project task
        ProjectTask oldProjectTask = this.findProjectTaskByProjectSequence(projectIdentifier, projectSequence);

        // check projectTask Id, projectIdentifier, projectSequence number
        if ((oldProjectTask.getId() != updatedTask.getId())
                || !oldProjectTask.getProjectIdentifier().equals(updatedTask.getProjectIdentifier())
                || !oldProjectTask.getProjectSequence().equals(updatedTask.getProjectSequence())) {
            throw new ProjectNotFoundException("Invalid project task with ID: '" + projectSequence + ". Fail to update");
        }
        return projectTaskRepository.save(updatedTask);
    }

    public void deleteProjectTaskByProjectSequence(String projectIdentifier, String projectSequence) {
        ProjectTask projectTask = this.findProjectTaskByProjectSequence(projectIdentifier, projectSequence);
        projectTaskRepository.delete(projectTask);
    }
}
