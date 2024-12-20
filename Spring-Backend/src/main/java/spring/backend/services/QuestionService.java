package spring.backend.services;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import spring.backend.models.Question;
import spring.backend.repositories.QuestionRepository;

@Service
public class QuestionService {

  @Autowired QuestionRepository questionRepository;

  public List<Question> getAllQuestions() {
    return questionRepository.findAll();
  }

  public Question createQuestion(@Valid @RequestBody Question question) {
    getAllQuestions().stream()
        .forEach(
            e -> {
              if (e.getTitle().equals(question.getTitle())) {
                throw new IllegalArgumentException("Question already exists");
              }
            });
    return questionRepository.save(question);
  }

  public Question getQuestionByTitle(String title) {
    Optional<Question> question = questionRepository.findById(title);

    if (question.isPresent()) {
      return question.get();
    } else {
      throw new IllegalArgumentException("Question Not Found");
    }
  }
}
