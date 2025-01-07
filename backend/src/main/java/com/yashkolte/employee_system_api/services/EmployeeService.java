package com.yashkolte.employee_system_api.services;

import com.yashkolte.employee_system_api.entity.EmployeeEntity;

import java.util.List;

public interface EmployeeService {
	EmployeeEntity createEmployee(EmployeeEntity employee);

    List<EmployeeEntity> getAllEmployees();
    
    List<EmployeeEntity> getAllBySub(String sub);

    boolean deleteEmployee(Long id);

    EmployeeEntity getEmployeeById(Long id);

    EmployeeEntity updateEmployee(Long id, EmployeeEntity employee);

    EmployeeEntity updateAIDescription(Long id, EmployeeEntity employee);
}
