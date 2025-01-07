package com.yashkolte.employee_system_api.services;

import com.yashkolte.employee_system_api.entity.UserEntity;

public interface UserServices {
	UserEntity getUserBySub(String sub);
}
