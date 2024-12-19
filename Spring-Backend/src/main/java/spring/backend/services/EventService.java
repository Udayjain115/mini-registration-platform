package spring.backend.services;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import spring.backend.models.Event;
import spring.backend.repositories.EventRepository;

@Service
public class EventService {

  @Autowired EventRepository eventRepository;

  public Event getEventById(String id) {
    Optional<Event> event = eventRepository.findById(id);
    if (event.isPresent()) {
      return eventRepository.findById(id).get();
    } else {
      throw new IllegalArgumentException("Event not found");
    }
  }

  public Event updateEvent(Event updatedEvent) {
    Event eventToUpdate = getEventById(updatedEvent.getName());

    return eventRepository.save(eventToUpdate);
  }

  public Event createEvent(@Valid @RequestBody Event event) {

    getAllEvents().stream()
        .forEach(
            e -> {
              if (e.getName().equals(event.getName())) {
                throw new IllegalArgumentException("Event name already exists");
              }
            });

    return eventRepository.save(event);
  }

  public List<Event> getAllEvents() {
    return eventRepository.findAll();
  }
}
