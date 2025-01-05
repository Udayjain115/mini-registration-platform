package spring.backend.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import spring.backend.models.Competition;
import spring.backend.repositories.CompetitionRepository;

@Service
public class CompetitionService {

  @Autowired CompetitionRepository competitionRepository;

  public Competition getCompetitionById(String id) {
    System.out.println("--------------------CompetitionService.getCompetitionById");
    return competitionRepository.findById(id).get();
  }

  public Competition createCompetition(@RequestBody Competition competition) {
    competition.setQuestionIds(List.of());

    getAllCompetitions().stream()
        .forEach(
            e -> {
              if (e.getTitle().toLowerCase().equals(competition.getTitle().toLowerCase())) {
                throw new IllegalArgumentException("Competition title already exists");
              }
            });
    return competitionRepository.save(competition);
  }

  public List<Competition> getAllCompetitions() {

    return competitionRepository.findAll();
  }

  public Competition updateCompetition(Competition updatedCompetition) {

    return competitionRepository.save(updatedCompetition);
  }
}
