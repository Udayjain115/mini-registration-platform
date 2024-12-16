package spring.backend.controllers;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.backend.models.Event;
import spring.backend.repositories.EventRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/events")
public class eventController {
  @Autowired EventRepository eventRepository;

  @GetMapping
  public ResponseEntity<List<Event>> getEvents() {
    List<Event> events = eventRepository.findAll();
    return ResponseEntity.ok(events);
  }

  @PostMapping
  public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event) {
    Event createdEvent = eventRepository.save(event);
    return ResponseEntity.ok(createdEvent);
  }
}
