package spring.backend.controllers;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.backend.models.Question;
import spring.backend.services.QuestionService;

@CrossOrigin
@RestController
@RequestMapping("/api/questions")
public class QuestionController {
  @Autowired QuestionService questionService;

  @GetMapping
  public ResponseEntity<List<Question>> getQuestions() {
    List<Question> questions = questionService.getAllQuestions();
    return ResponseEntity.ok(questions);
  }

  @PostMapping
  public ResponseEntity<Question> createQuestion(@Valid @RequestBody Question question) {
    Question createdQuestion = questionService.createQuestion(question);

    return ResponseEntity.ok(createdQuestion);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Question> getQuestionByTitle(@PathVariable String id) {
    Question question = questionService.getQuestionByTitle(id);

    return ResponseEntity.ok(question);
  }
}
