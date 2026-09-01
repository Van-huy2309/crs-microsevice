// path: auth-service/src/main/java/vn/edu/crs/authservice/dto/LoginResponseDTO.java
// purpose: bo sung truong userId de tra ve cho Frontend

package vn.edu.crs.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {
    private Long userId;
    private String token;
    private String username;
    private String role;
}
