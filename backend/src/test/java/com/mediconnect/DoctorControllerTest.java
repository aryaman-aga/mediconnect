package com.mediconnect;

import com.fasterxml.jackson.databind.ObjectMapper;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class DoctorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MongoTemplate mongoTemplate;

    private String doctorToken;

    @BeforeEach
    void setUp() throws Exception {
        mongoTemplate.getDb().drop();

        RegisterRequest req = new RegisterRequest();
        req.setName("Dr. Test Doc");
        req.setEmail("doctor@test.com");
        req.setPassword("password123");
        req.setRole(Role.DOCTOR);
        req.setSpecialty("Cardiology");
        req.setHospital("Test Hospital");

        MvcResult result = mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andReturn();

        String body = result.getResponse().getContentAsString();
        doctorToken = objectMapper.readTree(body).path("data").path("token").asText();
    }

    @Test
    void get_all_doctors_no_auth_required() throws Exception {
        mockMvc.perform(get("/api/doctors"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").isArray());
    }

    @Test
    void get_doctor_me_requires_auth() throws Exception {
        mockMvc.perform(get("/api/doctors/me"))
                .andExpect(status().isForbidden());
    }

    @Test
    void get_doctor_me_with_token_returns_profile() throws Exception {
        mockMvc.perform(get("/api/doctors/me")
                        .header("Authorization", "Bearer " + doctorToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("Dr. Test Doc"))
                .andExpect(jsonPath("$.data.specialty").value("Cardiology"));
    }

    @Test
    void health_endpoint_is_public() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("UP"));
    }
}
