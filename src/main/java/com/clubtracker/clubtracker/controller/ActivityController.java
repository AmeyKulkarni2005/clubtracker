package com.clubtracker.clubtracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clubtracker.clubtracker.entity.Activity;
import com.clubtracker.clubtracker.repository.ActivityRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/activities")
public class ActivityController {

    @Autowired
    private ActivityRepository activityRepository;

    // Create activity
    @PostMapping("/add")
    public Activity addActivity(@RequestBody Activity activity) {
        return activityRepository.save(activity);
    }

    // View all activities
    @GetMapping("/all")
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }
}