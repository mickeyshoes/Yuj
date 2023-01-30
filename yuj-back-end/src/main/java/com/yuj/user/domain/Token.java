package com.yuj.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Token {
    @Id
    @GeneratedValue
    @Column(name = "token_id")
    private Long tokenId;
    @Column(name = "refresh_token", nullable = false)
    private String refreshToken;

    @OneToOne(mappedBy = "token")
    private Users users;
}
