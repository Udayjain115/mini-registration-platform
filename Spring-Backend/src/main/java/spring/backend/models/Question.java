package spring.backend.models;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import org.springframework.data.annotation.Id;

public class Question {
  @NotEmpty(message = "Question title is required")
  @Id
  private String title;

  @NotEmpty(message = "Question options are required")
  @Size(min = 4, max = 4, message = "Question must have 4 options")
  private List<@NotBlank(message = "Options Must Not Be Blank") String> options;

  @NotNull(message = "Question correct option is required")
  @Min(value = 1L, message = "Correct option must be between 1 and 4")
  @Max(value = 4L, message = "Correct option must be between 1 and 4")
  private int correctChoiceIndex;

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

  public int getCorrectChoiceIndex() {
    return correctChoiceIndex;
  }

  public void setCorrectChoiceIndex(int correctChoiceIndex) {
    this.correctChoiceIndex = correctChoiceIndex;
  }

  @Override
  public String toString() {
    return ("Question [title="
        + title
        + ", options="
        + options.toString()
        + ", correctOptionIndex="
        + correctChoiceIndex
        + "]");
  }
}
