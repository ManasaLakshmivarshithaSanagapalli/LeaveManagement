// export type CreateLeaveRequestDto = {
//   userId: string;
//   leaveTypeId: number;
//   startDate: string; // ISO
//   endDate: string;   // ISO
//   reason: string;
// };

// export type LeaveRequestDto = {
//   id: number;
//   userId: string;
//   userName?: string;
//   leaveTypeId: number;
//   leaveTypeName?: string;
//   startDate: string;
//   endDate: string;
//   totalDays: number;
//   reason?: string;
//   status: string;
//   approverId?: string;
//   approverName?: string;
//   createdAt: string;
//   updatedAt?: string;
// };
// export type LeaveTypeDto = {
//   id: number;
//   name: string;
//   maxDaysPerYear?: number; // optional, if your API returns this
// };
// export type LoginDto = { userName: string; password: string };



// src/types.ts
export type LeaveRequestDto = {
  id: number;
  userId: string;
  userName?: string | null;
  leaveTypeId: number;
  leaveTypeName?: string | null;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason?: string;
  status: "Pending" | "Approved" | "Rejected" | string;
  approverId?: string | null;
  approverName?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
};

export type LeaveTypeDto = { id: number; name: string; maxDaysPerYear?: number; };
