package com.yashkolte.employee_system_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name= "todo")
public class EmployeeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String description;
    private String emailId;
    private String status;
    private String aiDescription;
    private String sub;

    @Lob
    @Column(name = "image", columnDefinition = "MEDIUMTEXT")
    private String image;

}

