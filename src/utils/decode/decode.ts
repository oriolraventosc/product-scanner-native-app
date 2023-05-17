import jwtDecode from "jwt-decode";
import { type JwtCustomPayload } from "../../types/types";

const decodeToken = (token: string): JwtCustomPayload => {
  const jwtPayload: JwtCustomPayload = jwtDecode(token);

  return {
    id: jwtPayload.id,
    email: jwtPayload.email,
  };
};

export default decodeToken;
