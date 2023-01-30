package com.yuj.user;

import com.yuj.studio.Studio;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Users {
    @Id
    @GeneratedValue
    @Column(name = "users_id")
    private Long userId;

    @Column(nullable = false)
    private String id;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private LocalDate birthDate;

    @Column(nullable = false)
    private String gender;

    private String profileImage;


    private boolean isTeacher = false;

    private boolean isAdmin = false;

    @OneToOne
    @JoinColumn(name = "token_id")
    private Token token;

    @OneToOne(mappedBy = "users")
    private Studio studio;


}
