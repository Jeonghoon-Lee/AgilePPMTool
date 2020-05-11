package com.hoon.ppmtool.services;

import com.hoon.ppmtool.domain.Backlog;
import com.hoon.ppmtool.domain.Project;
import com.hoon.ppmtool.exeptions.ProjectIdException;
import com.hoon.ppmtool.repositories.BacklogRepository;
import com.hoon.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project project) {
        try {
            String projectIdentifier = project.getProjectIdentifier().toUpperCase();
            project.setProjectIdentifier(projectIdentifier);

            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(projectIdentifier);
            } else {
                project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
            }
            // Need to implement a logic if you want to get an full entity
            // when you update an entity partially
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
        }
    }

    public Project findProjectByIdentifier(String projectIdentifier) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());

        if (project == null)
            throw new ProjectIdException("Project ID '" + projectIdentifier + "' does not exist");
        return project;
    }

    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectIdentifier) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());

        if (project == null)
            throw new ProjectIdException("Cannot delete Project with ID '" + projectIdentifier + "'. This project does not exist!");

        projectRepository.delete(project);
    }
}
