package com.clubtracker.clubtracker.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.clubtracker.clubtracker.entity.Activity;
import com.clubtracker.clubtracker.entity.Attendance;
import com.clubtracker.clubtracker.repository.AttendanceRepository;

@Service
public class StudentService {

    private final AttendanceRepository attendanceRepository;

    public StudentService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public int calculateTotalHours(Long studentId) {
        List<Attendance> records = attendanceRepository.findByStudentIdAndPresentTrue(studentId);

        // REMOVE: return records.size() * 2;
        // ADD THIS: dynamically sum the actual hours from the Activity table
        return records.stream()
                .mapToInt(attendance -> attendance.getActivity().getHours())
                .sum();
    }

    public List<Activity> getAttendedActivities(Long studentId) {
        List<Attendance> records = attendanceRepository.findByStudentIdAndPresentTrue(studentId);
        
        // Extract just the Activity objects from the Attendance records
        return records.stream()
                .map(Attendance::getActivity)
                .collect(Collectors.toList());
    }
}
