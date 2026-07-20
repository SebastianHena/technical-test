export interface Request {
  id: number;
  resourceId: number;
  startDate: Date;
  endDate: Date;
}

export interface Conflict {
  resourceId: number;
  requestA: Request;
  requestB: Request;
}

export function detectOverlaps(requests: Request[]): Conflict[] {
  const conflicts: Conflict[] = [];

  // Group requests by resource
  const groupedRequests = new Map<number, Request[]>();

  for (const request of requests) {
    if (!groupedRequests.has(request.resourceId)) {
      groupedRequests.set(request.resourceId, []);
    }

    groupedRequests.get(request.resourceId)!.push(request);
  }

  // Check overlaps within each resource
  for (const [resourceId, resourceRequests] of groupedRequests.entries()) {

    resourceRequests.sort(
      (a, b) => a.startDate.getTime() - b.startDate.getTime()
    );

    for (let i = 0; i < resourceRequests.length; i++) {

      for (let j = i + 1; j < resourceRequests.length; j++) {

        const first = resourceRequests[i];
        const second = resourceRequests[j];

        // Since the array is sorted, no following request can overlap
        if (second.startDate > first.endDate) {
          break;
        }

        conflicts.push({
          resourceId,
          requestA: first,
          requestB: second,
        });
      }
    }
  }

  return conflicts;
}

/* Example */

const requests: Request[] = [
  {
    id: 1,
    resourceId: 1,
    startDate: new Date("2026-07-01"),
    endDate: new Date("2026-07-05"),
  },
  {
    id: 2,
    resourceId: 1,
    startDate: new Date("2026-07-03"),
    endDate: new Date("2026-07-06"),
  },
  {
    id: 3,
    resourceId: 1,
    startDate: new Date("2026-07-04"),
    endDate: new Date("2026-07-08"),
  },
  {
    id: 4,
    resourceId: 2,
    startDate: new Date("2026-07-01"),
    endDate: new Date("2026-07-02"),
  },
];

console.log(detectOverlaps(requests));