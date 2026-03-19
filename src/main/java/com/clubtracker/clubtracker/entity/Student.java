package com.clubtracker.clubtracker.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    //private int totalHours;

    public Student() {}

    public Student(String name, String email, String password, int totalHours) {
        this.name = name;
        this.email = email;
        this.password = password;
        //this.totalHours = totalHours;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // public int getTotalHours() {
    //     return totalHours;
    // }

    // public void setTotalHours(int totalHours) {
    //     this.totalHours = totalHours;
    // }
}