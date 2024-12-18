package spring.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import spring.backend.models.Competition;

public interface CompetitionRepository extends MongoRepository<Competition, String> {}
