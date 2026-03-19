package com.clubtracker.clubtracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clubtracker.clubtracker.entity.Activity;
import com.clubtracker.clubtracker.entity.Attendance;
import com.clubtracker.clubtracker.entity.Student;
import com.clubtracker.clubtracker.repository.ActivityRepository;
import com.clubtracker.clubtracker.repository.AttendanceRepository;
import com.clubtracker.clubtracker.repository.StudentRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @PostMapping("/mark")
    public Attendance markAttendance(
            @RequestParam Long studentId,
            @RequestParam Long activityId,
            @RequestParam boolean present) {

        Student student = studentRepository.findById(studentId).orElse(null);
        Activity activity = activityRepository.findById(activityId).orElse(null);

        if (student == null || activity == null) {
            throw new IllegalArgumentException("Invalid Student ID or Activity ID provided.");
        }

        // ADD THIS BLOCK: Check if record already exists
        Attendance existingRecord = attendanceRepository.findByStudentIdAndActivityId(studentId, activityId);
        if (existingRecord != null) {
            // If it exists, just update the 'present' status and save
            existingRecord.setPresent(present);
            return attendanceRepository.save(existingRecord);
        }

        Attendance attendance = new Attendance(student, activity, present);
        return attendanceRepository.save(attendance);
    }
}