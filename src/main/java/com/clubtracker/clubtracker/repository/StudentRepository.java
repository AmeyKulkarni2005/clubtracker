package com.clubtracker.clubtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clubtracker.clubtracker.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByEmail(String email);
}