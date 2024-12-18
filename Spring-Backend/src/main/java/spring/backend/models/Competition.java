package spring.backend.models;

import jakarta.validation.constraints.NotEmpty;
import java.util.Arrays;
import org.springframework.data.annotation.Id;

public class Competition {
  @NotEmpty(message = "Competition title is required")
  @Id
  private String title;

  private String[] questionIds;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String[] getQuestionIds() {
    return questionIds;
  }

  public void setQuestionIds(String[] questionIds) {
    this.questionIds = questionIds;
  }

  @Override
  public String toString() {
    return "Competition [title=" + title + ", questionIds=" + Arrays.toString(questionIds) + "]";
  }
}
