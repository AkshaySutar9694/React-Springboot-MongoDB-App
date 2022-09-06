package com.example.restapi.demo.model;

import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "employees")
public class Employee {
    @Id
    @AutoConfigureOrder
    private Integer _id;
    private String name;
    private String email;
    private String place;
    private Integer age;

    public Employee() {
    }

    public Employee(Integer _id, String name, String email, String place, Integer age) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.place = place;
        this.age = age;
    }

    public Integer get_id() {
        return this._id;
    }

    public void set_id(Integer _id) {
        this._id = _id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPlace() {
        return this.place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public Integer getAge() {
        return this.age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "{" +
                " _id='" + get_id() + "'" +
                ", name='" + getName() + "'" +
                ", email='" + getEmail() + "'" +
                ", place='" + getPlace() + "'" +
                ", age='" + getAge() + "'" +
                "}";
    }

}
