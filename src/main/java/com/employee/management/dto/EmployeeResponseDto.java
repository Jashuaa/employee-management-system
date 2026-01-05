package com.employee.management.dto;

import java.math.BigDecimal;

public class EmployeeResponseDto {

    private Long id;
    private String name;
    private String department;
    private String email;
    private BigDecimal salary;

    public EmployeeResponseDto() {
    }

    public EmployeeResponseDto(Long id, String name, String department, String email, BigDecimal salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.email = email;
        this.salary = salary;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }
}
