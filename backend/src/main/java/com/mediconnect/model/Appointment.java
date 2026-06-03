package com.mediconnect.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "appointments")
@CompoundIndexes({
    @CompoundIndex(name = "patient_date_idx", def = "{'patientId': 1, 'appointmentDate': -1}"),
    @CompoundIndex(name = "doctor_date_idx", def = "{'doctorId': 1, 'appointmentDate': -1}")
})
public class Appointment {

    @Id
    private String id;
    @Indexed
    private String patientId;
    @Indexed
    private String doctorId;
    private String patientName;
    private String doctorName;
    private String doctorSpecialty;
    private String appointmentDate;
    private String appointmentTime;
    private AppointmentStatus status = AppointmentStatus.PENDING;
    private String reason;
    private String notes;
    @CreatedDate
    private LocalDateTime createdAt;

    public Appointment() {}

    public static Builder builder() { return new Builder(); }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }
    public String getDoctorId() { return doctorId; }
    public void setDoctorId(String doctorId) { this.doctorId = doctorId; }
    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }
    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }
    public String getDoctorSpecialty() { return doctorSpecialty; }
    public void setDoctorSpecialty(String doctorSpecialty) { this.doctorSpecialty = doctorSpecialty; }
    public String getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(String appointmentDate) { this.appointmentDate = appointmentDate; }
    public String getAppointmentTime() { return appointmentTime; }
    public void setAppointmentTime(String appointmentTime) { this.appointmentTime = appointmentTime; }
    public AppointmentStatus getStatus() { return status; }
    public void setStatus(AppointmentStatus status) { this.status = status; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static class Builder {
        private final Appointment a = new Appointment();
        public Builder patientId(String v) { a.patientId = v; return this; }
        public Builder doctorId(String v) { a.doctorId = v; return this; }
        public Builder patientName(String v) { a.patientName = v; return this; }
        public Builder doctorName(String v) { a.doctorName = v; return this; }
        public Builder doctorSpecialty(String v) { a.doctorSpecialty = v; return this; }
        public Builder appointmentDate(String v) { a.appointmentDate = v; return this; }
        public Builder appointmentTime(String v) { a.appointmentTime = v; return this; }
        public Builder status(AppointmentStatus v) { a.status = v; return this; }
        public Builder reason(String v) { a.reason = v; return this; }
        public Builder notes(String v) { a.notes = v; return this; }
        public Appointment build() { return a; }
    }
}
