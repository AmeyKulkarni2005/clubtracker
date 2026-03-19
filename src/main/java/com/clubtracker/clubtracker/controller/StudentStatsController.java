package com.clubtracker.clubtracker.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clubtracker.clubtracker.entity.Activity;
import com.clubtracker.clubtracker.service.StudentService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/students")
public class StudentStatsController {

    private final StudentService studentService;

    public StudentStatsController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/{id}/activities")
    public List<Activity> getStudentActivities(@PathVariable Long id) {
        return studentService.getAttendedActivities(id);
    }

    @GetMapping("/{id}/hours")
    public Map<String, Object> getStudentHours(@PathVariable Long id) {

        int totalHours = studentService.calculateTotalHours(id);
        int remainingHours = 30 - totalHours;

        Map<String, Object> response = new HashMap<>();
        response.put("studentId", id);
        response.put("totalHours", totalHours);
        response.put("remainingHours", remainingHours);

        return response;
    }
}