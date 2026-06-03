package com.mediconnect.dto.response;

import com.mediconnect.model.AppointmentStatus;
import java.time.LocalDateTime;

public class AppointmentResponse {
    private String id, patientId, doctorId, patientName, doctorName, doctorSpecialty, doctorImageUrl;
    private String appointmentDate, appointmentTime, reason, notes;
    private AppointmentStatus status;
    private LocalDateTime createdAt;

    public AppointmentResponse() {}

    public static Builder builder() { return new Builder(); }

    public String getId() { return id; }
    public String getPatientId() { return patientId; }
    public String getDoctorId() { return doctorId; }
    public String getPatientName() { return patientName; }
    public String getDoctorName() { return doctorName; }
    public String getDoctorSpecialty() { return doctorSpecialty; }
    public String getDoctorImageUrl() { return doctorImageUrl; }
    public String getAppointmentDate() { return appointmentDate; }
    public String getAppointmentTime() { return appointmentTime; }
    public String getReason() { return reason; }
    public String getNotes() { return notes; }
    public AppointmentStatus getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public static class Builder {
        private final AppointmentResponse r = new AppointmentResponse();
        public Builder id(String v) { r.id = v; return this; }
        public Builder patientId(String v) { r.patientId = v; return this; }
        public Builder doctorId(String v) { r.doctorId = v; return this; }
        public Builder patientName(String v) { r.patientName = v; return this; }
        public Builder doctorName(String v) { r.doctorName = v; return this; }
        public Builder doctorSpecialty(String v) { r.doctorSpecialty = v; return this; }
        public Builder doctorImageUrl(String v) { r.doctorImageUrl = v; return this; }
        public Builder appointmentDate(String v) { r.appointmentDate = v; return this; }
        public Builder appointmentTime(String v) { r.appointmentTime = v; return this; }
        public Builder status(AppointmentStatus v) { r.status = v; return this; }
        public Builder reason(String v) { r.reason = v; return this; }
        public Builder notes(String v) { r.notes = v; return this; }
        public Builder createdAt(LocalDateTime v) { r.createdAt = v; return this; }
        public AppointmentResponse build() { return r; }
    }
}
