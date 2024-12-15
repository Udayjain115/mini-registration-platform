package spring.backend.models;

import java.util.List;
import org.springframework.data.annotation.Id;

public class User {
  @Id private String email;
  private String password;
  private String name;
  private List<String> eventsJoined;

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<String> getEventsJoined() {
    return eventsJoined;
  }

  public void setEventsJoined(List<String> eventsJoined) {
    this.eventsJoined = eventsJoined;
  }
}
