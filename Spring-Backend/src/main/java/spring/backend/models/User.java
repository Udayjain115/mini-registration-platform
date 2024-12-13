package spring.backend.models;

import java.util.List;
import org.springframework.data.annotation.Id;

public class User {
  @Id private String email;
  private String password;
  private String name;
  private List<Event> eventsJoined;
}
