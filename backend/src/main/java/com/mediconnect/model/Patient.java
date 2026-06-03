package com.mediconnect.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "patients")
public class Patient {

    @Id
    private String id;
    @Indexed(unique = true)
    private String userId;
    private String name;
    @Indexed(unique = true)
    private String email;
    private String phone;
    private String dateOfBirth;
    private String bloodGroup;
    private String address;
    private String gender;
    private String emergencyContact;

    public Patient() {}

    public static Builder builder() { return new Builder(); }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }

    public static class Builder {
        private final Patient p = new Patient();
        public Builder userId(String v) { p.userId = v; return this; }
        public Builder name(String v) { p.name = v; return this; }
        public Builder email(String v) { p.email = v; return this; }
        public Builder phone(String v) { p.phone = v; return this; }
        public Builder dateOfBirth(String v) { p.dateOfBirth = v; return this; }
        public Builder bloodGroup(String v) { p.bloodGroup = v; return this; }
        public Builder address(String v) { p.address = v; return this; }
        public Builder gender(String v) { p.gender = v; return this; }
        public Patient build() { return p; }
    }
}
