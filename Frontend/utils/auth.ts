// import {jwtDecode} from "jwt-decode";

// export type UserFromToken = {
//   id: string;
//   username: string;
//   roles: string[];
//   exp?: number;
// };

// type DecodedToken = {
//   nameid?: string;        // ClaimTypes.NameIdentifier
//   unique_name?: string;   // ClaimTypes.Name
//   role?: string | string[];
//   exp?: number;
//   "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
//   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
// };


// export function saveToken(token: string) {
//   localStorage.setItem("token", token);
// }

// export function getToken(): string | null {
//   return typeof window !== "undefined" ? localStorage.getItem("token") : null;
// }

// export function removeToken() {
//   localStorage.removeItem("token");
// }

// export function getUserFromToken(): UserFromToken | null {
//   const token = getToken();
//   if (!token) return null;
//   try {
//     const decoded = jwtDecode<DecodedToken>(token);
//     console.log("Decoded JWT:", decoded); // Add this line
//     // const roles = Array.isArray(decoded.role) ? decoded.role : (decoded.role ? [decoded.role] : []);
//     let roles: string[] = [];
//     const roleClaim = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
//     if (roleClaim) {
//       roles = Array.isArray(roleClaim) ? roleClaim : [roleClaim];
//     } else if (decoded.role) {
//       roles = Array.isArray(decoded.role) ? decoded.role : [decoded.role];
//     }
//         const userId =
//       decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ??
//       decoded.nameid ??
//       "";
//     return {
//       id: userId,
//       username: decoded.unique_name ?? "",
//       roles,
//       exp: decoded.exp,
//     };
//   } catch {
//     return null;
//   }
// }





// src/utils/auth.ts
export function saveToken(token: string) {
  if (typeof window !== "undefined") localStorage.setItem("token", token);
}

export function clearToken() {
  if (typeof window !== "undefined") localStorage.removeItem("token");
}

export function getUserFromToken() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      id: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || payload["sub"],
      name: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || payload["unique_name"] || payload["name"],
      // roles: (Object.values(payload).find(v => Array.isArray(v)) as string[]) || (payload["role"] ? [payload["role"]] : []),
      roles:payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    };
  } catch { return null; }
}

