package com.mediconnect.dto.request;

import jakarta.validation.constraints.NotBlank;

public class AppointmentRequest {
    @NotBlank(message = "Doctor ID is required")
    private String doctorId;
    @NotBlank(message = "Appointment date is required")
    private String appointmentDate;
    @NotBlank(message = "Appointment time is required")
    private String appointmentTime;
    @NotBlank(message = "Reason is required")
    private String reason;

    public String getDoctorId() { return doctorId; }
    public void setDoctorId(String doctorId) { this.doctorId = doctorId; }
    public String getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(String appointmentDate) { this.appointmentDate = appointmentDate; }
    public String getAppointmentTime() { return appointmentTime; }
    public void setAppointmentTime(String appointmentTime) { this.appointmentTime = appointmentTime; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
