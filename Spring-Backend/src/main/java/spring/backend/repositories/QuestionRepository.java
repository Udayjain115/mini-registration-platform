package spring.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import spring.backend.models.Question;

public interface QuestionRepository extends MongoRepository<Question, String> {}
