package com.yashkolte.employee_system_api.services;

import com.yashkolte.employee_system_api.entity.EmployeeEntity;
import com.yashkolte.employee_system_api.repository.EmployeeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    private EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeEntity createEmployee(EmployeeEntity employee) {
        EmployeeEntity employeeEntity = new EmployeeEntity();

        BeanUtils.copyProperties(employee, employeeEntity);
        employeeRepository.save(employeeEntity);
        return employee;
    }

    @Override
    public List<EmployeeEntity> getAllEmployees() {
        List<EmployeeEntity> employeeEntities = employeeRepository.findAll();

        List<EmployeeEntity> employees = employeeEntities
                .stream()
                .map(emp -> new EmployeeEntity(
                        emp.getId(),
                        emp.getTitle(),
                        emp.getDescription(),
                        emp.getEmailId(),
                        emp.getStatus(),
                        emp.getAiDescription(),
                        emp.getSub(),
                        emp.getImage()))

                .collect(Collectors.toList());
        return employees;
    }

    @Override
    public boolean deleteEmployee(Long id) {
        EmployeeEntity employee = employeeRepository.findById(id).get();
        employeeRepository.delete(employee);
        return true;
    }

    @Override
    public EmployeeEntity getEmployeeById(Long id) {
        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
        EmployeeEntity employee = new EmployeeEntity();
        BeanUtils.copyProperties(employeeEntity, employee);
        return employee;
    }

    @Override
    public EmployeeEntity updateEmployee(Long id, EmployeeEntity employee) {
        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
        employeeEntity.setTitle(employee.getTitle());
        employeeEntity.setEmailId(employee.getEmailId());
        employeeEntity.setStatus(employee.getStatus());
        employeeEntity.setDescription(employee.getDescription());
        employeeEntity.setAiDescription(employee.getAiDescription());

        employeeRepository.save(employeeEntity);

        return employee;
    }

    @Override
    public EmployeeEntity updateAIDescription(Long id, EmployeeEntity employee) {
        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
        employeeEntity.setTitle(employee.getTitle());
        employeeEntity.setEmailId(employee.getEmailId());
        employeeEntity.setStatus(employee.getStatus());
        employeeEntity.setDescription(employee.getDescription());
        employeeEntity.setAiDescription(employee.getAiDescription());
        employeeRepository.save(employeeEntity);
        return employee;
    }

	@Override
	public List<EmployeeEntity> getAllBySub(String sub) {
		List<EmployeeEntity> employeeEntities = employeeRepository.findAllBySub(sub);
		System.out.println("Employee entities: "+employeeEntities);
        List<EmployeeEntity> employees = employeeEntities
                .stream()
                .map(emp -> new EmployeeEntity(
                        emp.getId(),
                        emp.getTitle(),
                        emp.getDescription(),
                        emp.getEmailId(),
                        emp.getStatus(),
                        emp.getAiDescription(),
                        emp.getSub(),
                        emp.getImage()))
                .collect(Collectors.toList());
        return employees;
	}

}
