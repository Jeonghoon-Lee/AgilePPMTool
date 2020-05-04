package com.hoon.ppmtool.services;

import com.hoon.ppmtool.domain.Project;
import com.hoon.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project) {
        // Should implement logics
        return projectRepository.save(project);
    }
}
