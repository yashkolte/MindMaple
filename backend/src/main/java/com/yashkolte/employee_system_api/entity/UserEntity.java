package com.yashkolte.employee_system_api.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String email;
    private String name;
    private String given_name;
    private String family_name;
    private String picture; // Optional
    private String sub;
    // Getters and Setters
}
