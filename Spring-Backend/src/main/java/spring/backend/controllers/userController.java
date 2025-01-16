package spring.backend.controllers;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.backend.models.User;
import spring.backend.services.UserService;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {
  @Autowired UserService userService;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserController(PasswordEncoder passwordEncoder) {
    this.passwordEncoder = passwordEncoder;
  }

  @GetMapping
  public ResponseEntity<List<User>> getUsers() {
    List<User> users = userService.getAllUsers();
    return ResponseEntity.ok(users);
  }

  @PostMapping
  public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setEventsJoined(List.of());
    User createdUser = userService.createUser(user);
    return ResponseEntity.ok(createdUser);
  }

  @PostMapping("/login")
  public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
    Optional<User> userOptional = userService.findByEmail(loginRequest.getEmail());

    if (userOptional.isEmpty()) {
      return ResponseEntity.status(401).body("Invalid email or password");
    }

    User user = userOptional.get();

    System.out.println("User: " + user.toString());

    // Verify password
    if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
      return ResponseEntity.status(401).body("Invalid email or password");
    }

    if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
      return ResponseEntity.status(200).body("Correct email and password");
    }

    // Optionally, remove the password before sending the user object
    user.setPassword(null);

    return ResponseEntity.ok(user);
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUser(@PathVariable String id) {

    User user = userService.getUserById(id);

    return ResponseEntity.ok(user);
  }

  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User userDetails) {
    System.out.println("Updating user with ID = " + id + "..." + userDetails.toString());
    Optional<User> userOptional = userService.updateUser(id, userDetails);
    if (userOptional.isPresent()) {
      System.out.println(userOptional.get().toString());

      return ResponseEntity.ok(userOptional.get());
    } else {

      return ResponseEntity.notFound().build();
    }
  }
}
