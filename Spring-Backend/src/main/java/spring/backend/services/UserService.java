package spring.backend.services;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import spring.backend.models.User;
import spring.backend.repositories.UserRepository;

@Service
public class UserService {

  @Autowired UserRepository userRepository;

  public User createUser(@Valid @RequestBody User user) {
    user.setEventsJoined(List.of());
    return userRepository.save(user);
  }

  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  public Optional<User> updateUser(String id, User userDetails) {
    Optional<User> userOptional = userRepository.findById(id);
    if (userOptional.isPresent()) {
      User user = userOptional.get();
      user.setName(userDetails.getName());
      user.setPassword(userDetails.getPassword());
      user.setEmail(userDetails.getEmail());
      user.setEventsJoined(userDetails.getEventsJoined());
      userRepository.save(user);
      return Optional.of(user);
    } else {
      return Optional.empty();
    }
  }
}
