package com.clubtracker.clubtracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clubtracker.clubtracker.entity.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentIdAndPresentTrue(Long studentId);

    Attendance findByStudentIdAndActivityId(Long studentId, Long activityId);
}