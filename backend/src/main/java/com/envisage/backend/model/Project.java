package com.envisage.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    // Using string to match frontend 'category' styling requirement 
    // Example: "Master Planning", "Commercial Architecture"
    private String category;
    
    private String location;
    
    @Column(name = "thumbnail_url")
    private String thumbnailUrl;
    
    @ElementCollection
    @CollectionTable(name = "project_media", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "media_url", length = 1000)
    private List<String> mediaList;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Project() {
    }

    public Project(Long id, String title, String category, String location, String thumbnailUrl, List<String> mediaList) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.location = location;
        this.thumbnailUrl = thumbnailUrl;
        this.mediaList = mediaList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public List<String> getMediaList() {
        return mediaList;
    }

    public void setMediaList(List<String> mediaList) {
        this.mediaList = mediaList;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
