LOGIN_RESPONSE_CODE = list()
for i in range(0, 8):
    LOGIN_RESPONSE_CODE.append(str(i+1).zfill(3))


LOGIN_RESPONSE_MSG = {
    LOGIN_RESPONSE_CODE[0]: "user validated",
    LOGIN_RESPONSE_CODE[1]: "user invalid",
    LOGIN_RESPONSE_CODE[2]: "passwords did not match",
    LOGIN_RESPONSE_CODE[3]: "username/email already exists",
    LOGIN_RESPONSE_CODE[4]: "user successfully registered",
    LOGIN_RESPONSE_CODE[5]: "user registration failed",
    LOGIN_RESPONSE_CODE[6]: "blank fields not allowed",
    LOGIN_RESPONSE_CODE[7]: "error occurred during registration",
}