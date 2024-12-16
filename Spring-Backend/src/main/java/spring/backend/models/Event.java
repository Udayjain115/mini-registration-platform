package spring.backend.models;

import jakarta.validation.constraints.NotEmpty;
import org.springframework.data.annotation.Id;

public class Event {
  @NotEmpty(message = "Event name is required")
  @Id
  private String name;

  @NotEmpty(message = "Description is required")
  private String description;

  @NotEmpty(message = "Date is required")
  private String date;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }
}
