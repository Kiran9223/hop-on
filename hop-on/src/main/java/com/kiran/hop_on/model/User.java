package com.kiran.hop_on.model;

import com.kiran.hop_on.enumType.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "app_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @Column(unique = true)
    private String phone;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;



}
