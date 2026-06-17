// 화면 입력값과 Entity를 분리하기 위해 사용
package com.example.securityjpaboard.dto;

import com.example.securityjpaboard.domain.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class SignupRequest {
    @NotBlank(message = "아이디를 입력하세요.")
    @Size(min = 4, max = 50, message = "아이디는 4자 이상 50자 이하로 입력하세요.")
    private String username;

    @NotBlank(message = "비밀번호를 입력하세요.")
    @Size(min = 4, max = 100, message = "비밀번호는 4자 이상 입력하세요.")
    private String password;

    @NotBlank(message = "이름을 입력하세요.")
    @Size(max = 30, message = "이름은 30자 이하로 입력하세요.")
    private String displayName;

    @NotNull(message = "권한을 선택하세요.")
    private Role role = Role.USER;

    // getter
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}