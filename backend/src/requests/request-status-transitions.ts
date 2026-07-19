import { RequestStatus } from './enum/request-status-enum';

export const REQUEST_STATUS_TRANSITIONS: Record<
  RequestStatus,
  RequestStatus[]
> = {
  [RequestStatus.SUBMITTED]: [RequestStatus.IN_REVIEW, RequestStatus.EXPIRED],

  [RequestStatus.IN_REVIEW]: [
    RequestStatus.APPROVED,
    RequestStatus.REJECTED,
    RequestStatus.EXPIRED,
  ],

  [RequestStatus.APPROVED]: [],

  [RequestStatus.REJECTED]: [],

  [RequestStatus.EXPIRED]: [],

  [RequestStatus.DRAFT]: [],
};
