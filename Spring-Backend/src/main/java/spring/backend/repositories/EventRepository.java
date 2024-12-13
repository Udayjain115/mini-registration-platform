package spring.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import spring.backend.models.Event;

public interface EventRepository extends MongoRepository<Event, String> {}
