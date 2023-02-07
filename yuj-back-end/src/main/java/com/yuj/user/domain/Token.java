package com.yuj.user.domain;

import lombok.*;

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

    @Column(nullable = false)
    private Long userId;

//    @OneToOne
//    @JoinColumn(name = "user_id")
//    private User user;

//    @OneToOne(mappedBy = "token")
//    private User user;

    @Builder
    public Token(String refreshToken, Long userId) {
        this.refreshToken = refreshToken;
        this.userId = userId;
    }

    public Token updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }
}
