package com.mediconnect;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mediconnect.dto.request.AppointmentRequest;
import com.mediconnect.dto.request.RegisterRequest;
import com.mediconnect.model.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AppointmentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MongoTemplate mongoTemplate;

    private String patientToken;
    private String doctorId;

    @BeforeEach
    void setUp() throws Exception {
        mongoTemplate.getDb().drop();

        RegisterRequest doctorReq = new RegisterRequest();
        doctorReq.setName("Dr. Appointment");
        doctorReq.setEmail("appt.doctor@test.com");
        doctorReq.setPassword("password123");
        doctorReq.setRole(Role.DOCTOR);
        doctorReq.setSpecialty("General");

        MvcResult doctorResult = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(doctorReq)))
                .andReturn();

        doctorId = objectMapper.readTree(doctorResult.getResponse().getContentAsString())
                .path("data").path("profileId").asText();

        RegisterRequest patientReq = new RegisterRequest();
        patientReq.setName("Test Patient");
        patientReq.setEmail("appt.patient@test.com");
        patientReq.setPassword("password123");
        patientReq.setRole(Role.PATIENT);

        MvcResult patientResult = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(patientReq)))
                .andReturn();

        patientToken = objectMapper.readTree(patientResult.getResponse().getContentAsString())
                .path("data").path("token").asText();
    }

    @Test
    void book_appointment_returns_201() throws Exception {
        AppointmentRequest req = new AppointmentRequest();
        req.setDoctorId(doctorId);
        req.setAppointmentDate("2025-12-15");
        req.setAppointmentTime("10:00 AM");
        req.setReason("General checkup");

        mockMvc.perform(post("/api/appointments")
                        .header("Authorization", "Bearer " + patientToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.status").value("PENDING"))
                .andExpect(jsonPath("$.data.reason").value("General checkup"));
    }

    @Test
    void book_appointment_duplicate_slot_returns_400() throws Exception {
        AppointmentRequest req = new AppointmentRequest();
        req.setDoctorId(doctorId);
        req.setAppointmentDate("2025-12-16");
        req.setAppointmentTime("09:00 AM");
        req.setReason("First booking");

        mockMvc.perform(post("/api/appointments")
                        .header("Authorization", "Bearer " + patientToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated());

        AppointmentRequest dup = new AppointmentRequest();
        dup.setDoctorId(doctorId);
        dup.setAppointmentDate("2025-12-16");
        dup.setAppointmentTime("09:00 AM");
        dup.setReason("Duplicate booking");

        mockMvc.perform(post("/api/appointments")
                        .header("Authorization", "Bearer " + patientToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dup)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void get_patient_appointments_requires_auth() throws Exception {
        mockMvc.perform(get("/api/appointments/patient"))
                .andExpect(status().isForbidden());
    }

    @Test
    void get_patient_appointments_returns_list() throws Exception {
        mockMvc.perform(get("/api/appointments/patient")
                        .header("Authorization", "Bearer " + patientToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").isArray());
    }
}
