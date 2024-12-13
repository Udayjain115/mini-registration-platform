package spring.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import spring.backend.models.User;

public interface UserRepository extends MongoRepository<User, String> {}
