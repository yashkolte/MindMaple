package com.yashkolte.employee_system_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yashkolte.employee_system_api.entity.UserEntity;
import com.yashkolte.employee_system_api.repository.UserRepository;
import com.yashkolte.employee_system_api.services.UserServiceImpl;
import com.yashkolte.employee_system_api.services.UserServices;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {
	
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserServices userService;

    @PostMapping("/adduser")
    public ResponseEntity<UserEntity> saveUser(@RequestBody UserEntity user) {
        try {
        	UserEntity existingUser = userService.getUserBySub(user.getSub());
        	System.out.println("Existing user: " + existingUser);
        	if(existingUser==null) {      
        		System.out.println("If: ");
        		UserEntity savedUser = userRepository.save(user);
        		return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        	}else {
        		System.out.println("Else:");
        		return new ResponseEntity<>(existingUser, HttpStatus.BAD_REQUEST);
        	}
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
