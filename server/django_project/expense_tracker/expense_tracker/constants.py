LOGIN_RESPONSE_MSG = [
    "user validated",
    "user invalid",
    "passwords did not match",
    "username/email already exists",
    "user successfully registered",
    "user registration failed",
    "blank fields not allowed",
    "error occurred during registration"
]

LOGIN_RESPONSE_CODE = {
    LOGIN_RESPONSE_MSG[0]: str(1).zfill(3),
    LOGIN_RESPONSE_MSG[1]: str(2).zfill(3),
    LOGIN_RESPONSE_MSG[2]: str(3).zfill(3),
    LOGIN_RESPONSE_MSG[3]: str(4).zfill(3),
    LOGIN_RESPONSE_MSG[4]: str(5).zfill(3),
    LOGIN_RESPONSE_MSG[5]: str(6).zfill(3),
    LOGIN_RESPONSE_MSG[6]: str(7).zfill(3),
    LOGIN_RESPONSE_MSG[7]: str(8).zfill(3),
}