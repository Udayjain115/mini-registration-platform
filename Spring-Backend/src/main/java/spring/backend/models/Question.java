package spring.backend.models;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import org.springframework.data.annotation.Id;

public class Question {
  @NotEmpty(message = "Question title is required")
  @Id
  private String title;

  @NotEmpty(message = "Question options are required")
  private List<String> options;

  @NotEmpty(message = "Question correct option is required")
  private int correctOptionIndex;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public List<String> getOptions() {
    return options;
  }

  public void setOptions(List<String> options) {
    this.options = options;
  }

  public int getCorrectOptionIndex() {
    return correctOptionIndex;
  }

  public void setCorrectOptionIndex(int correctOptionIndex) {
    this.correctOptionIndex = correctOptionIndex;
  }

  @Override
  public String toString() {
    return ("Question [title="
        + title
        + ", options="
        + options.toString()
        + ", correctOptionIndex="
        + correctOptionIndex
        + "]");
  }
}
