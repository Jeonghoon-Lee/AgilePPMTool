package com.hoon.ppmtool.services;

import com.hoon.ppmtool.domain.Backlog;
import com.hoon.ppmtool.domain.Project;
import com.hoon.ppmtool.domain.User;
import com.hoon.ppmtool.exeptions.ProjectIdException;
import com.hoon.ppmtool.exeptions.ProjectNotFoundException;
import com.hoon.ppmtool.repositories.BacklogRepository;
import com.hoon.ppmtool.repositories.ProjectRepository;
import com.hoon.ppmtool.repositories.UserRepository;
import com.hoon.ppmtool.security.IAuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IAuthenticationFacade authenticationFacade;

    public Project saveOrUpdateProject(Project project, String username) {
        String projectIdentifier = project.getProjectIdentifier().toUpperCase();
        User user = userRepository.findByUsername(username);

        // in case of creating user
        if (project.getId() == null) {
            project.setUser(user);
            project.setProjectLeader(user.getUsername());
            project.setProjectIdentifier(projectIdentifier);

            Backlog backlog = new Backlog();
            project.setBacklog(backlog);
            backlog.setProject(project);
            backlog.setProjectIdentifier(projectIdentifier);
        }
        // updating existing user
        else {
            Project oldProject = projectRepository.findByProjectIdentifier(projectIdentifier);
            if (oldProject == null || !oldProject.getProjectLeader().equals(username)) {
                throw new ProjectNotFoundException("Project not found in your account.");
            }
            // updating missing values from client request
            // Need to implement patching logic for partial project
            project.setUser(oldProject.getUser());
            project.setProjectLeader(username);

            // don't need this code.
            // project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
        }

        try {
            // Need to implement a logic if you want to get an full entity
            // when you update an entity partially
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + projectIdentifier + "' already exists");
        }
    }

    public Project findProjectByIdentifier(String projectIdentifier, String username) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());

        if (project == null) {
            throw new ProjectIdException("Project ID '" + projectIdentifier + "' does not exist");
        }
        if (!project.getProjectLeader().equals(username)) {
            throw new ProjectNotFoundException("Project not found in your account");
        }
        return project;
    }

    public Project findProjectByIdentifier(String projectIdentifier) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        String authUsername = authenticationFacade.getAuthentication().getName();

        if (project == null) {
            throw new ProjectIdException("Project ID '" + projectIdentifier + "' does not exist");
        }
        if (!project.getProjectLeader().equals(authUsername)) {
            throw new ProjectNotFoundException("Project not found in your account");
        }
        return project;
    }

    public Iterable<Project> findAllProjects(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectByIdentifier(String projectIdentifier, String username) {
        projectRepository.delete(findProjectByIdentifier(projectIdentifier, username));
    }
}
