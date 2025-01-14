package spring.backend.controllers;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.backend.models.Competition;
import spring.backend.services.CompetitionService;

@CrossOrigin
@RestController
@Validated
@RequestMapping("/api/competitions")
public class CompetitionController {
  @Autowired CompetitionService competitionService;

  @GetMapping
  public ResponseEntity<List<Competition>> getCompetitions() {
    List<Competition> competitions = competitionService.getAllCompetitions();
    return ResponseEntity.ok(competitions);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Competition> getCompetition(@PathVariable String id) {
    Competition competition = competitionService.getCompetitionById(id);
    return ResponseEntity.ok(competition);
  }

  @PostMapping
  public ResponseEntity<Competition> createCompetition(
      @Valid @RequestBody Competition competition) {
    competition.setQuestionIds(List.of());
    Competition createdCompetition = competitionService.createCompetition(competition);

    return ResponseEntity.ok(createdCompetition);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Competition> updateCompetition(
      @PathVariable String id, @Valid @RequestBody Competition updatedCompetition) {
    Competition competition = competitionService.updateCompetition(updatedCompetition);

    return ResponseEntity.ok(competition);
  }
}
