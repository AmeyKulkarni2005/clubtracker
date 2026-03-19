package com.clubtracker.clubtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clubtracker.clubtracker.entity.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

}