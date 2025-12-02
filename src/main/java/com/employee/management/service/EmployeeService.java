package com.employee.management.service;

import com.employee.management.dto.EmployeeRequestDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.employee.management.dto.EmployeeResponseDto;
import com.employee.management.entity.Employee;
import com.employee.management.exception.ResourceNotFoundException;
import com.employee.management.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    // CREATE
    public EmployeeResponseDto createEmployee(EmployeeRequestDto requestDto) {

        Employee employee = mapToEntity(requestDto);
        Employee savedEmployee = repo.save(employee);
        return mapToResponseDto(savedEmployee);
    }

    // DTO -> Entity
    private Employee mapToEntity(EmployeeRequestDto requestDto) {
        Employee employee = new Employee();
        employee.setName(requestDto.getName());
        employee.setDepartment(requestDto.getDepartment());
        employee.setEmail(requestDto.getEmail());
        employee.setSalary(requestDto.getSalary());
        return employee;
    }

    // Entity -> DTO
    private EmployeeResponseDto mapToResponseDto(Employee savedEmployee) {
        EmployeeResponseDto response = new EmployeeResponseDto();
        response.setId(savedEmployee.getId());
        response.setName(savedEmployee.getName());
        response.setDepartment(savedEmployee.getDepartment());
        response.setEmail(savedEmployee.getEmail());
        response.setSalary(savedEmployee.getSalary());
        return response;
    }

    // GET ALL
    public List<EmployeeResponseDto> getAllEmployees() {
        List<Employee> employees = repo.findAll();
        List<EmployeeResponseDto> responseList = new ArrayList<>();

        for (Employee emp : employees) {
            EmployeeResponseDto dto = mapToResponseDto(emp);
            responseList.add(dto);
        }

        return responseList;
    }
    
 // PAGINATION + SORTING SUPPORT
    public Page<EmployeeResponseDto> getAllEmployees(Pageable pageable) {

        // Fetch paginated employees from DB using Page + Pageable
        Page<Employee> employeePage = repo.findAll(pageable);

        // Convert Page<Employee> -> Page<EmployeeResponseDto>
        Page<EmployeeResponseDto> dtoPage = employeePage.map(emp ->
        new EmployeeResponseDto(
                emp.getId(),
                emp.getName(),
                emp.getDepartment(),
                emp.getEmail(),
                emp.getSalary()
        )
);



        return dtoPage;
    }


    // GET BY ID
    public EmployeeResponseDto getEmployeeById(Long id) {
        Employee employee = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
        return mapToResponseDto(employee);
    }

    // GET BY EMAIL
    public EmployeeResponseDto getEmployeeByEmail(String email) {
        Employee employee = repo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with email " + email));
        return mapToResponseDto(employee);
    }

    // UPDATE
    public EmployeeResponseDto updateEmployee(Long id, EmployeeRequestDto updatedDto) {

        Employee existingEmployee = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));

        existingEmployee.setName(updatedDto.getName());
        existingEmployee.setEmail(updatedDto.getEmail());
        existingEmployee.setDepartment(updatedDto.getDepartment());
        existingEmployee.setSalary(updatedDto.getSalary());

        Employee savedEmployee = repo.save(existingEmployee);

        return mapToResponseDto(savedEmployee);
    }

    // DELETE
    public void deleteEmployee(Long id) {
       boolean exists  = repo.existsById(id);
       
       if(!exists) {
    	   throw new ResourceNotFoundException("Employee Not Found with Id:" + id);
       }
       
       repo.deleteById(id);
    }
}
