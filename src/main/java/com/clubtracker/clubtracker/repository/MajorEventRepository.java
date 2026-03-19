package com.clubtracker.clubtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clubtracker.clubtracker.entity.MajorEvent;

public interface MajorEventRepository extends JpaRepository<MajorEvent, Long> {
}