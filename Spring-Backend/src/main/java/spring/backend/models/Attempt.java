package spring.backend.models;

import java.util.HashMap;
import java.util.Map;

public class Attempt {

  private String studentEmail;
  private String competitionId;
  private Map<String, Integer> attempts = new HashMap<>();

  public String getStudentEmail() {
    return studentEmail;
  }

  public void setStudentEmail(String studentEmail) {
    this.studentEmail = studentEmail;
  }

  public String getCompetitionId() {
    return competitionId;
  }

  public void setCompetitionId(String competitionId) {
    this.competitionId = competitionId;
  }

  public Map<String, Integer> getAttempts() {
    return attempts;
  }

  public void setAttempts(Map<String, Integer> attempts) {
    this.attempts = attempts;
  }
}
