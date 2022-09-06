package com.example.restapi.demo.service;

import java.util.List;
import com.example.restapi.demo.dao.EmployeeRepository;
import com.example.restapi.demo.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Integer id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee updateEmployee(Integer id, Employee employee) {
        Employee existedEmployee = employeeRepository.findById(id).orElse(null);
        System.out.println(existedEmployee);
        System.out.println(employee);
        existedEmployee.setName(employee.getName());
        existedEmployee.setEmail(employee.getEmail());
        existedEmployee.setPlace(employee.getPlace());
        existedEmployee.setAge(employee.getAge());
        System.out.println(existedEmployee);
        return employeeRepository.save(existedEmployee);
    }

    public String deleteEmployee(Integer id) {
        employeeRepository.deleteById(id);
        return "Deleted record of id " + id;
    }

    public List<Employee> saveEmployees(List<Employee> employees) {
        return employeeRepository.saveAll(employees);
    }
}
