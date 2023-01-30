package com.yuj.studio.domain;

import com.yuj.user.domain.User;
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
public class Studio {
    @Id
    @GeneratedValue
    @Column(name = "studio_id")
    private Long studioId;

    private String bannerImage;

    private String description;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
