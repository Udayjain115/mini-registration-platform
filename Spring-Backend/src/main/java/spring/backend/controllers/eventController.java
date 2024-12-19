package spring.backend.controllers;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.backend.models.Event;
import spring.backend.services.EventService;

@CrossOrigin
@RestController
@RequestMapping("/api/events")
public class EventController {
  @Autowired EventService eventService;

  @GetMapping
  public ResponseEntity<List<Event>> getEvents() {
    List<Event> events = eventService.getAllEvents();
    return ResponseEntity.ok(events);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Event> getEvent(@PathVariable String id) {

    Event event = eventService.getEventById(id);

    return ResponseEntity.ok(event);
  }

  @PostMapping
  public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event) {
    Event createdEvent = eventService.createEvent(event);
    return ResponseEntity.ok(createdEvent);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Event> updateEvent(
      @PathVariable String id, @RequestBody Event updatedEvent) {
    Event event = eventService.updateEvent(updatedEvent);

    return ResponseEntity.ok(event);
  }
}
