package spring.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import spring.backend.models.Attempt;

public interface AttemptRepository extends MongoRepository<Attempt, String> {}
