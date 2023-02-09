package com.yuj.lecture.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Yoga {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "yoga_id")
    private Long yogaId;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String englishName;

    private String description;
}
