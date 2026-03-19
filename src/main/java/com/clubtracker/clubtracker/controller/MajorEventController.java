package com.clubtracker.clubtracker.controller;

import com.clubtracker.clubtracker.entity.MajorEvent;
import com.clubtracker.clubtracker.repository.MajorEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class MajorEventController {

    @Autowired
    private MajorEventRepository eventRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addEvent(
            @ModelAttribute MajorEvent event, 
            @RequestParam("image") MultipartFile image) {
        
        try {
            // 1. Create an "uploads" folder if it doesn't exist
            Path uploadPath = Paths.get("uploads/");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // 2. Generate a unique file name (so two photos named "pic.jpg" don't overwrite each other)
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            // 3. Save the file to the physical folder
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // 4. Save the URL path in the database object
            event.setImageUrl("/uploads/" + fileName);

            // 5. Save the whole thing to the MySQL database
            MajorEvent savedEvent = eventRepository.save(event);
            return ResponseEntity.ok(savedEvent);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"message\": \"Failed to upload file and save event.\"}");
        }
    }

    @GetMapping("/all")
    public List<MajorEvent> getAllEvents() {
        return eventRepository.findAll();
    }
}