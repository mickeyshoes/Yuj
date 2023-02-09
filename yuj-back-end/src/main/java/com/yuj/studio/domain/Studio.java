package com.yuj.studio.domain;

import com.yuj.user.domain.User;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Studio {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "studio_id")
    private Long studioId;

    private String bannerImage;

    private String description;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
