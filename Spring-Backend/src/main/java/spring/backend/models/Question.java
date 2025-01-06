package spring.backend.models;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import java.util.Set;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.data.annotation.Id;
import spring.backend.enums.Difficulty;
import spring.backend.enums.Topics;

public class Question {
  @NotEmpty(message = "Question title is required")
  @Id
  private String title;

  @NotEmpty(message = "Question options are required")
  @Size(min = 4, max = 4, message = "Question must have 4 options")
  @UniqueElements(message = "Options Must Be Unique")
  private List<@NotBlank(message = "Options Must Not Be Blank") String> options;

  @NotNull(message = "Question correct option is required")
  @Min(value = 1L, message = "Correct option must be between 1 and 4")
  @Max(value = 4L, message = "Correct option must be between 1 and 4")
  private int correctChoiceIndex;

  @NotNull(message = "Question difficulty is required")
  private Difficulty Difficulty;

  @Size(min = 1, message = "Must have at least one topic")
  private Set<Topics> Topics;

  public Set<Topics> getTopics() {
    return Topics;
  }

  public void setTopics(Set<Topics> topics) {
    Topics = topics;
  }

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

  public Difficulty getDifficulty() {
    return Difficulty;
  }

  public void setDifficulty(Difficulty Difficulty) {
    this.Difficulty = Difficulty;
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
