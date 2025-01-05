package spring.backend.models;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.data.annotation.Id;

public class Competition {
  @NotEmpty(message = "Competition title is required")
  @Id
  private String title;

  @UniqueElements(message = "Question already in competition")
  private List<String> questionIds;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public List<String> getQuestionIds() {
    return questionIds;
  }

  public void setQuestionIds(List<String> questionIds) {
    this.questionIds = questionIds;
  }

  @Override
  public String toString() {
    return ("Competition [title=" + title + ", questionIds=" + questionIds.toString() + "]");
  }
}
