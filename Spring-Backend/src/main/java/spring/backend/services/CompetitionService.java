package spring.backend.services;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import spring.backend.models.Competition;
import spring.backend.repositories.CompetitionRepository;

@Service
public class CompetitionService {

  @Autowired CompetitionRepository competitionRepository;

  public Competition createCompetition(@Valid @RequestBody Competition competition) {
    competition.setQuestionIds(List.of());

    getAllCompetitions().stream()
        .forEach(
            e -> {
              if (e.getTitle().equals(competition.getTitle())) {
                throw new IllegalArgumentException("Competition title already exists");
              }
            });
    return competitionRepository.save(competition);
  }

  public List<Competition> getAllCompetitions() {
    return competitionRepository.findAll();
  }
}
