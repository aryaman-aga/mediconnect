package com.mediconnect.dto.response;

import java.util.List;

public class DoctorResponse {
    private String id, userId, name, email, specialty, hospital, phone, bio, imageUrl;
    private double rating;
    private int reviewCount, experience;
    private boolean available;
    private List<String> availableSlots;
    private String consultationFee, education;
    private List<String> languages;

    public DoctorResponse() {}

    public static Builder builder() { return new Builder(); }

    public String getId() { return id; }
    public String getUserId() { return userId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getSpecialty() { return specialty; }
    public String getHospital() { return hospital; }
    public String getPhone() { return phone; }
    public String getBio() { return bio; }
    public String getImageUrl() { return imageUrl; }
    public double getRating() { return rating; }
    public int getReviewCount() { return reviewCount; }
    public int getExperience() { return experience; }
    public boolean isAvailable() { return available; }
    public List<String> getAvailableSlots() { return availableSlots; }
    public String getConsultationFee() { return consultationFee; }
    public String getEducation() { return education; }
    public List<String> getLanguages() { return languages; }

    public static class Builder {
        private final DoctorResponse r = new DoctorResponse();
        public Builder id(String v) { r.id = v; return this; }
        public Builder userId(String v) { r.userId = v; return this; }
        public Builder name(String v) { r.name = v; return this; }
        public Builder email(String v) { r.email = v; return this; }
        public Builder specialty(String v) { r.specialty = v; return this; }
        public Builder hospital(String v) { r.hospital = v; return this; }
        public Builder phone(String v) { r.phone = v; return this; }
        public Builder bio(String v) { r.bio = v; return this; }
        public Builder imageUrl(String v) { r.imageUrl = v; return this; }
        public Builder rating(double v) { r.rating = v; return this; }
        public Builder reviewCount(int v) { r.reviewCount = v; return this; }
        public Builder experience(int v) { r.experience = v; return this; }
        public Builder available(boolean v) { r.available = v; return this; }
        public Builder availableSlots(List<String> v) { r.availableSlots = v; return this; }
        public Builder consultationFee(String v) { r.consultationFee = v; return this; }
        public Builder education(String v) { r.education = v; return this; }
        public Builder languages(List<String> v) { r.languages = v; return this; }
        public DoctorResponse build() { return r; }
    }
}
