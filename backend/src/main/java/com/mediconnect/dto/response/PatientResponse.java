package com.mediconnect.dto.response;

public class PatientResponse {
    private String id, userId, name, email, phone, dateOfBirth, bloodGroup, address, gender, emergencyContact;

    public PatientResponse() {}

    public static Builder builder() { return new Builder(); }

    public String getId() { return id; }
    public String getUserId() { return userId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getDateOfBirth() { return dateOfBirth; }
    public String getBloodGroup() { return bloodGroup; }
    public String getAddress() { return address; }
    public String getGender() { return gender; }
    public String getEmergencyContact() { return emergencyContact; }

    public static class Builder {
        private final PatientResponse r = new PatientResponse();
        public Builder id(String v) { r.id = v; return this; }
        public Builder userId(String v) { r.userId = v; return this; }
        public Builder name(String v) { r.name = v; return this; }
        public Builder email(String v) { r.email = v; return this; }
        public Builder phone(String v) { r.phone = v; return this; }
        public Builder dateOfBirth(String v) { r.dateOfBirth = v; return this; }
        public Builder bloodGroup(String v) { r.bloodGroup = v; return this; }
        public Builder address(String v) { r.address = v; return this; }
        public Builder gender(String v) { r.gender = v; return this; }
        public Builder emergencyContact(String v) { r.emergencyContact = v; return this; }
        public PatientResponse build() { return r; }
    }
}
