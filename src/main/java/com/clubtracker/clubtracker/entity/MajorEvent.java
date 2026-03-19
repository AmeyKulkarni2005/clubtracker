package com.clubtracker.clubtracker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MajorEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String eventDate;
    private String eventDay;
    private String venue;
    private String imageUrl; // For the photo!

    @Column(columnDefinition = "TEXT")
    private String introduction;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String takeaways;

    @Column(columnDefinition = "TEXT")
    private String subEvents; // To list the specific events that happened

    // --- GETTERS AND SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEventDate() { return eventDate; }
    public void setEventDate(String eventDate) { this.eventDate = eventDate; }
    public String getEventDay() { return eventDay; }
    public void setEventDay(String eventDay) { this.eventDay = eventDay; }
    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getIntroduction() { return introduction; }
    public void setIntroduction(String introduction) { this.introduction = introduction; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getTakeaways() { return takeaways; }
    public void setTakeaways(String takeaways) { this.takeaways = takeaways; }
    public String getSubEvents() { return subEvents; }
    public void setSubEvents(String subEvents) { this.subEvents = subEvents; }
}