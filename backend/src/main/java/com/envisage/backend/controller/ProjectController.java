package com.envisage.backend.controller;

import com.envisage.backend.model.Project;
import com.envisage.backend.repository.ProjectRepository;
import com.envisage.backend.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*") // Allows the React app to hit this API
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    // Get all projects
    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // Create a new project
    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }

    // Upload an image or video directly to Cloudinary through the backend
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadMedia(@RequestParam("file") MultipartFile file) {
        String secureUrl = cloudinaryService.uploadMedia(file);
        return ResponseEntity.ok(Collections.singletonMap("secure_url", secureUrl));
    }

    // Get signed URL credentials for frontend (legacy/optional depending on approach)
    @PostMapping("/signature")
    public ResponseEntity<Map<String, Object>> getSignature(@RequestBody(required = false) Map<String, Object> params) {
        Map<String, Object> signatureData = cloudinaryService.generateSignature(params);
        return ResponseEntity.ok(signatureData);
    }
    
    // Update existing project
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id :" + id));
        
        project.setTitle(projectDetails.getTitle());
        project.setCategory(projectDetails.getCategory());
        project.setLocation(projectDetails.getLocation());
        project.setThumbnailUrl(projectDetails.getThumbnailUrl());
        project.setMediaList(projectDetails.getMediaList());
        
        Project updatedProject = projectRepository.save(project);
        return ResponseEntity.ok(updatedProject);
    }

    // Delete existing project
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        if (!projectRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        projectRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
