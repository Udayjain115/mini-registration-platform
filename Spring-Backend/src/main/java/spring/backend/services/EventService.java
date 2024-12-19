package spring.backend.services;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import spring.backend.models.Event;
import spring.backend.repositories.EventRepository;

@Service
public class EventService {

  @Autowired EventRepository eventRepository;

  public Event getEventById(String id) {
    return eventRepository.findById(id).get();
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
