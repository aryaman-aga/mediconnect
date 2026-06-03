package com.mediconnect.dto.response;

import com.mediconnect.model.Role;

public class AuthResponse {
    private String token;
    private String userId;
    private String name;
    private String email;
    private Role role;
    private String profileId;

    public AuthResponse() {}

    public static Builder builder() { return new Builder(); }

    public String getToken() { return token; }
    public String getUserId() { return userId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Role getRole() { return role; }
    public String getProfileId() { return profileId; }

    public static class Builder {
        private final AuthResponse r = new AuthResponse();
        public Builder token(String v) { r.token = v; return this; }
        public Builder userId(String v) { r.userId = v; return this; }
        public Builder name(String v) { r.name = v; return this; }
        public Builder email(String v) { r.email = v; return this; }
        public Builder role(Role v) { r.role = v; return this; }
        public Builder profileId(String v) { r.profileId = v; return this; }
        public AuthResponse build() { return r; }
    }
}
