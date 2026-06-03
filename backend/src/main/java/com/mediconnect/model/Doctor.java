package com.mediconnect.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "doctors")
public class Doctor {

    @Id
    private String id;
    @Indexed(unique = true)
    private String userId;
    private String name;
    @Indexed(unique = true)
    private String email;
    private String specialty;
    private String hospital;
    private String phone;
    private String bio;
    private String imageUrl;
    private double rating = 0.0;
    private int reviewCount = 0;
    private int experience;
    private boolean available = true;
    private List<String> availableSlots;
    private String consultationFee;
    private String education;
    private List<String> languages;

    public Doctor() {}

    public static Builder builder() { return new Builder(); }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }
    public String getHospital() { return hospital; }
    public void setHospital(String hospital) { this.hospital = hospital; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    public int getReviewCount() { return reviewCount; }
    public void setReviewCount(int reviewCount) { this.reviewCount = reviewCount; }
    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
    public List<String> getAvailableSlots() { return availableSlots; }
    public void setAvailableSlots(List<String> availableSlots) { this.availableSlots = availableSlots; }
    public String getConsultationFee() { return consultationFee; }
    public void setConsultationFee(String consultationFee) { this.consultationFee = consultationFee; }
    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }
    public List<String> getLanguages() { return languages; }
    public void setLanguages(List<String> languages) { this.languages = languages; }

    public static class Builder {
        private final Doctor d = new Doctor();
        public Builder userId(String v) { d.userId = v; return this; }
        public Builder name(String v) { d.name = v; return this; }
        public Builder email(String v) { d.email = v; return this; }
        public Builder specialty(String v) { d.specialty = v; return this; }
        public Builder hospital(String v) { d.hospital = v; return this; }
        public Builder phone(String v) { d.phone = v; return this; }
        public Builder bio(String v) { d.bio = v; return this; }
        public Builder imageUrl(String v) { d.imageUrl = v; return this; }
        public Builder rating(double v) { d.rating = v; return this; }
        public Builder reviewCount(int v) { d.reviewCount = v; return this; }
        public Builder experience(int v) { d.experience = v; return this; }
        public Builder available(boolean v) { d.available = v; return this; }
        public Builder availableSlots(List<String> v) { d.availableSlots = v; return this; }
        public Builder consultationFee(String v) { d.consultationFee = v; return this; }
        public Builder education(String v) { d.education = v; return this; }
        public Builder languages(List<String> v) { d.languages = v; return this; }
        public Doctor build() { return d; }
    }
}
