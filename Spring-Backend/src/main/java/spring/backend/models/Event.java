package spring.backend.models;

import java.util.Date;
import org.springframework.data.annotation.Id;

public class Event {
  @Id private String name;
  private String description;
  private Date date;

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

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }
}
