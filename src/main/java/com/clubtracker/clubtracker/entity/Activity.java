package com.clubtracker.clubtracker.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private LocalDate date;
    private int hours;

    // ... underneath your existing fields (date, description, hours, title) ...
    private String time;
    private String day;

    // --- Add these Getters and Setters at the bottom ---
    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }
    
    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }

    public Activity() {}

    public Activity(String title, String description, LocalDate date, int hours) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.hours = hours;
    }

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public int getHours() { return hours; }
    public void setHours(int hours) { this.hours = hours; }
}