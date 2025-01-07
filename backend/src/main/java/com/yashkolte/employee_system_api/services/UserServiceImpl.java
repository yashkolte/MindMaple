package com.yashkolte.employee_system_api.services;

import org.springframework.stereotype.Service;

import com.yashkolte.employee_system_api.entity.UserEntity;
import com.yashkolte.employee_system_api.repository.UserRepository;


@Service
public class UserServiceImpl implements UserServices {

	private UserRepository userRepository;
	
	
	public UserServiceImpl(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}


	@Override
	public UserEntity getUserBySub(String sub) {
		UserEntity user = userRepository.findBySub(sub);
		return user;
	}

}
