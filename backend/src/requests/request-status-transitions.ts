import { RequestStatus } from './enum/request-status-enum';

export const REQUEST_STATUS_TRANSITIONS: Record<
  RequestStatus,
  RequestStatus[]
> = {
  [RequestStatus.SUBMITTED]: [RequestStatus.IN_REVIEW],

  [RequestStatus.IN_REVIEW]: [RequestStatus.APPROVED, RequestStatus.REJECTED],

  [RequestStatus.APPROVED]: [],

  [RequestStatus.REJECTED]: [],
  [RequestStatus.DRAFT]: [],
};
