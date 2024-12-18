package spring.backend.models;

import jakarta.validation.constraints.NotEmpty;
import org.springframework.data.annotation.Id;

public class Competition {
  @NotEmpty(message = "Competition title is required")
  @Id
  private String title;

  private String[] questionIds;
}
