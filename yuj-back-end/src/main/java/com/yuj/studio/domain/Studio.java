package com.yuj.studio;

import com.yuj.user.Users;
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
    @JoinColumn(name = "users_id")
    private Users users;
}
