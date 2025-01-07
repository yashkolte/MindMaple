package com.yashkolte.employee_system_api.repository;

import com.yashkolte.employee_system_api.entity.EmployeeEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> {

	List<EmployeeEntity> findAllEmployeeBySub(String sub);

	List<EmployeeEntity> findAllBySub(String sub);
}
