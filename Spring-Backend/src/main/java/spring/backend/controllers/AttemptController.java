package spring.backend.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.backend.models.Attempt;
import spring.backend.services.AttemptService;

@CrossOrigin
@RestController
@RequestMapping("/api/attempts")
public class AttemptController {

  @Autowired AttemptService attemptService;

  @GetMapping
  public ResponseEntity<List<Attempt>> getAttempts() {
    List<Attempt> attempts = attemptService.getAllAttempts();
    return ResponseEntity.ok(attempts);
  }

  @PostMapping
  public ResponseEntity<Attempt> createAttempt(@RequestBody Attempt attempt) {
    Attempt createdAttempt = attemptService.createAttempt(attempt);
    return ResponseEntity.ok(createdAttempt);
  }
}
