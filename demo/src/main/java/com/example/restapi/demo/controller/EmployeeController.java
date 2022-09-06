package com.example.restapi.demo.controller;

import java.util.Comparator;
import java.util.List;
import com.example.restapi.demo.model.Employee;
import com.example.restapi.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/employee")
@RestController
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/getAll")
    List<Employee> getAllEmployees() {
        List<Employee> results = employeeService.getAllEmployees();
        results.sort(new Comparator<Employee>() {
            public int compare(Employee e1, Employee e2) {
                return e1.get_id() - e2.get_id();
            }
        });
        return results;
    }

    @GetMapping("/{id}")
    Employee getEmployeeById(@PathVariable Integer id) {
        return employeeService.getEmployeeById(id);
    }

    @PutMapping("/update/{id}")
    Employee updateEmployee(@PathVariable Integer id, @RequestBody Employee employee) {
        return employeeService.updateEmployee(id, employee);
    }

    @DeleteMapping("/delete/{id}")
    String deleteEmployee(@PathVariable Integer id) {
        return employeeService.deleteEmployee(id);
    }

    @PostMapping("/save")
    List<Employee> saveEmployees(@RequestBody List<Employee> employee) {
        return employeeService.saveEmployees(employee);
    }

}
