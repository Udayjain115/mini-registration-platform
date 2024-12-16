package spring.backend.controllers;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.backend.models.User;
import spring.backend.repositories.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class userController {
  @Autowired UserRepository userRepository;

  @GetMapping
  public ResponseEntity<List<User>> getUsers() {
    List<User> users = userRepository.findAll();
    System.out.println(users.toString());
    return ResponseEntity.ok(users);
  }

  @PostMapping
  public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
    user.setEventsJoined(List.of());
    User createdUser = userRepository.save(user);
    return ResponseEntity.ok(createdUser);
  }

  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User userDetails) {
    System.out.println("User details: " + userDetails);
    Optional<User> userOptional = userRepository.findById(id);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      user.setName(userDetails.getName());
      user.setEmail(userDetails.getEmail());
      user.setPassword(userDetails.getPassword());
      user.setEventsJoined(userDetails.getEventsJoined());
      User updatedUser = userRepository.save(user);
      return ResponseEntity.ok(updatedUser);
    } else {

      return ResponseEntity.notFound().build();
    }
  }
}
