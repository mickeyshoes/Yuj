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
    @SequenceGenerator(
            name="STUDIO_SEQ_GEN",
            sequenceName = "STUDIO_SEQ",
            initialValue = 100,
            allocationSize = 1
    )
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "STUDIO_SEQ_GEN")
    @Column(name = "studio_id")
    private Long studioId;

    private String bannerImage;

    private String description;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
