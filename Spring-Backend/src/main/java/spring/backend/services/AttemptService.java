package spring.backend.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import spring.backend.models.Attempt;
import spring.backend.repositories.AttemptRepository;

@Service
public class AttemptService {

  @Autowired AttemptRepository attemptRepository;

  public Attempt createAttempt(Attempt attempt) {
    return attemptRepository.save(attempt);
  }

  public List<Attempt> getAllAttempts() {
    return attemptRepository.findAll();
  }
}
